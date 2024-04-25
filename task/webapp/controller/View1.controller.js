sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("task.controller.View1", {
        onInit: function () {
            var dataModel = new JSONModel("model/data.json");
            dataModel.attachRequestCompleted(function () {
                var data = dataModel.getData().data;
                this.totalItems = data.length;
                this.limit = 10;
                this.totalPages = this.totalItems / this.limit;
                this.currentPage = 1;
                var pageInfoModel = new JSONModel({
                    totalPages: this.totalPages,
                    currentPage: this.currentPage
                });

                this.getView().setModel(pageInfoModel, "pageInfoModel");
                this._UpdateButtons();
                var firstTenRecords = data.slice(0, 10);
                dataModel.setProperty("/data", firstTenRecords);

            }.bind(this));
            this.getView().setModel(dataModel);
        },
        onPreviousPress: function () {
            this.currentPage--;
            console.log(this.currentPage * 10);
            this._UpdateButtons();
            this._UpdateData();
        },
        onNextPress: function () {
            this.currentPage++;
            console.log(this.currentPage * 10);
            this._UpdateButtons();
            this._UpdateData();
        },
        _UpdateButtons: function () {
            if (this.currentPage == 1) {
                this.byId("navLeftButton").setEnabled(false);

            }
            else if (this.currentPage >= 1 && this.currentPage < this.totalPages) {
                this.byId("navLeftButton").setEnabled(true);
                this.byId("navRightButton").setEnabled(true);

            }
            else if (this.currentPage >= this.totalPages) {
                this.byId("navRightButton").setEnabled(false);
            }
        },
        _UpdateData: function () {
            var dataModel = new JSONModel("model/data.json");
            dataModel.attachRequestCompleted(function () {
                var data = dataModel.getData().data;
                var firstTenRecords = data.slice(((this.currentPage - 1) * (this.limit)), (this.currentPage * this.limit));
                dataModel.setProperty("/data", firstTenRecords);
            }.bind(this));
            this.getView().setModel(dataModel);
            var pageInfoModel = new JSONModel({
                totalPages: this.totalPages,
                currentPage: this.currentPage
            });

            this.getView().setModel(pageInfoModel, "pageInfoModel");

        }
    });
});
