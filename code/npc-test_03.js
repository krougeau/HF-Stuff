(function () {
var scanPosition = {x: 0, y: 0 , z:0}
var npcs = Entities.findEntitiesByName("NPC", scanPosition, 10000, false);
print("Number of NPCs: " + npcs.length);
});