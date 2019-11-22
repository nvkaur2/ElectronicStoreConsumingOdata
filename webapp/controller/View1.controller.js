sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("sap.dev.order.controller.View1", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.dev.order.view.View1
		 */
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.turakmakto, this);
		},
		turakmakto: function (oEvent) {
			var fruitId = oEvent.getParameter("arguments").pid;
			var oList = this.getView().byId("myList");
			var items = oList.getItems();
			var oItem = items[fruitId];
			if (oItem) {
				oList.setSelectedItem(oItem);
				oItem.focus();
			}
		},
		onNext: function (fruitId) {
			//var oAppContainer = this.getView().getParent().getParent();
			//oAppContainer.to("idView2");
			this.oRouter.navTo("kaur", {
				pid: fruitId
			});
		},
		onAdd: function(){
			this.oRouter.navTo("add");
		},
		onDelete: function (oEvent) {
			var oView = this.getView().byId("myList");
			// var oView= oEvent.getSource();
			var oItem = oEvent.getParameter("listItem");
			oView.removeItem(oItem);
		},
		onSearch: function (oEvent) {
			var sQuery = oEvent.getParameter("query");
			var oFilter = new Filter("ProductID", FilterOperator.Contains, sQuery);
			var oList = this.getView().byId("myList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(oFilter);
		},
		onItemPress: function (oEvent) {
				var selectedItem = oEvent.getParameter("listItem");
				var s = selectedItem.getBindingContextPath();
				//this.getView().getParent().getParent().getDetailPages()[1].bindElement(selectedItem.getBindingContextPath());
				var idx = s.split("/")[s.split("/").length - 1];
				this.onNext(idx);
			}
			/**
			 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
			 * (NOT before the first rendering! onInit() is used for that one!).
			 * @memberOf sap.dev.order.view.View1
			 */
			//	onBeforeRendering: function() {
			//
			//	},
			/**
			 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
			 * This hook is the same one that SAPUI5 controls get after being rendered.
			 * @memberOf sap.dev.order.view.View1
			 */
			//	onAfterRendering: function() {
			//
			//	},
			/**
			 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
			 * @memberOf sap.dev.order.view.View1
			 */
			//	onExit: function() {
			//
			//	}
			,
		/**
		 *@memberOf sap.dev.order.controller.View1
		 */
		oProdPopup: null,
		onPrintFind: function (oEvent) {
			if (!this.oProdPopup) {
				this.oProdPopup = new sap.ui.xmlfragment("sap.dev.order.fragments.popup");
				this.getView().addDependent(this.oProdPopup);
				this.oProdPopup.bindAggregation("items", {
					path: "/ProductSet",
					filters: new Filter("Category", FilterOperator.Contains, "Printer"),
					template: new sap.m.DisplayListItem({
						label: "{Name}",
						value: "{Category}"
					})
				});
			}
			this.oProdPopup.open();
		},
		/**
		 *@memberOf sap.dev.order.controller.View1
		 */
		oDialog:  null,
		onSingleRead: function (oEvent) {
			var val = this.getView().byId("idSearch").getValue();
			var oModel = this.getView().getModel();
			var that = this;
			oModel.read("/ProductSet('" + val + "')", {
				success: function (res) {
					that.oDialog = new sap.m.Dialog({
						title: 'Product detail',
						content: [new sap.ui.layout.form.SimpleForm({
							content: [
								new sap.m.Label({
									text: "Name"
								}),
								new sap.m.Input({
									value: res.Name
								}),
								new sap.m.Label({
									text: "Category"
								}),
								new sap.m.Input({
									value: res.Category
								}),
								new sap.m.Label({
									text: "Price"
								}),
								new sap.m.Input({
									value: res.Price
								}),
								new sap.m.Label({
									text: "Currency"
								}),
								new sap.m.Input({
									value: res.CurrencyCode
								})

							]
						}),
						],
						endButton: new sap.m.Button({
						text: 'Close',
						press: function () {
							that.oDialog.close();
						}
					})
					});
				that.oDialog.open();
				},

				error: function (err) {
					sap.m.MessageBox.error(JSON.parse(err.responseText).error.message.value,{title: "Error"});
				
				}
			});
		}
	});
});