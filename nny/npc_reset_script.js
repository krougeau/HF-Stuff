(function () {

    var scanPosition = {x: 0, y: 0 , z:0};
    var controllerIDs = Entities.findEntitiesByName("NPC Controller", scanPosition, 10000, false);
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
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        print("RESETTING NPCs (Sending signal to: " + entityID);
        Entities.editEntity(controllerIDs[0], { color: RED });
        Entities.callEntityServerMethod(controllerIDs[0], "resetNPCpositions");       
        };
});
