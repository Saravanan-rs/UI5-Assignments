sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,MessageToast) {
        "use strict";

        return Controller.extend("assignment6.controller.View1", {
          
            onToggleDrawer: function() {
                MessageToast.show("Toggling side drawer");
            },
    
            onBookServicePress: function() {
                MessageToast.show("Booking a service");
            },
    
            onBookNowPress: function() {
                MessageToast.show("Booking now");
            }
        });
    });
