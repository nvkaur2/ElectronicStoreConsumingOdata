sap.ui.define(["sap/ui/core/UIComponent"], function (UIComponent) {
	return UIComponent.extend("sap.dev.order.Component", {
		"metadata": {
			manifest: "json"
		},
		init: function () {
			sap.ui.core.UIComponent.prototype.init.apply(this);
			this.getRouter().initialize();
		},
		// createContent: function () {

		// 	var oView = new sap.ui.view("idApp", {
		// 		type: "XML",
		// 		viewName: "sap.dev.order.view.App"
		// 	});

		// 	return oView;
		// },
		destroy: function () {
			sap.ui.core.UIComponent.prototype.destoroy.apply(this);
		}
	});
});