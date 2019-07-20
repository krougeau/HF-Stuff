(function () {
    var DEBUGGING = false;
    var SEARCH_RADIUS = 10000.0;
    var NPC_POSITION_MAX_X_VALUE = 140.0;
    var NPC_POSITION_MIN_X_VALUE = -200.0;
    var NPC_POSITION_MAX_Z_VALUE = 300.0;
    var NPC_POSITION_MIN_Z_VALUE = -160.0;
    var CASE_SENSITIVE = true;
    var started = false;
    var SEARCH_CENTER = Vec3.ZERO;
    var NPC_SPEED = 0.75;
    var CAR_SPEED = 3.0;
    var i;
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

    var npc_east_IDs = Entities.findEntitiesByName("NPC_East", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_west_IDs = Entities.findEntitiesByName("NPC_West", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_north_IDs = Entities.findEntitiesByName("NPC_North", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var npc_south_IDs = Entities.findEntitiesByName("NPC_South", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);

    var car_east_IDs = Entities.findEntitiesByName("CAR_EAST", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var car_west_IDs = Entities.findEntitiesByName("CAR_WEST", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var car_north_IDs = Entities.findEntitiesByName("CAR_NORTH", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);
    var car_south_IDs = Entities.findEntitiesByName("CAR_SOUTH", SEARCH_CENTER, SEARCH_RADIUS, !CASE_SENSITIVE);

    var WALKING_ANIMATION = {
        "animation": {
            "url": "https://github.com/krougeau/HF-Stuff/raw/master/nny/Johnny_Walking.fbx",
            "fps": 30,
            startFrame: 0,
            "running": true
        }
    };

    var IDLE_ANIMATION = {
        "animation": {
            "url": "https://github.com/krougeau/HF-Stuff/raw/master/h22/hitc-22_breathing-idle.fbx",
            "fps": 30,
            startFrame: 0,
            "running": true
        }
    };

    var NPCstartPositions_East = [];
    var NPCstartPositions_West = [];
    var NPCstartPositions_North = [];
    var NPCstartPositions_South = [];

    var CARstartPositions_East = [];
    var CARstartPositions_West = [];
    var CARstartPositions_North = [];
    var CARstartPositions_South = [];

    var NPCendPositions_East = [];
    var NPCendPositions_West = [];
    var NPCendPositions_North = [];
    var NPCendPositions_South = [];

    var CARendPositions_East = [];
    var CARendPositions_West = [];
    var CARendPositions_North = [];
    var CARendPositions_South = [];

    var NPC_Controller = function () {
    };

    NPC_Controller.prototype = {
        remotelyCallable: ["resetNPCpositions", "startStopNPCs"],
        startStopNPCs: function (id) {
            startStop();
        },
        resetNPCpositions: function (id) {
            resetPositions();
        }        
    }

    debugPrint("Number of Eastbound NPCs: " + npc_east_IDs.length);
    debugPrint("Number of Westbound NPCs: " + npc_west_IDs.length);
    debugPrint("Number of Northbound NPCs: " + npc_north_IDs.length);
    debugPrint("Number of Southbound NPCs: " + npc_south_IDs.length);

    debugPrint("Number of Eastbound Cars: " + car_east_IDs.length);
    debugPrint("Number of Westbound Cars: " + car_west_IDs.length);
    debugPrint("Number of Northbound Cars: " + car_north_IDs.length);
    debugPrint("Number of Southbound Cars: " + car_south_IDs.length);

    debugPrint("Script loaded");

    for (i = 0; i < npc_east_IDs.length; i++) {
        var currentNPC = npc_east_IDs[i];
        NPCstartPositions_East.push(getNPCposition(currentNPC));
        NPCendPositions_East.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_East[i]);
        debugPrint("East NPC #" + i + " started at " + startPosition);
    }

    for (i = 0; i < npc_west_IDs.length; i++) {
        var currentNPC = npc_west_IDs[i];
        NPCstartPositions_West.push(getNPCposition(currentNPC));
        NPCendPositions_West.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_West[i]);
        debugPrint("West NPC #" + i + " started at " + startPosition);
    }

    for (i = 0; i < npc_north_IDs.length; i++) {
        var currentNPC = npc_north_IDs[i];
        NPCstartPositions_North.push(getNPCposition(currentNPC));
        NPCendPositions_North.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_North[i]);
        debugPrint("North NPC #" + i + " started at " + startPosition);
    }

    for (i = 0; i < npc_south_IDs.length; i++) {
        var currentNPC = npc_south_IDs[i];
        NPCstartPositions_South.push(getNPCposition(currentNPC));
        NPCendPositions_South.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(NPCstartPositions_South[i]);
        debugPrint("South NPC #" + i + " started at " + startPosition);
    }

    for (i = 0; i < car_east_IDs.length; i++) {
        var currentNPC = car_east_IDs[i];
        CARstartPositions_East.push(getNPCposition(currentNPC));
        CARendPositions_East.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(CARstartPositions_East[i]);
        debugPrint("East Car #" + i + " started at " + startPosition);
    }

    for (i = 0; i < car_west_IDs.length; i++) {
        var currentNPC = car_west_IDs[i];
        CARstartPositions_West.push(getNPCposition(currentNPC));
        CARendPositions_West.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(CARstartPositions_West[i]);
        debugPrint("West Car #" + i + " started at " + startPosition);
    }

    for (i = 0; i < car_north_IDs.length; i++) {
        var currentNPC = car_north_IDs[i];
        CARstartPositions_North.push(getNPCposition(currentNPC));
        CARendPositions_North.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(CARstartPositions_North[i]);
        debugPrint("North Car #" + i + " started at " + startPosition);
    }

    for (i = 0; i < car_south_IDs.length; i++) {
        var currentNPC = car_south_IDs[i];
        CARstartPositions_South.push(getNPCposition(currentNPC));
        CARendPositions_South.push(getNPCposition(currentNPC));
        var startPosition = JSON.stringify(CARstartPositions_South[i]);
        debugPrint("South Car #" + i + " started at " + startPosition);
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

    car_east_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        CARstartPositions_East.push(npcPosition);
        CARendPositions_East.push(npcPosition);
    });

    car_west_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        CARstartPositions_West.push(npcPosition);
        CARendPositions_West.push(npcPosition);
    });

    car_north_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        CARstartPositions_North.push(npcPosition);
        CARendPositions_North.push(npcPosition);
    });

    car_south_IDs.forEach(function (npcID) {
        var npcPosition = getNPCposition(npcID);
        CARstartPositions_South.push(npcPosition);
        CARendPositions_South.push(npcPosition);
    });

    function startStop(id) {
        debugPrint("START STOP WAS CALLED");
        if (started) {            
            setEntityColour(id, RED);
            started = false;
            debugPrint("Stopped.");
        } else {            
            setEntityColour(id, GREEN);
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
        Script.clearInterval(entityID.intervalID);
        setEntityColour(entityID, RED);
        started = false;
    };

    function resetPositions(entityID) {
        setEntityColour(entityID, RED);
        started = false;
        for (i = 0; i < npc_east_IDs.length; i++) {
            Entities.editEntity(npc_east_IDs[i], {
                position: NPCstartPositions_East[i]
            });
            setAnimation(npc_east_IDs[i], IDLE_ANIMATION);
            debugPrint("East NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_East[i]));
        }
        for (i = 0; i < npc_west_IDs.length; i++) {
            Entities.editEntity(npc_west_IDs[i], {
                position: NPCstartPositions_West[i]
            });
            setAnimation(npc_west_IDs[i], IDLE_ANIMATION);
            debugPrint("West NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_West[i]));
        }
        for (i = 0; i < npc_north_IDs.length; i++) {
            Entities.editEntity(npc_north_IDs[i], {
                position: NPCstartPositions_North[i]
            });
            setAnimation(npc_north_IDs[i], IDLE_ANIMATION);
            debugPrint("North NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_North[i]));
        }
        for (i = 0; i < npc_south_IDs.length; i++) {
            Entities.editEntity(npc_south_IDs[i], {
                position: NPCstartPositions_South[i]
            });
            setAnimation(npc_south_IDs[i], IDLE_ANIMATION);
            debugPrint("South NPC #" + i + " returned to " + JSON.stringify(NPCstartPositions_South[i]));
        }
        for (i = 0; i < car_east_IDs.length; i++) {
            Entities.editEntity(car_east_IDs[i], {
                position: CARstartPositions_East[i]
            });
            debugPrint("East Car #" + i + " returned to " + JSON.stringify(CARstartPositions_East[i]));
        }
        for (i = 0; i < car_west_IDs.length; i++) {
            Entities.editEntity(car_west_IDs[i], {
                position: CARstartPositions_West[i]
            });
            debugPrint("West Car #" + i + " returned to " + JSON.stringify(CARstartPositions_West[i]));
        }
        for (i = 0; i < car_north_IDs.length; i++) {
            Entities.editEntity(car_north_IDs[i], {
                position: CARstartPositions_North[i]
            });
            debugPrint("North Car #" + i + " returned to " + JSON.stringify(CARstartPositions_North[i]));
        }
        for (i = 0; i < car_south_IDs.length; i++) {
            Entities.editEntity(car_south_IDs[i], {
                position: CARstartPositions_South[i]
            });
            debugPrint("South Car #" + i + " returned to " + JSON.stringify(CARstartPositions_South[i]));
        }
        debugPrint("Reset & stopped.");
    };

    var update = function (deltaTime) {
        if(started) {
            for (i = 0; i < npc_east_IDs.length; i++) {
                setAnimation(npc_east_IDs[i], WALKING_ANIMATION);
                var NPCcurrentXvalue = Entities.getEntityProperties(npc_east_IDs[i], "position").position.x;
                if (NPCcurrentXvalue <= NPC_POSITION_MIN_X_VALUE) {
                    sendNPCtoStartPosition(npc_east_IDs[i], NPCstartPositions_East[i], "east");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(npc_east_IDs[i], "position").position.x - (NPC_SPEED * deltaTime),
                        y: Entities.getEntityProperties(npc_east_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(npc_east_IDs[i], "position").position.z
                    }                
                    Entities.editEntity(npc_east_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < npc_west_IDs.length; i++) {
                setAnimation(npc_west_IDs[i], WALKING_ANIMATION);
                var NPCcurrentXvalue = Entities.getEntityProperties(npc_west_IDs[i], "position").position.x;
                if (NPCcurrentXvalue >= NPC_POSITION_MAX_X_VALUE) {
                    sendNPCtoStartPosition(npc_west_IDs[i], NPCstartPositions_West[i], "west");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(npc_west_IDs[i], "position").position.x + (NPC_SPEED * deltaTime),
                        y: Entities.getEntityProperties(npc_west_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(npc_west_IDs[i], "position").position.z
                    }                
                    Entities.editEntity(npc_west_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < npc_north_IDs.length; i++) {
                setAnimation(npc_north_IDs[i], WALKING_ANIMATION);
                var NPCcurrentZvalue = Entities.getEntityProperties(npc_north_IDs[i], "position").position.z;
                if (NPCcurrentZvalue >= NPC_POSITION_MAX_Z_VALUE) {
                    sendNPCtoStartPosition(npc_north_IDs[i], NPCstartPositions_North[i], "north");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(npc_north_IDs[i], "position").position.x,
                        y: Entities.getEntityProperties(npc_north_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(npc_north_IDs[i], "position").position.z + (NPC_SPEED * deltaTime)
                    }                
                    Entities.editEntity(npc_north_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < npc_south_IDs.length; i++) {
                setAnimation(npc_south_IDs[i], WALKING_ANIMATION);
                var NPCcurrentZvalue = Entities.getEntityProperties(npc_south_IDs[i], "position").position.z;
                if (NPCcurrentZvalue <= NPC_POSITION_MIN_Z_VALUE) {
                    sendNPCtoStartPosition(npc_south_IDs[i], NPCstartPositions_South[i], "south");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(npc_south_IDs[i], "position").position.x,
                        y: Entities.getEntityProperties(npc_south_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(npc_south_IDs[i], "position").position.z - (NPC_SPEED * deltaTime)
                    }                
                    Entities.editEntity(npc_south_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < car_east_IDs.length; i++) {
                var NPCcurrentXvalue = Entities.getEntityProperties(car_east_IDs[i], "position").position.x;
                if (NPCcurrentXvalue <= NPC_POSITION_MIN_X_VALUE) {
                    sendNPCtoStartPosition(car_east_IDs[i], CARstartPositions_East[i], "east");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(car_east_IDs[i], "position").position.x - (CAR_SPEED * deltaTime),
                        y: Entities.getEntityProperties(car_east_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(car_east_IDs[i], "position").position.z
                    }                
                    Entities.editEntity(car_east_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < car_west_IDs.length; i++) {
                var NPCcurrentXvalue = Entities.getEntityProperties(car_west_IDs[i], "position").position.x;
                if (NPCcurrentXvalue >= NPC_POSITION_MAX_X_VALUE) {
                    sendNPCtoStartPosition(car_west_IDs[i], CARstartPositions_West[i], "west");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(car_west_IDs[i], "position").position.x + (CAR_SPEED * deltaTime),
                        y: Entities.getEntityProperties(car_west_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(car_west_IDs[i], "position").position.z
                    }                
                    Entities.editEntity(car_west_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < car_north_IDs.length; i++) {
                var NPCcurrentZvalue = Entities.getEntityProperties(car_north_IDs[i], "position").position.z;
                if (NPCcurrentZvalue >= NPC_POSITION_MAX_Z_VALUE) {
                    sendNPCtoStartPosition(car_north_IDs[i], CARstartPositions_North[i], "north");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(car_north_IDs[i], "position").position.x,
                        y: Entities.getEntityProperties(car_north_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(car_north_IDs[i], "position").position.z + (CAR_SPEED * deltaTime)
                    }                
                    Entities.editEntity(car_north_IDs[i], {
                        position: newPosition
                    });
                }
            }
            for (i = 0; i < car_south_IDs.length; i++) {
                var NPCcurrentZvalue = Entities.getEntityProperties(car_south_IDs[i], "position").position.z;
                if (NPCcurrentZvalue <= NPC_POSITION_MIN_Z_VALUE) {
                    sendNPCtoStartPosition(car_south_IDs[i], CARstartPositions_South[i], "south");
                } else {
                    newPosition = {
                        x: Entities.getEntityProperties(car_south_IDs[i], "position").position.x,
                        y: Entities.getEntityProperties(car_south_IDs[i], "position").position.y,
                        z: Entities.getEntityProperties(car_south_IDs[i], "position").position.z - (CAR_SPEED * deltaTime)
                    }                
                    Entities.editEntity(car_south_IDs[i], {
                        position: newPosition
                    });
                }
            }
        } else {
            for (i = 0; i < npc_east_IDs.length; i++) {
                setAnimation(npc_east_IDs[i], IDLE_ANIMATION);
            }
            for (i = 0; i < npc_west_IDs.length; i++) {
                setAnimation(npc_west_IDs[i], IDLE_ANIMATION);
            }
            for (i = 0; i < npc_north_IDs.length; i++) {
                setAnimation(npc_north_IDs[i], IDLE_ANIMATION);
            }
            for (i = 0; i < npc_south_IDs.length; i++) {
                setAnimation(npc_south_IDs[i], IDLE_ANIMATION);
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
                x: NPC_POSITION_MIN_X_VALUE,
                y: startPosition.y,
                z: startPosition.z
            };
        }
        if (direction === "north") {
            var position = {
                x: startPosition.x,
                y: startPosition.y,
                z: NPC_POSITION_MIN_Z_VALUE
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

    function getNPCposition(npcID) {
        return Entities.getEntityProperties(npcID, "position").position;
    }

    function setAnimation(id, animation) {
        Entities.editEntity(id, animation);
        // debugPrint("Animation called on " + JSON.stringify(id));
    }

    function debugPrint(message) {
        if (DEBUGGING) {
            console.info(message);
        }
    }

    Script.update.connect(update);

    return new NPC_Controller();
});
