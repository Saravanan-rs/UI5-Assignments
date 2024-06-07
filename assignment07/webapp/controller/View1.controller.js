sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("assignment07.controller.View1", {
            onInit: function() {
                // Create the OData model
                var oModel = new ODataModel("https://services.odata.org/V2/Northwind/Northwind.svc");
    
                // Set the model to the view
                this.getView().setModel(oModel);
    
                // Bind the model to a List control
                var oList = this.getView().byId("yourListId");
                oList.bindItems({
                    path: "/Products", // Adjust the entity set as needed
                    template: new sap.m.StandardListItem({
                        title: "{ProductName}", // Adjust the property bindings as needed
                        description: "{QuantityPerUnit}" // Adjust the property bindings as needed
                    })
                });
            }
        });
    });
