sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/core/IndicationColor"
], function (Controller, messageBox, messageToast, History, IndicationColor) {
	"use strict";

	return Controller.extend("sap.dev.order.controller.View2", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.dev.order.view.View2
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.turakmakto, this);

		},

		turakmakto: function (oEvent) {
			var sPath = "/" + oEvent.getParameter("arguments").pid;
			this.getView().bindElement(sPath);
			var oFormObj= this.getView().getContent()[0].getContent()[1].getItems()[0].getContent()[0];
			oFormObj.bindElement("ToSupplier")
		},
		onClick: function (oEvent) {
			oEvent.getSource().addStyleClass("abc");
			messageToast.show("Order Cancelled");
		},
		onBack: function () {
			var history = History.getInstance();
			var sPreviousHash = history.getPreviousHash();
			//	this.oRouter.navTo(previousHash);
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}

		},

		onSelect: function (oEvent) {
			var oo = oEvent.getSource();
			var a = oo.getSelectedItems();
			if (a.length > 2) {
				oo.setValueState(sap.ui.core.ValueState.Error);
				oo.setValueStateText("Can only select 2 cities");
			} else {
				oo.setValueState(sap.ui.core.ValueState.None);
			}

		},
		onSave: function () {
			messageBox.confirm("Do you want to save?", {
				onClose: this.onClose
			});
		},

		onCancel: function () {
			messageToast.show("Your order is canceled");
		},

		onClose: function (args) {
			if (args === "OK") {
				messageToast.show("Your object is saved");
			} else {

				messageBox.error("Object could not be saved");
			}

		}
	});

});