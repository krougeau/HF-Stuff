(function () {

    var scanPosition = {x: 0, y: 0 , z:0};
    var controllerIDs = Entities.findEntitiesByName("NPC Controller", scanPosition, 10000, false);
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
            // print("RESETTING NPCs");
        Entities.callEntityServerMethod(controllerIDs[0], "resetNPCpositions");       
        };
    
    });