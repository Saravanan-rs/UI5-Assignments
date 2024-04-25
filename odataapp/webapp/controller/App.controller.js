sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/format/NumberFormat"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, NumberFormat) {
        "use strict";

        return Controller.extend("odataapp.controller.App", {
            onInit: function () {
                // this.getOdataService();
                var oList = this.getView().byId("invoicesList");
                var oBinding = oList.getBinding("items");
            
                // Apply sorting by ShipperName
                // var oSorter = new sap.ui.model.Sorter("ShipperName", false); // false for ascending order
                // oBinding.sort(oSorter);
            
                // Apply grouping by ShipperName
                var oGrouping = new sap.ui.model.Sorter("ShipperName", false, true); // true for grouping
                oBinding.sort(oGrouping);
            }
            // onSearch: function (event) {
            //     var searchTerm = event.getParameter("query");
            //     var oModel = this.getView().getModel();

            //     var oFilter = new sap.ui.model.Filter("CustomerID", sap.ui.model.FilterOperator.EQ, searchTerm);

            //     var oList = this.getView().byId("customerList");
            //     oList.getBinding("items").filter([oFilter]);
            // },

            // getOdataService: function () {
            //     let oDataModel = this.getOwnerComponent().getModel(),
            //         oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
            //         sPath = "/Employees";
            //     oDataModel.read(sPath, {
            //         success: function (successData) {
            //             oJsonModel.setProperty("/listData", successData.results);

            //         },
            //         error: function (errorMsg) {
            //             debugger;
            //         }
            //     })
            // },
            // formatCurrency: function (unitPrice) {
            //     var oNumberFormat = NumberFormat.getCurrencyInstance({ style: "standard", currency: "EUR" });
            //     return oNumberFormat.format(unitPrice);
            // },
            // formatNumberState: function (unitPrice) {
            //     return unitPrice > 90 ? "Warning" : "Success";
            // },

            // onDiscountChange: function (oEvent) {
            //     var oInput = oEvent.getSource();
            //     var sDiscount = oInput.getValue();
            //     var oModel = this.getView().getModel();

            //     // Update the model with the new discount value
            //     var oContext = oInput.getBindingContext();
            //     oModel.setProperty("Discount", sDiscount, oContext);
            // },

            // calculateDiscountedPrice: function (fUnitPrice, fDiscount) {
            //     // Calculate the discounted price based on the unit price and discount
            //     var fDiscountedPrice = parseFloat(fUnitPrice) - (parseFloat(fUnitPrice) * parseFloat(fDiscount) / 100);
            //     return fDiscountedPrice.toFixed(2); // Return the formatted discounted price
            // }

        });
    });
