sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(Controller) {
    "use strict";

    return Controller.extend("assign11.controller.LogoutPage", {
        onLoginAgain: function(oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oSelectedItem = oEvent.getSource().getParent();
            oRouter.navTo("LoginPage", {
            });

        }
    });
});
