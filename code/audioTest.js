print("SCRIPT STARTED");

var DISTANCE_IN_FRONT_OF_ME = 1;
var DISTANCE_ABOVE_ME = 0;
color = { red: 255, green: 255, blue: 255 };
var sound = SoundCache.getSound("atp:/sounds/test.mp3");
var injector;

Script.setTimeout(function () { // Give the sound time to load.
  injector = Audio.playSound(sound);
}, 1000);

var entityID = Entities.addEntity({
  type: "Sphere",
  lifetime: -1,
  dynamic: false,
  color: color,
  position: MyAvatar.position,
  rotation: MyAvatar.orientation,
  dimensions: { x: 1.0, y: 1.0, z: 1.0 }
});
print("Sphere created: " + entityID);

var level = 0.0;
var input = [];

function updateAudioInfo(){    
    if(Audio.inputLevelChanged(level)){
    print("Level: " + level);    
    }
    if(Audio.inputReceived(input)){
    print("Input: " + input);
    }
}

Script.update.connect(updateAudioInfo);

print("SCRIPT ENDED");
