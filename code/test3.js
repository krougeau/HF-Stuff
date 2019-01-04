(function(){ 

    this.preload = function(entityID) {
        print("(ID: " + entityID + "): Initialized. Listening for user entries.");
        if(entityID.getParentID != 0){
            print("Parented to " + entityID.getParentID);
        }else{
            print("Orphaned " + entityID.getParentID);
        }
    }

    this.enterEntity = function(entityID) {
	print("Entered");
	}; 
    
    this.leaveEntity = function(entityID) {
	print("Exited");
    };    
})