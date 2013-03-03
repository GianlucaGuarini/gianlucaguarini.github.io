/*globals THREE TWEEN $ Tween require define */
define([
	"tweenjs",
	"modules/Vector",
	"tinycolor",
	"helpers/jQuery.smartresize"
],function( TWEEN, Vector, tinycolor ){
	"use strict";
	var Viewport = function ( options ) {
		// Private Vars
		var NUM_PARTICLES = 25,
			PI2 = Math.PI * 2,
			CAMERA_ZOOM = 1300;
		// Public Vars
		this.$el		= options.$el;
		this.width		= options.width;
		this.height		= options.height;
		this.renderer	= new THREE.CanvasRenderer();
		this.camera		= new THREE.PerspectiveCamera( 45, this.width / this.height, 1, 10000 );
		this.scene		= new THREE.Scene();
		this.Particles	= [];
		this.lines		= new THREE.Geometry();
		this.color 		= Number("0x" + window.global.colorHex);
		this.colorLighten = Number("0x" + tinycolor.lighten(window.global.colorHex,30).toHex());
		this.camera.position.z = CAMERA_ZOOM;
		/*
		*
		* Private methods
		*
		*/
		var _getRandomCoordinates = function () {
			return {
				position:{
					x			: Math.random() * 1800 - 900,
					y			: Math.random() * 1800 - 900,
					z			: Math.random() * 1800 - 900
				},
				delay		: Math.random() * 8000 + 2000,
				speed		: Math.random() * 10000 + 2000,
				rotation	: {
					x	: Math.random(),
					y	: Math.random(),
					z	: Math.random()
				}
			};
		};
		var _tweenParticle = function ( Particle ) {
			var newCoordinates = _getRandomCoordinates();

			new TWEEN.Tween( Particle.vector.position )
					.to({
						x:newCoordinates.position.x,
						y:newCoordinates.position.y,
						z:newCoordinates.position.z
					}, Particle.vector.speed )
					.onUpdate(function(){
						Particle.mesh.rotation.x += 0.1;
						Particle.mesh.rotation.y += 0.1;
						Particle.mesh.rotation.z += 0.1;
					})
					.easing( TWEEN.Easing.Quadratic.InOut )
					.delay(Particle.vector.delay)
					.onComplete( $.proxy( _tweenParticle, this, Particle ))
					.start();

		};

		this.setSize = function ( width, height ) {

			this.camera.aspect = width / height;
			this.renderer.setSize( width, height );
			this.camera.updateProjectionMatrix();


		};
		this.createParticles = function () {

			var material	= new THREE.MeshBasicMaterial( {color: this.color,wireframeLinecap:"round",wireframe:true} ),
				particleMaterial = new THREE.ParticleCanvasMaterial( {
					color: this.colorLighten,
					program: function ( context ) {
						context.beginPath();
						context.arc( 0, 0, 5, 0, PI2, true );
						context.closePath();
						context.fill();
					}
				}),
				i = NUM_PARTICLES;

			while (i --) {
				var coordinates	= _getRandomCoordinates(),
					cube		= new THREE.Mesh(new THREE.CubeGeometry( 20, 20, 20 ),material),
					Particle = {
						vector: new Vector( coordinates ),
						particle: new THREE.Particle( particleMaterial ),
						mesh:cube
					};
				this.Particles.push(Particle);

				Particle.mesh.position		= Particle.vector.position;
				Particle.mesh.rotation		= Particle.vector.rotation;
				Particle.particle.position	= Particle.vector.position;

				this.lines.vertices.push( Particle.mesh.position );

				this.scene.add(Particle.mesh);
				this.scene.add(Particle.particle);

				_tweenParticle(Particle);
			}

			this.line = new THREE.Line( this.lines, new THREE.LineBasicMaterial( {
				color: 0xDDDDDD, opacity: 1, linewidth: 1
			}));

			this.scene.add( this.line );


		};

		this.update = function () {
			TWEEN.update();
			this.renderer.render(this.scene,this.camera);
		};

		this.setSize( this.width, this.height );
		this.$el.html(this.renderer.domElement);
		return this;
	};

	return Viewport;
});