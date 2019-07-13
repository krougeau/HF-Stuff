(function () {

var started = false;
var scanPosition = {x: 0, y: 0 , z:0};

var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = [];
var endPos = [];

print("Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  startPos.push(Entities.getEntityProperties(npcs[i]).position);
	  endPos.push(Entities.getEntityProperties(npcs[i]).position);
	  print("NPC #" + i + " started at " + JSON.stringify(startPos[i]));
	  // var boomBoxData = JSON.parse(Entities.getEntityProperties(selfEntityID, 'userData').userData);
	  print("User Data test #" + i + ": bool = " + JSON.parse(Entities.getEntityProperties(npcs[i], 'userData').userData.testBool);
	};

this.clickDownOnEntity = function (entityID, mouseEvent) {
        if (started){
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at velocity " + JSON.stringify(vel));
	    endPos[i] = Entities.getEntityProperties(npcs[i]).position;
	    print("NPC #" + i + " stopped at " + JSON.stringify(endPos[i]));
	  };
            Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
            started = false;
            print ("Stopped.");
        } else {
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.5, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at velocity " + JSON.stringify(vel));
	  };
            Entities.editEntity(entityID, { color: { red: 0, green: 255, blue: 0} });
            started = true;
            print ("Started.");
        }
    };
	
this.preload = function (entityID) {
        print("Preloading Start/Stop Button");
	Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
	started = false;
    }

this.unload = function (entityID) {
	print("Unloading Start/Stop Button");
	Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
	started = false;
    }

this.externalCall = function (entityID) {	
	  for (i = 0; i < npcs.length; i++)
	  {	    	    
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    Entities.editEntity(npcs[i], { position: startPos[i] });
	    print("NPC #" + i + " returned to " + JSON.stringify(startPos[i]));
	  };
	Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
	started = false;	
	print ("Reset & stopped.");
  };
	
});
