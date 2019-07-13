(function () {

var started = false;
var scanPosition = {x: 0, y: 0 , z:0};

var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = [];

print("Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  startPos.push(Entities.getEntityProperties(npcs[i]).position);
	  print("NPC #" + i + " started at " + JSON.stringify(startPos[i]));
	};

this.clickDownOnEntity = function (entityID, mouseEvent) {
        if (started){
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at " + JSON.stringify(vel));
	  };
            Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
            started = false;
            print ("Stopped.");
        } else {
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.5, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at " + JSON.stringify(vel));
	  };
            Entities.editEntity(entityID, { color: { red: 0, green: 255, blue: 0} });
            started = true;
            print ("Started.");
        }
    };
	
this.preload = function (entityID) {
        print("Preloading Start/Stop Button");
	Entities.editEntity(entityID, { color: { red: 0, green: 0, blue: 255} });
	started = false;
	startPos = [];
    }

this.unload = function (entityID) {
	print("Unloading Start/Stop Button");
	Entities.editEntity(entityID, { color: { red: 0, green: 0, blue: 255} });
	started = false;
	startPos = [];
    }

this.externalCall = function (entityID) {	
	  for (i = 0; i < npcs.length; i++)
	  {	    
	    print ("i Check: " + i);
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    Entities.editEntity(npcs[i], { position: startPos[i] });
	  };
	Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
	started = false;	
	print ("Reset & stopped.");
  };
	
});
