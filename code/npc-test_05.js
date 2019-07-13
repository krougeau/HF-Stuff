(function () {

var started = false;
var scanPosition = {x: 0, y: 0 , z:0};
var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);

print("Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  var startPos = Entities.getEntityProperties(npcs[i]).position;
	  print("NPC #" + i + " is located at " + JSON.stringify(startPos));
	};

this.clickDownOnEntity = function (entityID, mouseEvent) {
        if (started){
            Entities.editEntity(entityID, { color: { red: 0, green: 255, blue: 0} });
            started = false;
            print ("Stopping.");
        } else {
            Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
            started = true;
            print ("Starting.");
        }
    };

});
