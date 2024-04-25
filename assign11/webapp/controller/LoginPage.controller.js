sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("assign11.controller.LoginPage", {
            onLoginPress: function (oEvent) {
                var username = this.byId("usernameInput").getValue();
                var password = this.byId("passwordInput").getValue();

                // Perform validation for credentials
                if (username === "admin" && password === "admin") {
                    var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                    var oSelectedItem = oEvent.getSource().getParent();            
                    oRouter.navTo("splitApp", {
                        username: username
                    });

                } else {
                    // Show error message for invalid credentials
                    sap.m.MessageToast.show("Invalid credentials. Please try again.");
                }
            }
        });
    });
