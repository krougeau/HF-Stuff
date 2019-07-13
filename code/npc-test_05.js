(function () {

var started = false;
var scanPosition = {x: 0, y: 0 , z:0};

var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = new Array();

var resetButtons = Entities.findEntitiesByName("Reset Button", scanPosition, 10000, false);
var resetButton = resetButtons[0];

print("Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  startPos.push(Entities.getEntityProperties(npcs[i]).position);
	  print("NPC #" + i + " started at " + JSON.stringify(startPos[0]));
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
    }

this.unload = function (entityID) {
	print("Unloading Start/Stop Button");
	Entities.editEntity(entityID, { color: { red: 0, green: 0, blue: 255} });
	started = false;
    }

this.externalCall = function (entityID) {
	/*
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    Entities.editEntity(npcs[i], { position: {x: startPos[i].x, y: startPos[i].y, z: startPos[i].z} });
	  };
	Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
	started = false;
	*/
	print ("Reset & stopped.");
  };
	
});
