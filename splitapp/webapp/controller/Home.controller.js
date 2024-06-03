sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    function (Controller) {
        "use strict";

        return Controller.extend("splitapp.controller.Home", {
            onInit:function(){

            },
            onSplitAppBtnPress:function(){
                this.getOwnerComponent().getRouter().navTo("RouteView1");
            }
        });
    });

