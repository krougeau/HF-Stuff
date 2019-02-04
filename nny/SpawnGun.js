var leftHandPosition = {
      "x": 0,
      "y": 0,
      "z": 0
  };
  var leftHandRotation = Quat.fromPitchYawRollDegrees(90, -90, 0);
  var rightHandPosition = Vec3.multiplyVbyV(leftHandPosition, { x: -1, y: 0, z: 0 });
  var rightHandRotation = Quat.fromPitchYawRollDegrees(90, 90, 0);

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
          "x": 0.0554,
          "y": 0.21,
          "z": 0.41
      },
      "dynamic": 0,
      "gravity": {
          "x": 0,
          "y": 0,
          "z": 0
      },
	  "registrationPoint":{
		  "x": 0.5,
		  "y": 0.78,
		  "z": 0.98
	  },
      "modelURL": Script.resolvePath("gun.fbx"),
      "name": "Hifi-Gun",
      "rotation": {
          "w": 0,
          "x": 0,
          "y": 0,
          "z": 0
      },
      "script": Script.resolvePath("TestGun.js") + "?" + Date.now(),
      "shapeType": "compound",
      "type": "Model",
      //"userData": JSON.stringify(userData),
      "userData": "{\"grabbableKey\":{\"grabbable\":true},\"wearable\":{\"joints\":{\"RightHand\":[{\"x\":0.0813,\"y\":0.0452,\"z\":0.0095},{\"x\":-0.3946,\"y\":-0.6604,\"z\":0.4748,\"w\":-0.4275}],\"LeftHand\":[{\"x\":-0.0881,\"y\":0.0259,\"z\":0.0159},{\"x\":0.4427,\"y\":-0.6519,\"z\":0.4592,\"w\":0.4099}]}}}",
      "lifetime": -1
  });
  print("Created TestGun:", id);