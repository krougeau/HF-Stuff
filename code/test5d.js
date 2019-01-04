(function(){ 
    var childObject;
    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        childObject = Entities.getChildrenIDs(entityID);
        print("Children: " + childObject);  // Only the child entity.
    }

    this.enterEntity = function(entityID) {        
	print("Entered");
        if(Avatar.getParentID() != childObject){
              Avatar.setParentID(childObject);
          }
	print("ParentID = " + Avatar.getParentID());
	}; 
    
    this.leaveEntity = function(entityID) {    
	print("Exited");
        Avatar.setParentID(0);
	print("ParentID = " + Avatar.getParentID());
    };    
})