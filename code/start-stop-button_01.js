(function () {

var scanPosition = {x: 0, y: 0 , z:0};
var controller = Entities.findEntitiesByName("StartStop Controller", scanPosition, 10000, false);

this.clickDownOnEntity = function (entityID, mouseEvent) {
        print("Clickity click!");
	    Entities.callEntityServerMethod(controller[0], "startStopNPCs", [entityID]);       
    };

});
