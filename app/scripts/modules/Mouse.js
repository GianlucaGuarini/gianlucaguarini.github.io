define([],function(){
	"use strict";

	var Mouse = function ( $el ) {
		// Public Vars
		this.$el	= $el || $(window);
		this.x		= 0;
		this.y		= 0;
		this.offsetCentered = false;

		// Private Vars
		var viewport	= {};

		/*
		*
		* Private Internal Methods
		*
		*/
		var _getPointerEvent = function(event) {
			return event.originalEvent.targetTouches ? event.originalEvent.targetTouches[0] : event;
		};
		/*
		*
		* Set the x and y values of this class according to the mouse coordinates givent to the event object
		* @param e: { object } it is a jQuery object containing all the data needed to get correclty the mouse coordinates
		*
		*/

		var _setMouseCoordinates = function ( e ) {
			e.preventDefault();
			var pointer = _getPointerEvent(e),
				x = pointer.pageX - viewport.offset.left,
				y = pointer.pageY - viewport.offset.top;

			if (this.offsetCentered) {
				x -= viewport.width / 2;
				y -= viewport.height / 2;
			}

			this.x = x;
			this.y = y;
		};

		/*
		*
		* Public API Methods
		*
		*/
		this.init = function () {
			this.setViewport();
			this.bindEvents();
		};
		this.bindEvents = function () {
			this.$el.on("mousernter.Mouse mousemove.Mouse touchstart.Mouse touchenter.Mouse touchmove.Mouse", $.proxy( _setMouseCoordinates, this ));
		};
		this.setViewport = function () {
			var offset = this.$el.offset();
			viewport = {
				width: this.$el.width(),
				height: this.$el.height(),
				offset: {
					top: offset ?  offset.top : 0,
					left: offset ? offset.left : 0
				}
			};
		};
		this.destroy = function () {
			this.$el.off(".Mouse");
		};

		this.init();

		return this;
	};
	return Mouse;
});