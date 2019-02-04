(function() {

    var ZERO_VECTOR = {
            x: 0,
            y: 0,
            z: 0
        };
    var _this;
    
    var TRIGGER_CONTROLS = [
        Controller.Standard.LT,
        Controller.Standard.RT,
    ];
    var TRIGGER_THRESHOLD = 0.50;

    Laptop = function() {
        _this = this;
        this.equipped = false;

        //this.blastSound = SoundCache.getSound('https://github.com/krougeau/HF-Stuff/raw/master/nny/BOMB.wav');        
        this.blastVolume = 0.2;
    };

    Laptop.prototype = {
        canShoot: false,

        startEquip: function(id, params) {
            this.equipped = true;
            this.hand = params[0] == "left" ? 0 : 1;
        },

        continueEquip: function(id, params) {
            if (!this.equipped) {
                return;
            }
            this.updateProps();
            this.toggleWithTriggerPressure();
        },

        updateProps: function() {
            var laptopProps = Entities.getEntityProperties(this.entityID, ['position', 'rotation']);
            this.position = laptopProps.position;
            this.rotation = laptopProps.rotation;
            var upVec = Quat.getUp(this.rotation);
        },
        toggleWithTriggerPressure: function() {
            this.triggerValue = Controller.getValue(TRIGGER_CONTROLS[this.hand]);
            
            if (this.triggerValue < TRIGGER_THRESHOLD) {
                this.canShoot = true;
            }
            if (this.canShoot === true && this.triggerValue >= TRIGGER_THRESHOLD) {
                this.fire();
                this.canShoot = false;
            }
        },
        
        releaseEquip: function(id, params) {
            this.hand = null;
            this.equipped = false;
        },

        triggerPress: function(hand, value) {
            if (this.hand === hand && value === 1) {
                this.fire();
            }
        },

        fire: function() {
			this.canShoot = false;
			
			/*
            Audio.playSound(this.blastSound, {
                position: this.position,
                volume: this.blastVolume
            });
			*/
			
            //this.createBlastEffect(this.position)
			print('firing..');
;			this.createSmokeEffect();
        },

		
		createSmokeEffect: function () {
			print('STest');
			var proper = Entities.getEntityProperties(this.entityID); 
			var myPosition = proper.position;
			var myRotation = proper.rotation;
			
			Partichild = Entities.addEntity({
						"parentID": this.entityID,
						"accelerationSpread": {  
							"x": 0,
							"y": 0.05,
							"z": 0
						}, 							
						"alpha": 0.2,
						"alphaFinish": 0,
						"alphaSpread": 0.1,
						"alphaStart": 0.1,
						"azimuthStart": -3.14159,
						"azimuthFinish": 3.14159,
						"clientOnly": 0,
						"collisionless": 1,
						"color": {
							"blue": 255,
							"green": 238,
							"red": 222
						},
						"colorFinish": {
							"blue": 255,
							"green": 255,
							"red": 255
						},
						"colorSpread": {
							"blue": 0,
							"green": 0,
							"red": 0
						},
						"colorStart": {
							"blue": 255,
							"green": 190,
							"red": 158
						},
						"dimensions": {
							"x": 10.789999961853027,
							"y": 10.789999961853027,
							"z": 10.789999961853027							
						},
						"emitAcceleration": {
							"x": 0,
							"y": 0.19,
							"z": 0
						},
						"emitOrientation": { 
							"w": 0.7071068286895752,
							"x": 0.7071068286895752,
							"y": -1.5259198335115798e-05,
							"z": -1.5259198335115798e-05
						},
						"emitRate": 11,
						"emitterShouldTrail": 1,						
						"emitSpeed": 0.05999,
						"ignoreForCollisions": 1,
						"isEmitting": 1,						
						"lifespan": 5,
						"maxParticles": 120,
						"name": "LAPTOP_SMOKE_PARTICLES",
						"particleRadius": 0.35,
						"polarStart": 0,						
						"polarFinish": 0.45378559827804565, //25.999 deg
						"queryAACube": {
							"scale": 0.03464101627469063,
							"x": -0.017320508137345314,
							"y": -0.017320508137345314,
							"z": -0.017320508137345314
						},
						"radiusFinish": 1.4,
						"radiusStart": 0.3,
						"radiusSpread": 0.2,
						"rotation": {
							"w": myRotation.w,
							"x": myRotation.x,
							"y": myRotation.y,
							"z": myRotation.z
						},						
						"position": {
							"x": myPosition.x,
							"y": myPosition.y,
							"z": myPosition.z
						},
						"speedSpread": 0.03,
						"textures": "https://github.com/krougeau/HF-Stuff/raw/master/nny/PARTICLE_SMALL_SMOKE_2018.png",
						"type": "ParticleEffect",
						"lifetime": 10
			});
		},


        preload: function(entityID) {
            this.entityID = entityID;
           },
    };

    return new Laptop();
});