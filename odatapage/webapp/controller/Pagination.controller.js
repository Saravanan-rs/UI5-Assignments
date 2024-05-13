sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("odatapage.controller.Pagination", {
        onInit: function () {
            this.getOdataService();
            this.currentPage = 1; // Initialize current page
            this.itemsPerPage = 5; // Set items per page
        },
        getOdataService: function () {
            let oDataModel = this.getOwnerComponent().getModel(),
                oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
                sPath = "/Products";
            oDataModel.read(sPath, {
                success: function (successData) {
                    // Create a copy of the data
                    let copyOfData = JSON.parse(JSON.stringify(successData.results));
                    oJsonModel.setProperty("/listData", copyOfData);
                    this.updateTableBinding();
                    this.createPageNumberButtons();
                    this.updateButtonStates(); // Update button states initially
                }.bind(this),
                error: function (errorMsg) {
                    console.log(errorMsg);
                }
            });
        },
        onNextPress: function () {
            let oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
                totalItems = oJsonModel.getProperty("/listData").length,
                totalPages = Math.ceil(totalItems / this.itemsPerPage);
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.updateTableBinding();
                this.updateButtonStates(); // Update button states after navigation
                this.updateActiveButton(); // Highlight active button
            }
        },
        onPreviousPress: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.updateTableBinding();
                this.updateButtonStates(); // Update button states after navigation
                this.updateActiveButton(); // Highlight active button
            }
        },
        onPagePress: function (oEvent) {
            let page = parseInt(oEvent.getSource().getText());
            this.currentPage = page;
            this.updateTableBinding();
            this.updateButtonStates(); // Update button states after navigation
            this.updateActiveButton(); // Highlight active button
        },
        onPageLimitChange: function (oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedKey();
            this.itemsPerPage = parseInt(sSelectedKey);
            this.currentPage = 1; // Reset current page to 1
            this.updateTableBinding();
            this.createPageNumberButtons();
            this.updateButtonStates(); // Update button states after changing the page limit
            this.updateActiveButton(); // Highlight active button
        },
        updateTableBinding: function () {
            let oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
                startIndex = (this.currentPage - 1) * this.itemsPerPage,
                endIndex = startIndex + this.itemsPerPage;
            let listData = oJsonModel.getProperty("/listData").slice(); // Make a copy of the data
            let visibleItems = listData.slice(startIndex, endIndex);
            oJsonModel.setProperty("/visibleItems", visibleItems);
        },
        createPageNumberButtons: function () {
            let oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
                totalItems = oJsonModel.getProperty("/listData").length,
                totalPages = Math.ceil(totalItems / this.itemsPerPage);
            let pageNumberContainer = this.byId("pageNumberContainer");
            pageNumberContainer.removeAllItems();
            for (let i = 1; i <= totalPages; i++) {
                let button = new sap.m.Button({
                    text: i.toString(),
                    type: sap.m.ButtonType.Transparent,
                    press: this.onPagePress.bind(this)
                });
                pageNumberContainer.addItem(button);
            }
        },
        updateButtonStates: function () {
            let oJsonModel = this.getOwnerComponent().getModel("jsonModel"),
                totalItems = oJsonModel.getProperty("/listData").length,
                totalPages = Math.ceil(totalItems / this.itemsPerPage);
            let navLeftButton = this.byId("navLeftButton"),
                navRightButton = this.byId("navRightButton");

            if (this.currentPage === 1) {
                navLeftButton.setEnabled(false);
            } else {
                navLeftButton.setEnabled(true);
            }

            if (this.currentPage === totalPages) {
                navRightButton.setEnabled(false);
            } else {
                navRightButton.setEnabled(true);
            }
        },
        updateActiveButton: function () {
            let pageNumberContainer = this.byId("pageNumberContainer"),
                buttons = pageNumberContainer.getItems();

            // Remove active class from all buttons
            buttons.forEach(function (button) {
                button.removeStyleClass("active");
            });

            // Add active class to the current page button
            let activeButton = buttons[this.currentPage - 1];
            activeButton.addStyleClass("active");
        }

    });
});
