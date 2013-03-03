require.config({
	baseUrl: "scripts",
	shim: {

	},
	paths: {
		"threejs": "vendor/threejs/three",
		"tinycolor":"helpers/tinycolor",
		"tweenjs": "helpers/Tween"
	}
});

require([
	"App",
	"threejs"
], function( App, THREE ) {
	"use strict";
	window.global = {};
	window.global.colorsArray = [
		["cyan","00B9E3"],
		["magenta","E63587"],
		["orange","FF9D00"],
		["green","35E655"]
	];
	window.global.currentColor = window.global.colorsArray[Math.round(Math.random() * 3)];
	window.global.colorName = window.global.currentColor[0];
	window.global.colorHex = window.global.currentColor[1];
	$("body").addClass(window.global.colorName);
	App.init();
});