sap.ui.define(
    [
        "sap/ui/core/mvc/Controller"
    ],
    function(BaseController) {
      "use strict";
  
      return BaseController.extend("library.controller.Dash", {
        onInit: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
          oRouter.getRoute("RouteDash").attachPatternMatched(this._onRouteMatched, this);
        },
        
        _onRouteMatched: function(oEvent) {
          var email = oEvent.getParameter("arguments").email;
          // Use the email ID to fetch details or perform any other operations
          console.log(email); // For demonstration, you can print the email ID to the console
        }
        ,
        onBookSearchPress: function() {
          var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteBookSearch");
        },
    
        onTransactionRecordsPress: function() {
          // Handle transaction records tile press event
          // Navigate to transaction records page or perform relevant action
        },

        onButtonPress: function () {
            //debugger;
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteDetails");
        }
      });
    }
  );
  