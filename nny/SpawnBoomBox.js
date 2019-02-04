var leftHandPosition = {
      "x": 0,
      "y": 0.26,
      "z": 0
  };
  

  var leftHandRotation = Quat.fromPitchYawRollDegrees(180, 0, 0);
  var rightHandPosition = Vec3.multiplyVbyV(leftHandPosition, { x: 1, y: 1, z: 1 });
  var rightHandRotation = Quat.fromPitchYawRollDegrees(180, 0, 0);

  var userData = {
      "grabbableKey": {
          "grabbable": true
      },
	  
      "wearable": {
          "joints": {
              "LeftHand": [
                  leftHandPosition,
                  leftHandRotation
              ],
              "RightHand": [
                  rightHandPosition,
                  rightHandRotation
              ]
          }
      }
	  
  }
  
  var id = Entities.addEntity({
      position: MyAvatar.position,
      "collisionsWillMove": 0,
	  "collidesWith": "static,dynamic,kinematic",
      "created": "2018-09-01T23:57:55Z",
      "dimensions": {
          "x": 0.72,
          "y": 0.4132,
          "z": 0.3
      },
      "dynamic": 1,
      "gravity": {
          "x": 0,
          "y": -9.8,
          "z": 0
      },

      "modelURL": "https://github.com/krougeau/HF-Stuff/raw/master/nny/BoomboxStandard.fbx",
      "name": "BoomBox",
      "rotation": {
          "w": 0,
          "x": 0,
          "y": .2,
          "z": 0
      },
      "script": Script.resolvePath("BoomBox.js") + "?" + Date.now(),
      "shapeType": "compound",
      "type": "Model",
      "userData": JSON.stringify(userData),
      "lifetime": -1
  });
  print("Created BoomBox:", id);