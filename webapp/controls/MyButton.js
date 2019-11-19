sap.ui.define(["sap/m/Button"], function (button) {
	return button.extend("sap.dev.order.controls.MyButton", {
		metadata: {
			events: {
				"hover": {}
			}
		},
		onmouseover  : function () {
			this.fireHover();
		},
		renderer: {}

	});
});