sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"splitapp/utils/formatter"
],
	function (Controller, formatter) {
		"use strict";

		return Controller.extend("splitapp.controller.View1", {
			formatter: formatter,

			onInit: function () {

			},
			onMasterItemPress: function (oEvent) {
				var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
				this.byId("splitApp").toDetail(this.createId(sToPageId));
			},
			onEmployeeDBPress: function () {
				this.byId("splitApp").toMaster(this.createId("employeesDBPage"));

			},
			onMasterBack: function () {
				this.byId("splitApp").backMaster();
			},
			onEmployeeListItemPress: function (oEvent) {
				var oItem = oEvent.getParameter("listItem");
				var oCtx = oItem.getBindingContext();
				var sPath = oCtx.getPath();
				var oDetailPage = this.byId("employeeDBPage");

				oDetailPage.bindElement(sPath);

				this.byId("splitApp").toDetail(this.createId("employeeDBPage"));
			}
			
		});
	});
