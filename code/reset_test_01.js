(function () {

var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = new Array();

print("(RESET) Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  startPos.push(Entities.getEntityProperties(npcs[i]).position);
	  print("(RESET) NPC #" + i + " started at " + JSON.stringify(startPos[i]));
	};

});