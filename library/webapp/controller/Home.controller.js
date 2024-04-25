sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("library.controller.Home", {
        onInit: function () {
           
        },

        onLoginPress: function() {
            var email = this.byId("emailInput").getValue();
            var password = this.byId("passwordInput").getValue();
            var loginType = this.byId("loginType").getSelectedButton().getText();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                //var email = "example@email.com"; // Retrieve email from your input field or from the model
                oRouter.navTo("RouteDash", {
                email: email
                });
            // // Example authentication logic based on login type
            // if (loginType === "Admin") {
            //   // Admin login logic
            //   if (email === "admin@example.com" && password === "adminPassword") {
            //     MessageToast.show("Admin login successful");
                
            //   } else {
            //     MessageToast.show("Invalid admin credentials");
            //   }
            // } else {
            //   // Student login logic
            //   if (email === "student@example.com" && password === "studentPassword") {
            //     MessageToast.show("Student login successful");
            //   } else {
            //     MessageToast.show("Invalid student credentials");
            //   }
            // }
          }

    });
});
