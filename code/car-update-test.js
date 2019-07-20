(function () {

    var started = false;
    var _this = this;
    
    this.clickDownOnEntity = function (entityID, mouseEvent) {
        if(!started) {
            started = true;
            print("Started");
        } else {
            started = false;
            print("Stopped");
        }
    };
    
    var update = function (deltaTime) {
        if(started){
            // handle movement
            Entities.editEntity(_this, "position").position.x = Entities.getEntityProperties(_this, "position").position.x + (0.5 * deltaTime);
            print("Object should be in motion.");
        } else {
            // do nothing
        }
    }
    
    Script.update.connect(update);

});
