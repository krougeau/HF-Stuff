(function(){ 
    this.enterEntity = function(entityID) {
	if (MyAvatar.getParentID() != this) {
            MyAvatar.position = { x: 0, y: 3, z: 0 };
	    MyAvatar.setParentID(this);
            print("enterEntity() .... Entrances: " + ents);
		}
	}; 
    
    this.leaveEntity = function(entityID) {
      	MyAvatar.setParentID(0);
	print("enterEntity() .... Exits: " + exts);
    };    
})