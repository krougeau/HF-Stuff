print("SCRIPT STARTED");

var DISTANCE_IN_FRONT_OF_ME = 1;
var DISTANCE_ABOVE_ME = 0;
color = { red: 255, green: 255, blue: 255 };
var sound = SoundCache.getSound(Script.resourcesPath() + "sounds/test.mp3");
var injector;

Script.setTimeout(function () { // Give the sound time to load.
  injector = Audio.playSound(sound, injectorOptions);
}, 1000);

var entityID = Entities.addEntity({
  type: "Sphere",
  lifetime: -1,
  dynamic: false,
  color: color,
  position: { x: 0, y: 0, z: 1 },
  rotation: MyAvatar.orientation,
  dimensions: { x: 0.5, y: 0.5, z: 0.5 }
});
print("Sphere created: " + entityID);

var level = Audio.inputLevelChanged(level);
var input = Audio.inputReceived(inputSamples);

function updateAudioInfo(deltaTime){    
    print("Level: " + level);    
    print("Input: " + input);
}

Script.update.connect(updateAudioInfo);

print("SCRIPT ENDED");
