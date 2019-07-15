(function () {
    var DEBUGGING = true;
    var _this = this;
    var SEARCH_RADIUS = 10000.0;
    var NPC_POSITION_MAX_X_VALUE = 20.0;
    var NPC_POSITION_MAX_Z_VALUE = 20.0;
    var CASE_SENSITIVE = true;
    var STATIONARY = Vec3.ZERO;
    var RED = {
        red: 255,
        green: 0,
        blue: 0
    };
    var GREEN = {
        red: 0,
        green: 255,
        blue: 0
    };
    var NPC_EAST_DEFAULT_VELOCITY = {
        x: -0.5,
        y: 0.0,
        z: 0.0
    };
    var NPC_WEST_DEFAULT_VELOCITY = {
        x: 0.5,
        y: 0.0,
        z: 0.0
    };
    var NPC_NORTH_DEFAULT_VELOCITY = {
        x: 0.0,
        y: 0.0,
        z: 0.5
    };
    var NPC_SOUTH_DEFAULT_VELOCITY = {
        x: 0.0,
        y: 0.0,
        z: -0.5
    };
    var NO_VELOCITY = {
        x: 0.0,
        y: 0.0,
        z: 0.0
    };
    var WALKING_ANIMATION = {
        "animation": {
            "url": "https://github.com/krougeau/HF-Stuff/raw/master/nny/Johnny_Walking.fbx",
            "fps": 45,
            "running": true
        }
    };

    var IDLE_ANIMATION = {
        "animation": {
            "url": "https://github.com/krougeau/HF-Stuff/raw/master/h22/hitc-22_breathing-idle.fbx",
            "fps": 45,
            "running": true
        }
    };

    var started = false;
    var SEARCH_CENTER = Vec3.ZERO;

    var npc_east_IDs = Entities.findEntitiesByName("NPC_East", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_west_IDs = Entities.findEntitiesByName("NPC_West", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_north_IDs = Entities.findEntitiesByName("NPC_North", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_south_IDs = Entities.findEntitiesByName("NPC_South", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);

    var NPCstartPositions_East = [];
    var NPCstartPositions_West = [];
    var NPCstartPositions_North = [];
    var NPCstartPositions_South = [];

    var NPCendPositions_East = [];
    var NPCendPositions_West = [];
    var NPCendPositions_North = [];
    var NPCendPositions_South = [];

    var NPC_Controller = function () {
    };

    NPC_Controller.prototype = {
        remotelyCallable: ["checkNPCpositions", "resetNPCpositions", "startStopNPCs"],
        startStopNPCs: function (id) {
            startStop();
        },
        resetNPCpositions: function (id) {
            resetPositions();
        },
        checkNPCpositions: function (id) {
            checkPositions();
        }
    }

    debugPrint("Number of Eastbound NPCs: " + npc_east_IDs.length);
    debugPrint("Number of Westbound NPCs: " + npc_west_IDs.length);
    debugPrint("Number of Northbound NPCs: " + npc_north_IDs.length);
    debugPrint("Number of Southbound NPCs: " + npc_south_IDs.length);

    debugPrint("Script loaded");

    for (var i = 0; i < npc_east_IDs.length; i++) {
        var currentNPC = npc_east_IDs[i];
        NPCstartPositions_East.push(getNPCposition(currentNPC));
        NPCendPositions_East.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_East[i]);
        debugPrint("NPC #" + i + " started at " + startPosition);
    }

    for (var i = 0; i < npc_west_IDs.length; i++) {
        var currentNPC = npc_west_IDs[i];
        NPCstartPositions_West.push(getNPCposition(currentNPC));
        NPCendPositions_West.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_West[i]);
        debugPrint("NPC #" + i + " started at " + startPosition);
    }

    for (var i = 0; i < npc_north_IDs.length; i++) {
        var currentNPC = npc_north_IDs[i];
        NPCstartPositions_North.push(getNPCposition(currentNPC));
        NPCendPositions_North.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_North[i]);
        debugPrint("NPC #" + i + " started at " + startPosition);
    }

    for (var i = 0; i < npc_south_IDs.length; i++) {
        var currentNPC = npc_south_IDs[i];
        NPCstartPositions_South.push(getNPCposition(currentNPC));
        NPCendPositions_South.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_South[i]);
        debugPrint("NPC #" + i + " started at " + startPosition);
    }

    npc_east_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        NPCstartPositions_East.push(npcPosition);
        NPCendPositions_East.push(npcPosition);
    });

    npc_west_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        NPCstartPositions_West.push(npcPosition);
        NPCendPositions_West.push(npcPosition);
    });

    npc_north_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        NPCstartPositions_North.push(npcPosition);
        NPCendPositions_North.push(npcPosition);
    });

    npc_south_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        NPCstartPositions_South.push(npcPosition);
        NPCendPositions_South.push(npcPosition);
    });

    function startStop(id) {
        debugPrint("START STOP WAS CALLED");
        var i;
        if (started) {
            for (i = 0; i < npc_east_IDs.length; i++) {
                var currentNPC = npc_east_IDs[i];
                setNPCvelocity(currentNPC, STATIONARY);
                NPCendPositions_East[i] = getNPCposition(currentNPC);
                setAnimation(currentNPC, IDLE_ANIMATION);
                debugPrint("NPC #" + i + " stopped at " + JSON.stringify(NPCendPositions_East[i]));
            }
            for (i = 0; i < npc_west_IDs.length; i++) {
                var currentNPC = npc_west_IDs[i];
                setNPCvelocity(currentNPC, STATIONARY);
                NPCendPositions_West[i] = getNPCposition(currentNPC);
                setAnimation(currentNPC, IDLE_ANIMATION);
                debugPrint("NPC #" + i + " stopped at " + JSON.stringify(NPCendPositions_West[i]));
            }
            for (i = 0; i < npc_north_IDs.length; i++) {
                var currentNPC = npc_north_IDs[i];
                setNPCvelocity(currentNPC, STATIONARY);
                NPCendPositions_North[i] = getNPCposition(currentNPC);
                setAnimation(currentNPC, IDLE_ANIMATION);
                debugPrint("NPC #" + i + " stopped at " + JSON.stringify(NPCendPositions_North[i]));
            }
            for (i = 0; i < npc_south_IDs.length; i++) {
                var currentNPC = npc_south_IDs[i];
                setNPCvelocity(currentNPC, STATIONARY);
                NPCendPositions_South[i] = getNPCposition(currentNPC);
                setAnimation(currentNPC, IDLE_ANIMATION);
                debugPrint("NPC #" + i + " stopped at " + JSON.stringify(NPCendPositions_South[i]));
            }
            setEntityColour(_this, RED);
            started = false;
            debugPrint("Stopped.");
        } else {
            for (i = 0; i < npc_east_IDs.length; i++) {
                setNPCvelocity(npc_east_IDs[i], NPC_EAST_DEFAULT_VELOCITY);
                var currentVelocity = JSON.stringify(getNPCvelocity(npc_east_IDs[i]));
                setAnimation(currentNPC, WALKING_ANIMATION);
                debugPrint("NPC #" + i + " is moving at velocity " + currentVelocity);
            }
            for (i = 0; i < npc_west_IDs.length; i++) {
                setNPCvelocity(npc_west_IDs[i], NPC_WEST_DEFAULT_VELOCITY);
                var currentVelocity = JSON.stringify(getNPCvelocity(npc_west_IDs[i]));
                setAnimation(currentNPC, WALKING_ANIMATION);
                debugPrint("NPC #" + i + " is moving at velocity " + currentVelocity);
            }
            for (i = 0; i < npc_north_IDs.length; i++) {
                setNPCvelocity(npc_north_IDs[i], NPC_NORTH_DEFAULT_VELOCITY);
                var currentVelocity = JSON.stringify(getNPCvelocity(npc_north_IDs[i]));
                setAnimation(currentNPC, WALKING_ANIMATION);
                debugPrint("NPC #" + i + " is moving at velocity " + currentVelocity);
            }
            for (i = 0; i < npc_south_IDs.length; i++) {
                setNPCvelocity(npc_south_IDs[i], NPC_SOUTH_DEFAULT_VELOCITY);
                var currentVelocity = JSON.stringify(getNPCvelocity(npc_south_IDs[i]));
                setAnimation(currentNPC, WALKING_ANIMATION);
                debugPrint("NPC #" + i + " is moving at velocity " + currentVelocity);
            }
            setEntityColour(_this, GREEN);
            started = true;
            debugPrint("Started.");
        }
    };

    this.preload = function (entityID) {
        debugPrint("Preloading Start/Stop Button");
        setEntityColour(entityID, RED);
        started = false;
    };

    this.unload = function (entityID) {
        debugPrint("Unloading Start/Stop Button");
        Script.clearInterval(_this.intervalID);
        setEntityColour(entityID, RED);
        started = false;
    };

    function resetPositions(entityID) {
        var i;        
        for (i = 0; i < npc_east_IDs.length; i++) {
            Entities.editEntity(npc_east_IDs[i], {
                velocity: Vec3.ZERO
            });
            Entities.editEntity(npc_east_IDs[i], {
                position: NPCstartPositions_East[i]
            });
            setAnimation(npc_east_IDs[i], IDLE_ANIMATION);
            debugPrint("NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_East[i]));
        }
        for (i = 0; i < npc_west_IDs.length; i++) {
            Entities.editEntity(npc_west_IDs[i], {
                velocity: Vec3.ZERO
            });
            Entities.editEntity(npc_west_IDs[i], {
                position: NPCstartPositions_West[i]
            });
            setAnimation(npc_west_IDs[i], IDLE_ANIMATION);
            debugPrint("NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_West[i]));
        }
        for (i = 0; i < npc_north_IDs.length; i++) {
            Entities.editEntity(npc_north_IDs[i], {
                velocity: Vec3.ZERO
            });
            Entities.editEntity(npc_north_IDs[i], {
                position: NPCstartPositions_North[i]
            });
            setAnimation(npc_north_IDs[i], IDLE_ANIMATION);
            debugPrint("NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_North[i]));
        }
        for (i = 0; i < npc_south_IDs.length; i++) {
            Entities.editEntity(npc_south_IDs[i], {
                velocity: Vec3.ZERO
            });
            Entities.editEntity(npc_south_IDs[i], {
                position: NPCstartPositions_South[i]
            });
            setAnimation(npc_south_IDs[i], IDLE_ANIMATION);
            debugPrint("NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_South[i]));
        }
        setEntityColour(entityID, RED);
        started = false;
        debugPrint("Reset & stopped.");
    };

    _this.intervalID = Script.setInterval(function () {
        checkPositions();
    }, 500);

    function checkPositions() {
        var i;
        for (i = 0; i < npc_east_IDs.length; i++) {
            var NPCcurrentXvalue = Entities.getEntityProperties(npc_east_IDs[i], "position").position.x;
            if (NPCcurrentXvalue <= -NPC_POSITION_MAX_X_VALUE) {
                sendNPCtoStartPosition(npc_east_IDs[i], NPCstartPositions_East[i], "east");
            }
        }
        for (i = 0; i < npc_west_IDs.length; i++) {
            var NPCcurrentXvalue = Entities.getEntityProperties(npc_west_IDs[i], "position").position.x;
            if (NPCcurrentXvalue >= NPC_POSITION_MAX_X_VALUE) {
                sendNPCtoStartPosition(npc_west_IDs[i], NPCstartPositions_West[i], "west");
            }
        }
        for (i = 0; i < npc_north_IDs.length; i++) {
            var NPCcurrentZvalue = Entities.getEntityProperties(npc_north_IDs[i], "position").position.z;
            if (NPCcurrentZvalue >= NPC_POSITION_MAX_Z_VALUE) {
                sendNPCtoStartPosition(npc_north_IDs[i], NPCstartPositions_North[i], "north");
            }
        }
        for (i = 0; i < npc_south_IDs.length; i++) {
            var NPCcurrentZvalue = Entities.getEntityProperties(npc_south_IDs[i], "position").position.z;
            if (NPCcurrentZvalue <= -NPC_POSITION_MAX_Z_VALUE) {
                sendNPCtoStartPosition(npc_south_IDs[i], NPCstartPositions_South[i], "south");
            }
        }
    }

    function sendNPCtoStartPosition(npcID, startPosition, direction) {
        if (direction === "east") {
            var position = {
                x: NPC_POSITION_MAX_X_VALUE,
                y: startPosition.y,
                z: startPosition.z
            };
        }
        if (direction === "west") {
            var position = {
                x: -NPC_POSITION_MAX_X_VALUE,
                y: startPosition.y,
                z: startPosition.z
            };
        }
        if (direction === "north") {
            var position = {
                x: startPosition.x,
                y: startPosition.y,
                z: -NPC_POSITION_MAX_Z_VALUE
            };
        }
        if (direction === "south") {
            var position = {
                x: startPosition.x,
                y: startPosition.y,
                z: NPC_POSITION_MAX_Z_VALUE
            };
        }
        Entities.editEntity(npcID, {
            position: position
        });
    }

    function setEntityColour(id, colour) {
        Entities.editEntity(id, {
            color: colour
        });
    }

    function setNPCvelocity(NPCid, vel) {
        Entities.editEntity(NPCid, {
            velocity: vel
        });
    }

    function getNPCvelocity(npcID) {
        return Entities.getEntityProperties(npcID, "velocity").velocity;
    }

    function getNPCposition(npcID) {
        return Entities.getEntityProperties(npcID, "position").position;
    }

    function setAnimation(id, animation) {
        Entities.editEntity(id, animation);
    }

    function debugPrint(message) {
        if (DEBUGGING) {
            console.info(message);
        }
    }

    return new NPC_Controller();
});
