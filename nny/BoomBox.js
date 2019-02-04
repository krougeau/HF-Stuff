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

    BoomBox = function() {
        _this = this;
        this.equipped = false;

        this.blastSound = SoundCache.getSound('https://github.com/krougeau/HF-Stuff/raw/master/nny/BOMB.wav');        
        this.blastVolume = 0.2;
    };

    BoomBox.prototype = {
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
            var boomBoxProps = Entities.getEntityProperties(this.entityID, ['position', 'rotation']);
            this.position = boomBoxProps.position;
            this.rotation = boomBoxProps.rotation;
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
            Audio.playSound(this.blastSound, {
                position: this.position,
                volume: this.blastVolume
            });

            //this.createBlastEffect(this.position)
			this.createBlastEffect()
        },

		
		createBlastEffect: function () {
			
			var proper = Entities.getEntityProperties(this.entityID); 
			var myPosition = proper.position;
			var myRotation = proper.rotation;
			
			Partichild = Entities.addEntity({
						"parentID": this.entityID,
						"accelerationSpread": {  
							"x": 0,
							"y": 0,
							"z": 0
						}, 							
						"alpha": 0.6000000238418579,
						"alphaFinish": 0.009999999776482582,
						"alphaSpread": 0.4000000059604645,
						"alphaStart": 0.8999999761581421,
						"azimuthStart": -3.14159,
						"azimuthFinish": 3.14159,
						"clientOnly": 0,
						"collisionless": 1,
						"color": {
							"blue": 0,
							"green": 102,
							"red": 255
						},
						"colorFinish": {
							"blue": 0,
							"green": 0,
							"red": 255
						},
						"colorSpread": {
							"blue": 0,
							"green": 30,
							"red": 0
						},
						"colorStart": {
							"blue": 204,
							"green": 249,
							"red": 255
						},
						"dimensions": {
							"x": 0.019999999552965164,
							"y": 0.019999999552965164,
							"z": 0.019999999552965164
						},
						"emitAcceleration": {
							"x": 0,
							"y": 0,
							"z": 0
						},
						"emitOrientation": {
							"w": 0.7070610523223877,
							"x": -0.7071525454521179,
							"y": -1.5258869098033756e-05,
							"z": -1.5258869098033756e-05
						},
						"emitRate": 1,
						"emitterShouldTrail": 1,						
						"emitSpeed": 0,
						"ignoreForCollisions": 1,
						"isEmitting": 1,						
						"lifespan": 0.699999988079071,
						"maxParticles": 100,
						"name": "EXPLOSION_FIRE",
						"particleRadius": 0.009999999776482582,
						"polarStart": 0,						
						"polarFinish": 3.1415927410125732,
						"queryAACube": {
							"scale": 0.03464101627469063,
							"x": -0.017320508137345314,
							"y": -0.017320508137345314,
							"z": -0.017320508137345314
						},
						"radiusFinish": 6.9999999776482582,
						"radiusStart": 0.9999999776482582,
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
						"speedSpread": 0.001,
						"textures": "https://github.com/krougeau/HF-Stuff/raw/master/nny/PARTICLE_EXPLOSION-2-2018.png",
						"type": "ParticleEffect",
						"lifetime": 3
			});
			
			var proper2 = Entities.getEntityProperties(this.entityID); 
			var myPosition2 = proper2.position;
			var myRotation2 = proper2.rotation;
								
			//SmokePush
			Partichild2 = Entities.addEntity({
						"parentID": this.entityID,
						"accelerationSpread": {  
							"x": 0,
							"y": 0,
							"z": 0
						}, 							
						"alpha": 0.6399999856948853,
						"alphaFinish": 0.05999999865889549,
						"alphaSpread": 0.25,
						"alphaStart": 0.10000000149011612,
						"azimuthStart": -3.14159,
						"azimuthFinish": 3.14159,						
						"clientOnly": 0,
						"collisionless": 1,
						"colorFinish": {
							"blue": 255,
							"green": 255,
							"red": 255
						},
						"colorStart": {
							"blue": 255,
							"green": 255,
							"red": 255
						},
						"dimensions": {
							"x": 0.019999999552965164,
							"y": 0.019999999552965164,
							"z": 0.019999999552965164
						},
						"emitAcceleration": {
							"x": 0,
							"y": 0,
							"z": 0
						},
						"emitOrientation": {
							"w": 0.7070915699005127,
							"x": -0.7071220278739929,
							"y": -1.5258869098033756e-05,
							"z": -1.5258869098033756e-05
						},
						"emitRate": 1,
						"emitterShouldTrail": 1,							
						"emitSpeed": 0,
						"ignoreForCollisions": 1,
						"isEmitting": 1,						
						"lifespan": 1,
						"maxParticles": 1,
						"name": "SMOKEPUSH",
						"particleRadius": 0.009999999776482582,
						"polarStart": 0,						
						"polarFinish": 3.1415927410125732,
						"queryAACube": {
							"scale": 0.03464101627469063,
							"x": -0.017320508137345314,
							"y": -0.017320508137345314,
							"z": -0.017320508137345314
						},
						"radiusFinish": 10.9999999776482582,
						"radiusStart": 0.9999999776482582,
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
						"speedSpread": 0,
						"textures": "https://github.com/krougeau/HF-Stuff/raw/master/nny/PARTICLE_FOG_2017.png",
						"type": "ParticleEffect",
						"lifetime": 3
					});
			//trigger explosion sequence:
		
			//Fire
				Partichild3 = Entities.addEntity({
					"accelerationSpread": {  
						"x": 0,
						"y": 0,
						"z": 0
					}, 					
					"alpha": 0.6000000238418579,
					"alphaFinish": 0.009999999776482582,
					"alphaSpread": 0.4000000059604645,
					"alphaStart": 0.8999999761581421,
					"azimuthStart": -3.14159,
					"azimuthFinish": 3.14159,					
					"clientOnly": 0,
					"collisionless": 1,					
					"color": {
						"blue": 0,
						"green": 102,
						"red": 255
					},
					"colorFinish": {
						"blue": 0,
						"green": 0,
						"red": 255
					},
					"colorSpread": {
						"blue": 0,
						"green": 30,
						"red": 0
					},
					"colorStart": {
						"blue": 204,
						"green": 249,
						"red": 255
					},
					"dimensions": {
						"x": 16.709999084472656,
						"y": 16.709999084472656,
						"z": 16.709999084472656
					},					
					"emitAcceleration": {
						"x": 0,
						"y": 0,
						"z": 0
					},
					"emitDimensions": {
						"x": 0.4000000059604645,
						"y": 0.4000000059604645,
						"z": 0.4000000059604645
					},
					"emitOrientation": {
						"w": 0.7070915699005127,
						"x": -0.7071220278739929,
						"y": -1.5258869098033756e-05,
						"z": -1.5258869098033756e-05
					},
					"emitRate": 19,
					"emitterShouldTrail": 0,					
					"emitSpeed": 1,
					"ignoreForCollisions": 1,
					"isEmitting": 1,					
					"lifespan": 0.699999988079071,
					"maxParticles": 100,
					"name": "EXPLOSION_FIRE",
					"particleRadius": 4,
					"polarStart": 0,					
					"polarFinish": 3.1415927410125732,
					"radiusFinish": 0.009999999776482582,
					"radiusSpread": 3,
					"radiusStart": 0.10000000149011612,
						"rotation": {
							"w": myRotation2.w,
							"x": myRotation2.x,
							"y": myRotation2.y,
							"z": myRotation2.z
						},	
					"position": {
						"x": myPosition2.x,
						"y": myPosition2.y,
						"z": myPosition2.z
					},					
					"speedSpread": 0.5,
					"textures": "https://github.com/krougeau/HF-Stuff/raw/master/nny/PARTICLE_EXPLOSION-2-2018.png",
					"type": "ParticleEffect",
					"lifetime": 3
				});
			
			Script.setTimeout(function () {
				print("AMORCE: Wait 0.4 sec");
			}, 400);
				
			//smoke push
				Partichild4 = Entities.addEntity({
						"accelerationSpread": {  
							"x": 0,
							"y": 0,
							"z": 0
						}, 						
						"alpha": 0.6399999856948853,
						"alphaFinish": 0.05999999865889549,
						"alphaSpread": 0.25,
						"alphaStart": 0.10000000149011612,
						"azimuthStart": -3.14159,
						"azimuthFinish": 3.14159,						
						"clientOnly": 0,
						"collisionless": 1,											
						"color": {
							"blue": 255,
							"green": 255,
							"red": 255
						},						
						"colorFinish": {
							"blue": 255,
							"green": 255,
							"red": 255
						},
						"colorStart": {
							"blue": 255,
							"green": 255,
							"red": 255
						},
						"dimensions": {
							"x": 17.26599884033203,
							"y": 17.26599884033203,
							"z": 17.26599884033203
						},						
						"emitAcceleration": {
							"x": 0,
							"y": 0,
							"z": 0
						},
						"emitDimensions": {
							"x": 6,
							"y": 6,
							"z": 6
						},
						"emitOrientation": {
							"w": 0.7070610523223877,
							"x": -0.7071525454521179,
							"y": -1.5258869098033756e-05,
							"z": -1.5258869098033756e-05
						},
						"emitRate": 153,
						"emitterShouldTrail": 0,						
						"emitSpeed": 0.009999999776482582,
						"ignoreForCollisions": 1,
						"isEmitting": 1,						
						"lifespan": 0.5,
						"maxParticles": 100,
						"name": "EXPLOSION_SMOKEPUSH",
						"particleRadius": 3,
						"polarStart": 0,						
						"polarFinish": 3.1415927410125732,
						"radiusFinish": 3,
						"radiusSpread": 0.0999999046325684,
						"radiusStart": 0.10000000149011612,
						"rotation": {
							"w": myRotation2.w,
							"x": myRotation2.x,
							"y": myRotation2.y,
							"z": myRotation2.z
						},	
						"position": {
							"x": myPosition2.x,
							"y": myPosition2.y,
							"z": myPosition2.z
						},						
						"speedSpread": 0.005000000074505806,
						"textures": "https://github.com/krougeau/HF-Stuff/raw/master/nny/PARTICLE_FOG_2017.png",
						"type": "ParticleEffect",
						"lifetime": 3
					});
			
        },


        preload: function(entityID) {
            this.entityID = entityID;
           },
    };

    return new BoomBox();
});