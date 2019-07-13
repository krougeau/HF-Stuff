// {
// var npcs = Entities.findEntitiesByName("NPC", this.position, 1000000, true);
// print("Located " + npcs.length + " NPC entities.");
var startPosition = {x: 0, y: 0 , z:0}
// var entityIDs = Entities.findEntitiesByName("NPC", MyAvatar.position, 10000, false);
var entityIDs = Entities.findEntitiesByName("NPC", startPosition, 10000, false);
print("Number of entities with the name NPC: " + entityIDs.length);
// }