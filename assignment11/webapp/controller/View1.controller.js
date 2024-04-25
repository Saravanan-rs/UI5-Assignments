sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
    "use strict";

    return Controller.extend("assignment11.controller.View1", {
        onInit: function() {
            var oModel = new JSONModel("model/employees.json");
            this.getView().setModel(oModel);
        },
        onDetailsPress: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oSelectedItem = oEvent.getSource().getParent();
            var sEmployeeId = oSelectedItem.getBindingContext().getProperty("EmployeeId");
            oRouter.navTo("DetailView", {
                EmployeeId: sEmployeeId
            });
        }   
    });
});