(function(){ 
    var teleport;
    // var portalDestination;
    var portalDestination = "thepalace.rougeaugallery.com/7.93562,-11.4888,102.422/8.7013e-05,0.999971,-1.85826e-05,-0.00767109";
    //var animationURL;

    function playSound() {
      Audio.playSound(teleport, { volume: 0.40, localOnly: true });
    };
    
    this.preload = function(entityID) {
        teleport = SoundCache.getSound("http://s3.amazonaws.com/hifi-public/birarda/teleport.raw");

        // var properties = Entities.getEntityProperties(entityID);
        // animationURL = properties.modelURL;
        
        print("The portal destination is " + portalDestination);
    }

    this.enterEntity = function(entityID) {

      // var properties = Entities.getEntityProperties(entityID); // in case the userData/portalURL has changed
      // portalDestination = properties.userData;

      print("enterEntity() .... ENTERED! The portal destination is " + portalDestination);

      if (portalDestination.length > 0) {
        print("Teleporting to hifi://" + portalDestination);
        Window.location = "hifi://" + portalDestination;
      }
      
    }; 
    
    this.leaveEntity = function(entityID) {
      Entities.editEntity(entityID, {
        // animation: { url: animationURL, currentFrame: 1, running: false }
      });
      
      playSound();
    };
    
    this.hoverEnterEntity = function(entityID) {
      Entities.editEntity(entityID, {
        // animation: { url: animationURL, fps: 24, firstFrame: 1, lastFrame: 25, currentFrame: 1, running: true, hold: true }
      });
    };
})
