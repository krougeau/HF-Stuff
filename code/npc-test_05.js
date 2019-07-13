(function () {

var started = false;
var scanPosition = {x: 0, y: 0 , z:0};

var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
var startPos = new Array();

var resetButtons = Entities.findEntitiesByName("Reset Button", scanPosition, 10000, false);
var resetButton = resetButtons[0];

var _this = this;

print("Number of NPCs: " + npcs.length);

for (i = 0; i < npcs.length; i++)
	{
	  var startPos = Entities.getEntityProperties(npcs[i]).position;
	  print("NPC #" + i + " is located at " + JSON.stringify(startPos));
	};

this.clickDownOnEntity = function (entityID, mouseEvent) {
        if (started){
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.5, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at " + JSON.stringify(vel));
	  };
            Entities.editEntity(entityID, { color: { red: 0, green: 255, blue: 0} });
            started = false;
            print ("Starting.");
        } else {
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0, y: 0, z: 0} });
	    var vel = Entities.getEntityProperties(npcs[i]).velocity;
	    print("NPC #" + i + " is moving at " + JSON.stringify(vel));
	  };
            Entities.editEntity(entityID, { color: { red: 255, green: 0, blue: 0} });
            started = true;
            print ("Stopping.");
        }
    };
	
this.preload = function () {
        print("Preloading Start/Stop Button");
	Entities.editEntity(_this, { color: { red: 0, green: 0, blue: 255} });
    }

this.unload = function () {
	print("Unloading Start/Stop Button");
	Entities.editEntity(_this, { color: { red: 0, green: 0, blue: 255} });
    }

resetButton.clickDownOnEntity = function (entityID, mouseEvent) {
	  for (i = 0; i < npcs.length; i++)
	  {
	    Entities.editEntity(npcs[i], { velocity: { x: 0.0, y: 0, z: 0} });
	    Entities.editEntity(npcs[i], { position: {x: startPos[i].x, y: startPos[i].y, z: startPos[i].z} });
	  };
	Entities.editEntity(_this, { color: { red: 255, green: 0, blue: 0} });
	started = false;	
  };
	
});
