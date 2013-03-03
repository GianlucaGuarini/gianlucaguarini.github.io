define(["helpers/jQuery.smartresize"],function(){
	"use strict";
	var Camera = function ( options ) {
		// Public Vars
		this.x 	= options.x || 0;
		this.y 	= options.y || 0;
		this.z 	= options.z || 0;
		this.setSize = function ( width, height ) {

		};
		
		return this;
	};

	return Camera;
});