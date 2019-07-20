(function () {
    var started = false;
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
    
    this.preload =function(entityID){
        Entities.editEntity(entityID, { color: RED });
    }
    
    this.clickDownOnEntity = function (entityID) {
        // print("Clickity click!!!!!!");
        if(!started){
            started = true;
            Entities.editEntity(entityID, { color: GREEN });
        } else {
            started = false;
            Entities.editEntity(entityID, { color: RED });
        }
        Entities.callEntityServerMethod(entityID, "startStopNPCs");
    };

});
