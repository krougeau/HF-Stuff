(function () {

    var started = false;
    var _id;
    var newPosition;
    var speed = 1.0;
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        _id = entityID;
        if(!started) {
            started = true;
            print("Started");
            print("X = " + Entities.getEntityProperties(_id, "position").position.x);
        } else {
            started = false;
            print("Stopped");
            print("X = " + Entities.getEntityProperties(_id, "position").position.x);
        }
    };
    
    var update = function (deltaTime) {
        if(started){
            newPosition = {
                x: Entities.getEntityProperties(_id, "position").position.x + (speed * deltaTime),
                y: Entities.getEntityProperties(_id, "position").position.y,
                z: Entities.getEntityProperties(_id, "position").position.z
            }
            Entities.editEntity(_id, {
                position: newPosition
            });
        } else {
            // do nothing
        }
    }
    
    Script.update.connect(update);

});
