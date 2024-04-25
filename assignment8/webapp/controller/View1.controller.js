sap.ui.define([
    "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";
        return Controller.extend("assignment8.controller.View1", {
            handleChange: function(event) {
                var selectedColor = event.getParameter("selectedItem").getKey();
                var oText = this.getView().byId("textId");
                oText.$().css("color", selectedColor);
            }
        });
    });