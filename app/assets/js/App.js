/*globals THREE $ Tween require define */
define([
	'modules/Viewport',
	'modules/Mouse',
	'jquery',
	'EAF'
], function (Viewport, Mouse) {
	'use strict';
	var App = {
		CONST: {
			$document: $(document),
			$window: $(window)
		},
		init: function () {

			this.mouse = new Mouse();
			this.mouse.offsetCentered = true;

			this.viewport = new Viewport({
				$el: $('#Viewport'),
				width: this.CONST.$window.width(),
				height: this.CONST.$window.height()
			});
			this.viewport.createParticles();

			this.Animator = new EAF($.proxy(this.animate, this));
			this.Animator.startAnimation();
			//this.debug();

			this.bindEvents();
			this.setViewport();
		},
		animate: function () {
			this.viewport.camera.position.x += (this.mouse.x - this.viewport.camera.position.x) * 0.03;
			this.viewport.camera.position.y += (-this.mouse.y - this.viewport.camera.position.y) * 0.03;
			this.viewport.camera.lookAt(this.viewport.scene.position);
			this.viewport.update.call(this.viewport);
		},
		setViewport: function () {
			this.viewport.setSize(this.CONST.$window.width(), this.CONST.$window.height());
		},
		bindEvents: function () {
			this.CONST.$window.on('resize orientationchange', $.proxy(this.setViewport, this));

			// force the touch events
			$('.otherLinks a').on('touchstart click', function (e) {
				var href = $(this).attr('href');
				if (href) {
					window.location.href = href;
				}
			});
		},
		debug: function () {
			/*
      require(['dat.gui'], $.proxy(function (GUI) {
        this.gui = new dat.GUI();
        this.gui.add(this.mouse, 'x').listen();
        this.gui.add(this.mouse, 'y').listen();
        this.gui.add(this.viewport.camera.position, 'x', -3500, 3500);
        this.gui.add(this.viewport.camera.position, 'y', -3500, 3500);
        this.gui.add(this.viewport.camera.position, 'z', -3500, 3500);
      }, this));
      */
		}
	};

	return App;
});