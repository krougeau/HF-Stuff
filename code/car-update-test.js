(function () {

    var started = false;
    var _id;
    print(JSON.stringify(_this));
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        _id = entityID;
        if(!started) {
            started = true;
            print("Started");
            print("X = " + Entities.getEntityProperties(entityID, "position").position.x);
        } else {
            started = false;
            print("Stopped");
            print("X = " + Entities.getEntityProperties(entityID, "position").position.x);
        }
    };
    
    var update = function (deltaTime) {
        if(started){
            // handle movement
            Entities.editEntity(_id, "position").position.x = Entities.getEntityProperties(_id, "position").position.x + (0.5 * deltaTime);
            // print("Object should be in motion.");
        } else {
            // do nothing
        }
    }
    
    Script.update.connect(update);

});
