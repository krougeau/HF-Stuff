(function() {

    var ZERO_VECTOR = {
            x: 0,
            y: 0,
            z: 0
        };
    var _this;
    var DISABLE_LASER_THRESHOLD = 0.2;
    var TRIGGER_CONTROLS = [
        Controller.Standard.LT,
        Controller.Standard.RT,
    ];
    var RELOAD_THRESHOLD = 0.90;
    var dimensions = {
        "x": 0.0554,
        "y": 0.21,
        "z": 0.41
    };

    Pistol = function() {
        _this = this;
        this.equipped = false;

		
        this.fireSound = SoundCache.getSound("atp:/gun/40_smith_wesson_single-mike-koenig.wav");
		
        this.fireVolume = 0.2;
		
        this.firingOffsets = {
            y: 0.40
        }
    };

    Pistol.prototype = {
        canShoot: false,

        startEquip: function(id, params) {
            if (this.equipped) {                
                this.hand = params[0] == "left" ? 0 : 1;
                print("Already equipped. Now attaching to " + params[0] + " hand.");
            }
            if (!this.equipped) {
                this.equipped = true;
                this.hand = params[0] == "left" ? 0 : 1;
                print("Equipped to " + params[0] + " hand.");
            }
        },

        continueEquip: function(id, params) {
            if (!this.equipped) {
                return;
            }
            this.updateProps();
            this.toggleWithTriggerPressure();
        },

        updateProps: function() {
            var gunProps = Entities.getEntityProperties(this.entityID, ['position', 'rotation']);
            this.position = gunProps.position;
            this.rotation = gunProps.rotation;
            this.firingDirection = Quat.getForward(this.rotation);
            var upVec = Quat.getUp(this.rotation);
            this.barrelPoint = Vec3.sum(this.position, Vec3.multiply(this.firingDirection, this.firingOffsets.y))
            if(this.dimensions !== dimensions){
                print("Resetting pistol dimensions from " + this.dimensions + " to " + dimensions);
                this.dimensions = dimensions;
            }
        },
        toggleWithTriggerPressure: function() {
            this.triggerValue = Controller.getValue(TRIGGER_CONTROLS[this.hand]);
            
            if (this.triggerValue < RELOAD_THRESHOLD) {
                this.canShoot = true;
            }
            if (this.canShoot === true && this.triggerValue >= RELOAD_THRESHOLD) {
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

            Audio.playSound(this.fireSound, {
                position: this.barrelPoint,
                volume: this.fireVolume
            });

            this.createGunFireEffect(this.barrelPoint)
        },

        createGunFireEffect: function(position) {
            var flash = Entities.addEntity({
                type: "ParticleEffect",
                position: this.barrelPoint,
                "name": "Muzzle Flash",
                lifetime: 4,
                parentID: this.entityID,
                "color": {
                    red: 228,
                    green: 128,
                    blue: 12
                },
                "maxParticles": 1000,
                "lifespan": 0.1,
                "emitRate": 1000,
                "emitSpeed": 0.5,
                "speedSpread": 0,
                "emitOrientation": {
                    "x": -0.4,
                    "y": 1,
                    "z": -0.2,
                    "w": 0.7071068286895752
                },
                "emitDimensions": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "polarStart": 0,
                "polarFinish": Math.PI,
                "azimuthStart": -3.1415927410125732,
                "azimuthFinish": 2,
                "emitAcceleration": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "accelerationSpread": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                },
                "particleRadius": 0.05,
                "radiusSpread": 0.01,
                "radiusStart": 0.05,
                "radiusFinish": 0.05,
                "colorSpread": {
                    red: 100,
                    green: 100,
                    blue: 20
                },
                "alpha": 1,
                "alphaSpread": 0,
                "alphaStart": 0,
                "alphaFinish": 0,
                "additiveBlending": true,
				 "textures": "atp:/gun/cloud.png"
            });
            Script.setTimeout(function() {
                Entities.editEntity(flash, {
                    isEmitting: false
                });
            }, 100)

        },

        preload: function(entityID) {
            this.entityID = entityID;
           },
    };

    return new Pistol();
});