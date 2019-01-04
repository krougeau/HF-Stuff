this.enterEntity = function(entityID) {
	if (MyAvatar.getParentID() != this) {
            MyAvatar.position = { x: 0, y: 3, z: 0 };
	    MyAvatar.setParentID(this);
            print("enterEntity() .... entered");
	}
}; 
    
this.leaveEntity = function(entityID) {
      	MyAvatar.setParentID(0);
	print("enterEntity() .... exited");
};    