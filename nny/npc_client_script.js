(function () {

    this.clickDownOnEntity = function (entityID) {
        // print("Clickity click!!!!!!");
        Entities.callEntityServerMethod(entityID, "startStopNPCs");
    };

});