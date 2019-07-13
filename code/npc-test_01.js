{
var npcs = Entities.findEntitiesByName("NPC", this.position, 1000000, true);
print("Located " + npcs.length + " NPC entities.");
}