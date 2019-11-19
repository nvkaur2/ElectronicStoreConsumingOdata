sap.ui.define(["sap/ui/core/Control"], function (Control) {
	return Control.extend("MyHeading", {
		metadata: {
			properties: {
				"text": "",
				"color": "",
				"align": "",
			}
		},
		init: function () {
			this.setColor("HotPink");
			this.setAlign("center");
		},
		renderer: function (oRm, oControl) {
			oRm.write('<h1');
			oRm.addStyle("color", oControl.getColor());
			oRm.addStyle("text-align", oControl.getAlign());
			oRm.writeStyles();
			oRm.write(">");
			oRm.write(oControl.getText());
			oRm.write("</h1>");
		}
	});
});