(function () {

    var started = false;
    var _this = this;
    print(JSON.stringify(_this));
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        if(!started) {
            started = true;
            print("Started");
            print("X = " + Entities.getEntityProperties(_this, "position").position.x);
            print("THIS = " = JSON.stringify(_this))
        } else {
            started = false;
            print("Stopped");
            print("X = " + Entities.getEntityProperties(_this, "position").position.x);
            print("THIS = " = JSON.stringify(_this))
        }
    };
    
    var update = function (deltaTime) {
        if(started){
            // handle movement
            // Entities.editEntity(_this, "position").position.x = Entities.getEntityProperties(_this, "position").position.x + (0.5 * deltaTime);
            print("Object should be in motion.");
        } else {
            // do nothing
        }
    }
    
    Script.update.connect(update);

});
