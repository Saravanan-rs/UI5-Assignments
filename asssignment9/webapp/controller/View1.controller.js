sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Locale",
    "sap/ui/model/resource/ResourceModel"
], function(Controller, Locale, ResourceModel) {
    "use strict";

    return Controller.extend("assignment9.controller.Main", {
        onChangeLanguage: function(oEvent) {
            var sLanguageKey = oEvent.getParameter("selectedItem").getKey();
            var oLocale = new Locale(sLanguageKey);
            sap.ui.getCore().getConfiguration().setLanguage(sLanguageKey);

            var oResourceModel = new ResourceModel({
                bundleName: "assignment9.i18n.i18n",
                locale: oLocale
            });
            sap.ui.getCore().setModel(oResourceModel, "i18n");
        }
    });
});
