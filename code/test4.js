(function(){ 
    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        var children = Entities.getChildrenIDs(entityID);
        print("Children: " + JSON.stringify(children));  // Only the child entity.
    }

    this.enterEntity = function(entityID) {
	print("Entered");
	}; 
    
    this.leaveEntity = function(entityID) {
	print("Exited");
    };    
})