sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],

function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.incture.project1.controller.DemoView", {
        onInit: function () {
            var oModel = new JSONModel({
                items: [
                    { key: "1", text: "Coimbatore" },
                    { key: "2", text: "Chennai" },
                    { key: "3", text: "Bengaluru" }
                ]
            });
            this.getView().setModel(oModel);
        },
        
        onBtnClick: function(event) {        
            sap.m.MessageToast.show("Hii Saravanan");
        }
    });
});
