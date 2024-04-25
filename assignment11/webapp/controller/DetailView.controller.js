sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("assignment11.controller.DetailView", {
        onInit: function() {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.getRoute("DetailView").attachPatternMatched(function(oEvent) {
                var oArgs = oEvent.getParameter("arguments");
                var sEmployeeId = oArgs.EmployeeId;

                // Now you have access to the EmployeeId parameter
                console.log("EmployeeId:", sEmployeeId);

            var oModel = new JSONModel();
            oModel.loadData("model/employees.json"); // Load data from JSON file
            oModel.attachRequestCompleted(function() {
                this.getView().setModel(oModel);

                // Call function to display details of a specific employee
                this.displayEmployeeDetails(sEmployeeId); // Employee ID can be dynamically changed
            }.bind(this));

           

                // You can perform further operations with the EmployeeId here, such as fetching details from the model
            }, this);
        },

        displayEmployeeDetails: function(employeeId) {
            var oModel = this.getView().getModel();
            var aEmployees = oModel.getProperty("/employees");
            var oEmployee = aEmployees.find(function(employee) {
                return employee.EmployeeId === employeeId;
            });

            if (oEmployee) {
                oModel.setProperty("/", oEmployee);
            } else {
                console.error("Employee not found with ID:", employeeId);
            }
        }
    });
});
