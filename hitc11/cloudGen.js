//  Created by Kenneth Rougeau on November 17, 2018.
//  Copyright 2018 Kenneth Rougeau
//  All rights reserved
//
// Head In The Clouds avatar cloud particle generator v1.0

var particleFingers = ['Head'];
var particleEntities = [];
var PARICLE_NAME_BASE = 'spawnedCloudParticle'

// what the actual particles look like
var particleProperties = {
    type: 'ParticleEffect',
    parentID: MyAvatar.sessionUUID,
    color: {
        red: 255,
        green: 255,
        blue: 255
    },
    isEmitting: 1,
    maxParticles: 1000,
    lifespan: 1,
    emitRate: 10,
    emitSpeed: 0,
    speedSpread: 0,
    emitOrientation: {
        x: -1.52587890625e-05,
        y: -1.52587890625e-05,
        z: -1.52587890625e-05,
        w: 1.0
    },
    emitRadiusStart: 0,
    polarStart: 0,
    polarFinish: 0,
    azimuthFinish: 3.1415927410125732,
    emitAcceleration: {
        x: 0,
        y: 0,
        z: 0
    },
    accelerationSpread: {
        x: 0,
        y: 0,
        z: 0
    },
    particleRadius: 0,
    radiusSpread: 0.12999999523162842,
    radiusStart: 0,
    radiusFinish: 0,
    colorSpread: {
        red: 255,
        green: 255,
        blue: 255
    },
    colorStart: {
        red: 255,
        green: 255,
        blue: 255
    },
    colorFinish: {
        red: 255,
        green: 255,
        blue: 255
    },
    alpha: 0,
    alphaSpread: 0,
    alphaStart: 1,
    alphaFinish: 0,
    emitterShouldTrail: true,
    textures: 'https://content.highfidelity.com/DomainContent/production/Particles/wispy-smoke.png',
    lifetime: 999999
};

function createParticles() {
    var jointID = MyAvatar.jointNames.indexOf('Head');
    particleProperties.name = PARICLE_NAME_BASE + 'Head'; 
    particleProperties.parentJointIndex = jointID;
    position =  MyAvatar.getJointPosition('Head');
    var offset = Vec3.multiply(up, 0.1);
    Vec3.sum(position, offset);
    return Entities.addEntity(particleProperties);
}

function addParticles() {
    for (var i = 0; i < particleFingers.length; i++) {
        particleEntities.push(createParticles(particleFingers[i]));
        print(handPrefix + particleFingers[i]);
    }
}

Script.scriptEnding.connect(function() {
    for (var i = 0; i < particleEntities.length; i++) {
        // Fixes a crash on shutdown:
        // Entities.editEntity(particleEntities[i], { parentID: '' });
        Entities.deleteEntity(particleEntities[i]);
    }
});

addParticles();
