(function () {

var scanPosition = {x: 0, y: 0 , z:0};
var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = new Array();
var controller = Entities.findEntitiesByName("StartStop Button", scanPosition, 10000, false);

print("(RESET) Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  startPos.push(Entities.getEntityProperties(npcs[i]).position);
	  print("(RESET) NPC #" + i + " started at " + JSON.stringify(startPos[i]));
	};

this.clickDownOnEntity = function (entityID, mouseEvent) {
        print("Clickity click!");
	Entities.callEntityMethod(controller, "externalCall");       
    };

});
