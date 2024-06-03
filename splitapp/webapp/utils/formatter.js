// File: splitapp/utils/formatter.js
sap.ui.define([], function () {
    "use strict";

    return {
        status: function (sStatus) {
            if (sStatus > 0) {
                return "Success";
            } else {
                return "Error";
            }

        },
        trimSuperfluousBytes: function (sVal) {
            var sTrimmed;
            if (typeof sVal === "string") {
                sTrimmed = sVal.substring(104);
                return "data:image/bmp;base64," + sTrimmed;
            }
        }

    };
});
