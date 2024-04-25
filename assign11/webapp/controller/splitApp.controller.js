sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("assign11.controller.splitApp", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("splitApp").attachPatternMatched(this._onRouteMatched, this);
        },

        _onRouteMatched: function (oEvent) {
            var username = oEvent.getParameter("arguments").username;
            var oDetailPage = this.getView().byId("detailPage");
            if (oDetailPage) {
                var oText = oDetailPage.getContent()[0]; // Assuming the Text control is the first content element
                if (oText) {
                    oText.setText("Hey " + username + "! Welcome to Incture - Where Innovation Meets Excellence! "); // Set the welcome message with username
                }
            }
        },

        onListItemPress: function (oEvent) {
            var oItem = oEvent.getParameter("listItem");
            var sPageId;

            switch (oItem.getId()) {
                case this.byId("homeListItem").getId():
                    sPageId = "detailPage";
                    break;
                case this.byId("aboutListItem").getId():
                    sPageId = "detailPage2";
                    break;
                case this.byId("logoutListItem").getId():
                    sPageId = "detailPage3";
                    break;
                default:
                    break;
            }

            if (sPageId) {
                this.byId("splitApp").toDetail(this.createId(sPageId));
            }
        },
        onLogoutPress: function (oEvent) {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            var oSelectedItem = oEvent.getSource().getParent();
            oRouter.navTo("LogoutPage", {
            });


        }
    });
});
