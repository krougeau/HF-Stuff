(function(){ 
    var childObject;
    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        childObject = Entities.getChildrenIDs(entityID);
        print("Children: " + childObject);  // Only the child entity.
    }

    this.enterEntity = function(entityID) {        
	print("Entered");
        MyAvatar.setParentID(childObject);
	print("ParentID = " + MyAvatar.getParentID());
        print("Should be: " + childObject);
	}; 
    
    this.leaveEntity = function(entityID) {    
	print("Exited");
        MyAvatar.setParentID(0);
	print("ParentID reset");
    };    
})