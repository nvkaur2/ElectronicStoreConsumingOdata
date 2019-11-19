sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/dev/order/model/models"
], function (Controller, models) {
	"use strict";

	return Controller.extend("sap.dev.order.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.dev.order.view.App
		 */
		onInit: function () {
			// var oView1 = new sap.ui.view("idView1", {
			// 	viewName: "sap.dev.order.view.View1",
			// 	type: sap.ui.core.mvc.ViewType.XML
			// });

			// var oView2 = new sap.ui.view("idView2", {
			// 	viewName: "sap.dev.order.view.View2",
			// 	type: sap.ui.core.mvc.ViewType.XML
			// });

			// var oDefault = new sap.ui.view("idView3", {
			// 	viewName: "sap.dev.order.view.Default",
			// 	type: sap.ui.core.mvc.ViewType.XML
			// });

			// var oAppContainer = this.getView().byId("myApp");
			// oAppContainer.addMasterPage(oView1);
			// oAppContainer.addDetailPage(oDefault);
			// oAppContainer.addDetailPage(oView2);

			// var oModel = models.createFruitModel();
			// this.getView().setModel(oModel);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.dev.order.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.dev.order.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.dev.order.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});