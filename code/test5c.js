(function(){ 
    var childObject;
    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        childObject = Entities.getChildrenIDs(entityID);
        print("Children: " + childObject);  // Only the child entity.
    }

    this.enterEntity = function(entityID) {        
	print("Entered");
        if(MyAvatar.getParentID() != childObject){
              MyAvatar.setParentID(childObject);
          }
	print("ParentID = " + MyAvatar.getParentID());
	}; 
    
    this.leaveEntity = function(entityID) {    
	print("Exited");
        MyAvatar.setParentID(0);
	print("ParentID = " + MyAvatar.getParentID());
    };    
})