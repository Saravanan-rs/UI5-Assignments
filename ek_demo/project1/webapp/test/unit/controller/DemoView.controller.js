/*global QUnit*/

sap.ui.define([
	"comincture/project1/controller/DemoView.controller"
], function (Controller) {
	"use strict";

	QUnit.module("DemoView Controller");

	QUnit.test("I should test the DemoView controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
