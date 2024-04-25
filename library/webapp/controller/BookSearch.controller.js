sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
  ], function(Controller, JSONModel) {
    "use strict";
  
    return Controller.extend("library.controller.BookSearch", {
      onInit: function() {
        var oModel = new JSONModel("model/books.json");
        this.getView().setModel(oModel);
      },
  
      onSearch: function(oEvent) {
        var sQuery = oEvent.getParameter("query");
        var oTable = this.byId("booksTable");
        var oBinding = oTable.getBinding("items");
        if (sQuery) {
          var oFilter = new sap.ui.model.Filter([
            new sap.ui.model.Filter("title", sap.ui.model.FilterOperator.Contains, sQuery),
            new sap.ui.model.Filter("author", sap.ui.model.FilterOperator.Contains, sQuery),
            new sap.ui.model.Filter("id", sap.ui.model.FilterOperator.Contains, sQuery),
            new sap.ui.model.Filter("status", sap.ui.model.FilterOperator.Contains, sQuery)
          ], false);
          oBinding.filter(oFilter);
        } else {
          oBinding.filter([]);
        }
      }
    });
  });
  