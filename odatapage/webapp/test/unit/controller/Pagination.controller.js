/*global QUnit*/

sap.ui.define([
	"odatapage/controller/Pagination.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Pagination Controller");

	QUnit.test("I should test the Pagination controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
