(function() {
    var _this = this;
    var cubeList = [];

    var spawnACube = function() {
        var id = Entities.addEntity({
            position: Vec3.sum(MyAvatar.position, Quat.getFront(MyAvatar.orientation)),
            script: Script.resolvePath("cube.js"),
            type: "Box",
            name: "ScriptBox",
            color: { red: 0, green: 0, blue: 155 }
        });
        cubeList.push(id);
        print("Made a cube!" , id);
    };

    _this.clickDownOnEntity = function(entityID, event) {
        spawnACube();
    };

    var deleteAllCubes = function() {
        print("Deleting all created cubes...");
        while (cubeList.length > 0) {
            Entities.deleteEntity(cubeList.pop());
        }
    }
    Entities.deletingEntity.connect(deleteAllCubes);
})