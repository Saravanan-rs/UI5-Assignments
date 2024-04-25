sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("fairprice.controller.Home", {
            onInit: function () {

            },
            onButtonPress: function (oEvent) {
                var sButtonId = oEvent.getSource().getId();
                var sLastPart = sButtonId.split("--").pop();
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.navTo("RouteDetail", {
                    header: sLastPart
                });
            }

        });
    });
