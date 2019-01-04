(function(){ 
    var childObject;
    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        childObject = Entities.getChildrenIDs(entityID);
        print("Children: " + JSON.stringify(childObject));  // Only the child entity.
    }

    this.enterEntity = function(entityID) {        
	print("Entered");
        if(MyAvatar.getParentID() != childObject){
              MyAvatar.setParentID(childObject);
          }
	}; 
    
    this.leaveEntity = function(entityID) {    
	print("Exited");
        MyAvatar.setParentID(0);
    };    
})