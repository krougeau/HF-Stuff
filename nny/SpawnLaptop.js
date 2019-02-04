var leftHandPosition = {
      "x": -0.1,
      "y": 0,
      "z": 0.18
  };
  

  var leftHandRotation = Quat.fromPitchYawRollDegrees(180, -90, -50);
  var rightHandPosition = Vec3.multiplyVbyV(leftHandPosition, { x: -1, y: -1, z: 1 });
  var rightHandRotation = Quat.fromPitchYawRollDegrees(180, 90, 50);

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
          "x": 0.37,
          "y": 0.25,
          "z": 0.34
      },
      "dynamic": 1,
      "gravity": {
          "x": 0,
          "y": -9.8,
          "z": 0
      },

      "modelURL": "https://github.com/krougeau/HF-Stuff/raw/master/nny/laptopOpen.fbx",
      "name": "Laptop",
      "rotation": {
          "w": 0,
          "x": 0,
          "y": 0,
          "z": 0
      },
      "script": Script.resolvePath("Laptop.js") + "?" + Date.now(),
      "shapeType": "compound",
      "type": "Model",
      "userData": JSON.stringify(userData),
      "lifetime": -1
  });
  print("Created Laptop:", id);