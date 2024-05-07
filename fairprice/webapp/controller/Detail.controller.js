sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/UIComponent"
], function (Controller, JSONModel, UIComponent) {
    "use strict";

    return Controller.extend("fairprice.controller.Detail", {
        onInit: function () {

            this.currentPage = 1;
            this.pageSize = 5;
            // Define a page info model
            var oPageInfoModel = new sap.ui.model.json.JSONModel({
                currentPage: 1, // Initial current page
                totalPages: 1 // Initial total pages
            });

            // Set the page info model to the view
            this.getView().setModel(oPageInfoModel, "pageInfoModel");

            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("RouteDetail").attachMatched(this._onRouteMatched, this);

            // Create JSON model to store form data
            var oFormDataModel = new JSONModel({
                entries: [] // Initialize an empty array to store form entries
            });
            this.getView().setModel(oFormDataModel, "formData");


            var oModel = new JSONModel();
            oModel.loadData("model/stores.json");
            oModel.attachRequestCompleted(function () {
                this.getView().setModel(oModel, "storeModel");
            }.bind(this));
        },

        onValueHelpRequest: function () {
            var oView = this.getView();
            var oStoreModel = oView.getModel("storeModel");

            // Load fragment
            if (!this._oStoreListDialog) {
                this._oStoreListDialog = sap.ui.xmlfragment("fairprice.fragments.storeList", this);
                this.getView().addDependent(this._oStoreListDialog);
            }

            // Bind model to the SelectDialog
            this._oStoreListDialog.setModel(oStoreModel);

            // Open the SelectDialog
            this._oStoreListDialog.open();
        },

        onConfirm: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sId = oSelectedItem.getValue();

            var oInput = this.getView().byId("storeInput");
            oInput.setValue(sId);

            this._oDialog.close();
        },

        onCancel: function (oEvent) {
            this._oDialog.close();
        }


        , _onRouteMatched: function (oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            var sHeader = oArguments.header; // Assuming "header" is the parameter name

            // Create a JSON model to hold the parameter
            var oModel = new JSONModel({
                header: sHeader
            });

            // Set the model to the view
            this.getView().setModel(oModel, "parameterModel");
        },
        onTextAreaChange: function (oEvent) {
            var sText = oEvent.getParameter("value");
            var sFormattedText = sText.replace(/(?:\r\n|\r|\n)/g, ", "); // Replace new lines with comma separated

            // Set the formatted text back to the TextArea
            var oTextArea = this.getView().byId("textInput");
            oTextArea.setValue(sFormattedText);
        },
        onRadioButtonChange: function (oEvent) {
            var oTextArea = this.getView().byId("textInput");
            oTextArea.setValue(""); // Clear the TextArea value
        },
        validateSelect: function (oEvent) {
            var sSelectedKey = oEvent.getSource().getSelectedKey();
            var oRadioGroup = this.getView().byId("radioGroup");
            var aRadioButtons = oRadioGroup.getButtons();

            // Disable all radio buttons initially
            aRadioButtons.forEach(function (oRadioButton) {
                oRadioButton.setEnabled(false);
            });

            // Enable specific radio buttons based on the selected key
            switch (sSelectedKey) {
                case "RSVP":
                    aRadioButtons[0].setEnabled(true); // Enable Promo Start Date
                    aRadioButtons[1].setEnabled(true);
                    aRadioButtons[0].setSelected(true); // Enable Promo End Date
                    break;
                case "RS":
                    aRadioButtons[0].setEnabled(true);
                    aRadioButtons[0].setSelected(true);
                    break;
                case "RV":
                    aRadioButtons[2].setEnabled(true);
                    aRadioButtons[2].setSelected(true); // Enable Updated Date
                    break;
                default:
                    break;
            }
        },
        onStartDateChange: function (oEvent) {
            var oEndDatePicker = this.byId("endDatePicker");
            var sStartDate = oEvent.getParameter("value");
            // Set the minimum date for the end date picker
            oEndDatePicker.setMinDate(new Date(sStartDate));
        },
        onLoadData: function () {
            var oView = this.getView();

            // Get references to the input fields, select, and textarea
            var oStoreInput = oView.byId("storeInput");
            var oDisplaySelect = oView.byId("displaySelect");
            var oStartDatePicker = oView.byId("startDatePicker");
            var oEndDatePicker = oView.byId("endDatePicker");
            var oRadioGroup = oView.byId("radioGroup");
            var oRadioGroup2 = oView.byId("radioGroup2");
            var oTextArea = oView.byId("textInput");

            // Get the values from the controls
            var sStore = oStoreInput.getValue();
            var sDisplay = oDisplaySelect.getSelectedKey();
            var sStartDate = oStartDatePicker.getValue();
            var sEndDate = oEndDatePicker.getValue();
            var sRadioValue = oRadioGroup.getSelectedButton().getText();
            var sRadio2Value = oRadioGroup2.getSelectedButton().getText();
            var sTextAreaValue = oTextArea.getValue();

            var dStartDate = oStartDatePicker.getDateValue();
            var dEndDate = oEndDatePicker.getDateValue();

            if (!sStore) {
                sap.m.MessageToast.show("Select a Store");
            }
            else if (!sDisplay) {
                sap.m.MessageToast.show("Select Display type");
            }

            // else if (!sStartDate || !sEndDate) {
            //     sap.m.MessageToast.show("Date cannot be Empty");
            // }

            // else if (dStartDate > dEndDate) {
            //     sap.m.MessageToast.show("End date cannot be prior to the start date");
            // }

            else {
                // Get the existing data from the JSON model
                var oFormDataModel = this.getView().getModel("formData");
                var aEntries = oFormDataModel.getProperty("/entries") || [];

                // Create a new entry object
                var oNewEntry = {
                    store: sStore,
                    display: sDisplay,
                    startDate: sStartDate,
                    endDate: sEndDate,
                    radioValue: sRadioValue,
                    radio2Value: sRadio2Value,
                    textAreaValue: sTextAreaValue
                };
                // Add the new entry to the existing data
                aEntries.push(oNewEntry);
                // Set the updated data back to the JSON model
                oFormDataModel.setProperty("/entries", aEntries);
                // Show the form data table
                oView.byId("formDataTable").setVisible(true);
                this.updatePaginationUI();
            }
           
            
        },
        updateTableItems: function () {
            var oTable = this.byId("formDataTable");
            var oBinding = oTable.getBinding("items");
            var oFormDataModel = this.getView().getModel("formData");
            var aEntries = oFormDataModel.getProperty("/entries") || [];
            var iStartIndex = (this.currentPage - 1) * this.pageSize;
            var aVisibleEntries = aEntries.slice(iStartIndex, iStartIndex + this.pageSize);

            oBinding.filter([]);
            oBinding.filter(new sap.ui.model.Filter({
                path: "",
                test: function (oEntry) {
                    return aVisibleEntries.includes(oEntry);
                }
            }));
            
           
        },
        _UpdateButtonState: function () {
            var oPageInfoModel = this.getView().getModel("pageInfoModel");
            var currentPage = oPageInfoModel.getProperty("/currentPage");
            var totalPages = oPageInfoModel.getProperty("/totalPages");
         

            if (currentPage <= 1) {
                this.byId("navLeftButton").setEnabled(false);
                this.byId("navFirstButton").setEnabled(false);
            } else {
                this.byId("navLeftButton").setEnabled(true);
                this.byId("navFirstButton").setEnabled(true);
            }

            if (currentPage >= totalPages) {
                this.byId("navRightButton").setEnabled(false);
                this.byId("navLastButton").setEnabled(false);
            } 
            else {
                this.byId("navRightButton").setEnabled(true);
                this.byId("navLastButton").setEnabled(true);
            }
        },

        // Function to handle previous button press
        onPreviousPress: function () {
            if (this.currentPage > 1) {
                this.currentPage--;
                console.log(this.currentPage);
                this.updatePaginationUI();
            }
        },

        // Function to handle next button press
        onNextPress: function () {
            var oFormDataModel = this.getView().getModel("formData");
            var aEntries = oFormDataModel.getProperty("/entries") || [];
            var totalPages = Math.ceil(aEntries.length / this.pageSize);

            if (this.currentPage < totalPages) {
                this.currentPage++;
                console.log(this.currentPage);
                this.updatePaginationUI();
            }
        },
        onFirstPagePress: function () {
            this.currentPage = 1;
            this.updatePaginationUI();
        },
        
        // Function to handle last page button press
        onLastPagePress: function () {
            var oFormDataModel = this.getView().getModel("formData");
            var aEntries = oFormDataModel.getProperty("/entries") || [];
            var totalPages = Math.ceil(aEntries.length / this.pageSize);
        
            this.currentPage = totalPages;
            this.byId("navLastButton").setEnabled(false);
            this.updatePaginationUI();
        },
        // Function to update pagination UI
        updatePaginationUI: function () {
            var oView = this.getView();
            var oPageInfoModel = oView.getModel("pageInfoModel");
            var oFormDataModel = oView.getModel("formData");
            var aEntries = oFormDataModel.getProperty("/entries");
            var totalPages = Math.ceil(aEntries.length / this.pageSize);

            oPageInfoModel.setProperty("/currentPage", this.currentPage);
            oPageInfoModel.setProperty("/totalPages", totalPages);
            this.byId("PaginationBar").setVisible(totalPages > 1);
            this.updateTableItems();
            this._UpdateButtonState();
        },

        onSearch: function (oEvent) {
            var sValue = oEvent.getParameter("value");
            var oBinding = oEvent.getSource().getBinding("items");

            if (sValue) {
                var oFilter = new sap.ui.model.Filter([
                    new sap.ui.model.Filter("name", sap.ui.model.FilterOperator.Contains, sValue),
                    new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.Contains, sValue)
                ], false);

                oBinding.filter(oFilter);
            } else {
                oBinding.filter([]);
            }
        }
        ,
        onClearAll: function () {
            var oView = this.getView();

            // Clear input fields
            oView.byId("storeInput").setValue("");
            oView.byId("displaySelect").setSelectedItem(null);
            oView.byId("startDatePicker").setValue("");
            oView.byId("endDatePicker").setValue("");
           // oView.byId("radioGroup").setSelectedButton("");
            // oView.byId("radioGroup2").setSelectedButton(null);
            oView.byId("textInput").setValue("");

            // Hide the form data table
            oView.byId("formDataTable").setVisible(false);
            oView.byId("PaginationBar").setVisible(false);

        },

        onNavBack: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("RouteHome");
            this.onClearAll();
        }
    });
});
