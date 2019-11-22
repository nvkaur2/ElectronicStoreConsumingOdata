sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/m/MessageToast",
	"sap/ui/core/routing/History",
	"sap/ui/core/IndicationColor",
	"sap/ui/model/json/JSONModel"
], function (Controller, messageBox, messageToast, History, IndicationColor, JSONModel) {
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

			var oModel = new JSONModel();
			oModel.setData({
				"ProductID": "",
				"TypeCode": "PR",
				"Category": "Notebooks",
				"Name": "",
				"NameLanguage": "EN",
				"Description": "",
				"DescriptionLanguage": "EN",
				"SupplierID": "0100000051",
				"SupplierName": "TECUM",
				"TaxTarifCode": 1,
				"MeasureUnit": "EA",
				"WeightMeasure": "4.300",
				"WeightUnit": "KG",
				"CurrencyCode": "",
				"Price": "",
				"Width": "33.000",
				"Depth": "20.000",
				"Height": "3.000",
				"DimUnit": "CM",
				"CreatedAt": "\/Date(1574214563355)\/",
				"ChangedAt": "\/Date(1574214563355)\/"
			});

			this.getView().setModel(oModel, "viewModel");

		},

		turakmakto: function (oEvent) {

		},

		onBack: function () {
			var history = History.getInstance();
			var sPreviousHash = history.getPreviousHash();
			//	this.oRouter.navTo(previousHash);
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			}

		},

		onDelete: function () {
			var oModel = this.getView().getModel("viewModel");
			var payload = oModel.getProperty("/");

			var oDataModel = this.getView().getModel();
			oDataModel.remove("/ProductSet('" + payload.ProductID + "')", {
				success: function () {
					messageBox.success("Deleted");
				},
				error: function () {
					messageBox.error("Error occured")
				}
			})
		},
		fieldId: "",
		oSuppliersPopup: null,

		onF4: function (oEvent) {
			this.fieldId = oEvent.getSource().getId();
			if (!this.oSuppliersPopup) {
				this.oSuppliersPopup = new sap.ui.xmlfragment("sap.dev.order.fragments.popup");
				this.getView().addDependent(this.oSuppliersPopup);
				this.oSuppliersPopup.setMultiSelect(false);
				this.oSuppliersPopup.bindAggregation("items", {
					path: "/BusinessPartnerSet",
					template: new sap.m.StandardListItem({
						icon: "sap-icon://home",
						title: "{BusinessPartnerID}",
						description: "{CompanyName}"
					})
				});
				this.oSuppliersPopup.attachConfirm(this.onConfirm, this);
			}
			this.oSuppliersPopup.open();
		},

		onConfirm: function (oEvent) {
			this.fielId.setValue(oEvent.getParameter("selectedItem").getLabel());
		},

		onSave: function () {
			var oModel = this.getView().getModel("viewModel");
			var payload = oModel.getProperty("/");
			var oDataModel = this.getView().getModel();
			oDataModel.create("/ProductSet", payload, {
				success: function (data) {
					messageBox.success("Product added");
				},
				error: function (oErr) {
					messageBox.success("Something wrong")
				}
			})
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