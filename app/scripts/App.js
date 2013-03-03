/*globals THREE $ Tween require define */
define([
	"helpers/EasyAnimationFrame",
	"modules/Viewport",
	"modules/Mouse"
], function( EAF, Viewport, Mouse ) {
	"use strict";
	var App = {
		CONST: {
			$document: $(document),
			$window: $(window)
		},
		init: function () {

			this.Mouse = new Mouse();
			this.Mouse.offsetCentered = true;

			this.Viewport = new Viewport({
				$el:$("#Viewport"),
				width: this.CONST.$window.width(),
				height:this.CONST.$window.height()
			});
			this.Viewport.createParticles();

			this.Animator = new EAF($.proxy(this.animate,this));
			this.Animator.startAnimation();
			//this.debug();

			this.bindEvents();
		},
		animate: function () {
			this.Viewport.camera.position.x += ( this.Mouse.x - this.Viewport.camera.position.x ) * 0.03;
			this.Viewport.camera.position.y += ( - this.Mouse.y - this.Viewport.camera.position.y ) * 0.03;
			this.Viewport.camera.lookAt( this.Viewport.scene.position );
			this.Viewport.update.call(this.Viewport);
		},
		setViewport: function () {
			this.Viewport.setSize(this.CONST.$window.width(),this.CONST.$window.height());
		},
		bindEvents: function () {
			this.CONST.$window.on("smartresize.App",$.proxy(this.setViewport,this));
		},
		debug: function () {
			require(["vendor/dat.gui.min"],$.proxy(function(GUI){
				this.gui = new dat.GUI();
				this.gui.add(this.Mouse, 'x').listen();
				this.gui.add(this.Mouse, 'y').listen();
				this.gui.add(this.Viewport.camera.position, 'x', -3500, 3500);
				this.gui.add(this.Viewport.camera.position, 'y', -3500, 3500);
				this.gui.add(this.Viewport.camera.position, 'z', -3500, 3500);
			},this));
		}
	};

	return App;
});