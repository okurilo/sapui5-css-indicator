sap.ui.core.Control.extend("cheburaska.control.SWIndicator", {
	metadata: {
		properties: {
			"right" : {type: "int", defaultValue: 0},
			"left" : {type: "int", defaultValue: 0},
			"size": {type: "int", defaultValue: 14}
		}
	},
	setRight: function (value) {
		var sPrevious = this.getRight();
		this.setProperty("right", value, true);
		// this.setProperty("percent", percent, true);
		// this.$().find(".eval-radial__value").css("background-size", "100% " + percent + "%");
		if (sPrevious !== value) {
			sap.ui.getCore().byId(this.sId).rerender();
			// $("#"+this.sId+" .right-num").html(value);
		}
	},
	setLeft: function (value) {
		var sPrevious = this.getLeft();
		this.setProperty("left", value, true);
		if (sPrevious !== value) {
			sap.ui.getCore().byId(this.sId).rerender();
			// $("#"+this.sId+" .left-num").html(value);
		}
		// this.setProperty("percent", percent, true);
		// this.$().find(".eval-radial__value").css("background-size", "100% " + percent + "%");
	},
	setSize: function (size) {
		if (size > 2 && size < 32 ) {
			this.setProperty("size", size, true);
			this.$().find(".indicator-container").css("font-size", size + "px");
			sap.ui.getCore().byId(this.sId).rerender();
		} else {
			console.log("Error! Size can't be more than 32px, and less than 2px");
		}
	},
	_calcPercent: function (right, left) {
		var sum = right + left;
		// var iRightPercent = parseInt(100-(nIndex * 75 / nLength), 10)
		var iRightPercent = parseInt((right * 100 / sum), 10);
		var iLeftPercent = parseInt((left * 100 / sum), 10);
		return {iRightPercent, iLeftPercent}
	},
	renderer: function(oRm, oControl) {
		// var percent = parseInt(oControl.getPercent(), 10);
		var sRightColor = "yellow";
		var sLeftColor = "green";
		
		var sRightValue = parseInt(oControl.getRight(), 10);
		var sLeftValue = parseInt(oControl.getLeft(), 10);
		var oPercents = oControl._calcPercent(sRightValue, sLeftValue);
		console.info("Debbug From SWIndicator -> sRightValue/sLeftValue: ", sRightValue, sLeftValue);

		/* Section */		
		oRm.write('<figure');
		oRm.writeControlData(oControl);
		oRm.addClass("indicator-container");
		oRm.addStyle("font-size", oControl.getSize() + "px");
		oRm.writeStyles();
		oRm.writeClasses();
		oRm.write(">");
			/* UL - list */
			oRm.write('<ul');
			oRm.addClass();
			oRm.writeStyles();
			oRm.writeClasses();
			oRm.write(">");
				/* Left arrow */	
				oRm.write('<li');
				oRm.addClass("left-side-arrow");
				if (oPercents.iLeftPercent > 85) { 
					oRm.addStyle("border-right", "1em solid "+ sLeftColor);
				}
				oRm.writeStyles();
				oRm.writeClasses();
				oRm.write("></li>");

				/* Left side arrow */
				oRm.write('<li');
				oRm.addClass("left-side");
				if (oPercents.iLeftPercent > 85) {
					oRm.addStyle("background", sLeftColor);
				}
				oRm.writeStyles();
				oRm.writeClasses();
				oRm.write(">");
					oRm.write('<span');
					oRm.addClass("left-num");
					oRm.writeStyles();
					oRm.writeClasses();
					oRm.write(">");
						oRm.write(sLeftValue);
					oRm.write("</span>");

					oRm.write('<div');
					oRm.addClass("left-inner");
					if (oPercents.iLeftPercent > 85) {
						oRm.addStyle("display", "none");
					} else {
						oRm.addStyle("display", "block");
						oRm.addStyle("width", oPercents.iLeftPercent + "%");
					}
					oRm.writeStyles();
					oRm.writeClasses();
					oRm.write(">");
					oRm.write("</div>");
				oRm.write("</li>");

				oRm.write('<li');
				oRm.addClass("circle");
				oRm.writeStyles();
				oRm.writeClasses();
				oRm.write(">");
					oRm.write('<div');
					oRm.addClass("little-circle");
					oRm.writeStyles();
					oRm.writeClasses();
					oRm.write(">");
					oRm.write("</div>");
				oRm.write("</li>");

				/* Right side */
				oRm.write('<li');
				oRm.addClass("right-side");
				if (oPercents.iRightPercent > 85) {
					oRm.addStyle("background", sRightColor);
				}
				oRm.writeStyles();
				oRm.writeClasses();
				oRm.write(">");
					oRm.write('<span');
					oRm.addClass("right-num");
					oRm.writeStyles();
					oRm.writeClasses();
					oRm.write(">");
						oRm.write(sRightValue);
					oRm.write("</span>");

					oRm.write('<div');
					oRm.addClass("right-inner");
					if (oPercents.iRightPercent > 85) {
						oRm.addStyle("display", "none");
					} else {
						oRm.addStyle("display", "block");
						oRm.addStyle("width", oPercents.iRightPercent + "%");
					}
					oRm.writeStyles();
					oRm.writeClasses();
					oRm.write(">");
					oRm.write("</div>");
				oRm.write("</li>");

				/* Right arrow */		
				oRm.write('<li');
				oRm.addClass("right-side-arrow");
				if (oPercents.iRightPercent > 85) { 
					oRm.addStyle("border-left", "1em solid "+ sRightColor);
				}
				oRm.writeStyles();
				oRm.writeClasses();
				oRm.write("></li>");

			oRm.write("</ul>");			
		oRm.write("</figure>");
	}
})
