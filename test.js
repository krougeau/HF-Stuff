(function(){ 
    var userName;
    
    this.preload = function(entityID) {
        print("Counter initialized. Listening for user entries.");
    }

    this.enterEntity = function(entityID) {
	print("enterEntity() .... ENTERED!");
	}; 
    
    this.leaveEntity = function(entityID) {
      print("enterEntity() .... EXITED!");
    };    
})