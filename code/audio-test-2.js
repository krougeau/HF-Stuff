var sound = SoundCache.getSound(Script.resourcesPath() + "sounds/test.mp3");
var injector;

Script.setTimeout(function () { // Give the sound time to load.
  injector = Audio.playSound(sound, injectorOptions);
}, 1000);