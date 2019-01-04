this.enterEntity = function(entityID) {
	if (MyAvatar.getParentID() != this.getParentID) {
            MyAvatar.position = { x: 0, y: 3, z: 0 };
	    MyAvatar.setParentID(this);
            print("Parented!");
	}
	print("Entered!");
}; 
    
this.leaveEntity = function(entityID) {
      	MyAvatar.setParentID(0);
	print("Exited");
};    