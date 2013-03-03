define([],function(){
	"use strict";
	var Vector = function ( options ) {
		this.position	= options.position;
		this.vx			= options.vx || 0;
		this.vy			= options.vy || 0;
		this.vz			= options.vz || 0;
		this.rotation	= {};
		this.rotation.x = (options.rotation && options.rotation.x) ? options.rotation.x : 0;
		this.rotation.y = (options.rotation && options.rotation.y) ? options.rotation.y : 0;
		this.rotation.z = (options.rotation && options.rotation.z) ? options.rotation.z : 0;
		this.delay		= options.delay || 0;
		this.speed		= options.speed || 0;
		return this;
	};

	return Vector;
});