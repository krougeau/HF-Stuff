(function () {

var scanPosition = {x: 0, y: 0 , z:0};
var controller = Entities.findEntitiesByName("StartStop Button", scanPosition, 10000, false);

this.clickDownOnEntity = function (entityID, mouseEvent) {
        print("Clickity click!");
	Entities.callEntityMethod(controller[0], "resetNPCpositions");       
    };

});
