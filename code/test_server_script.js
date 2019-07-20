(function () {

    var started = false;
    var _id;
    var speed = 3.0;
    var newPosition;
    var NPC_POSITION_MAX_X_VALUE = 100.0;
    var NPC_POSITION_MIN_X_VALUE = -100.0;
    
    var NPC_Controller = function () {
    };

    NPC_Controller.prototype = {
        remotelyCallable: ["startStopNPCs"],
        startStopNPCs: function (id) {
            _id = id;
            if(!started){
                started = true;
            } else {
                started = false;
            }
        }        
    };
    
    var update = function (deltaTime) {
        if(started){
            if(Entities.getEntityProperties(_id, "position").position.x >= NPC_POSITION_MAX_X_VALUE){
                newPosition = {
                    x: NPC_POSITION_MIN_X_VALUE,
                    y: Entities.getEntityProperties(_id, "position").position.y,
                    z: Entities.getEntityProperties(_id, "position").position.z
                }
            } else {
                newPosition = {
                    x: Entities.getEntityProperties(_id, "position").position.x + (speed * deltaTime),
                    y: Entities.getEntityProperties(_id, "position").position.y,
                    z: Entities.getEntityProperties(_id, "position").position.z
                }
            }        
            Entities.editEntity(_id, {
                position: newPosition
            });
        } else {
            // do nothing
        }
    }
    
    Script.update.connect(update);

    return new NPC_Controller();

});
