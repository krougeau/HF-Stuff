Entities.addEntity({
    position: Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation)),
    script: Script.resolvePath("spawnCube.js"),
    type: "Box",
    color: {red: 255, green: 255, blue: 255},
    dimensions: {x: 0.5, y: 0.1, z: 0.1},
    name: "Cube Spawner"
});