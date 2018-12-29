(function(){ 
    var ents;
    var exts;
    
    this.preload = function(entityID) {
	ents = 0;
	exts = 0;
        print("Counter initialized. Listening for user entries.");
    }

    this.enterEntity = function(entityID) {
	ents++;
	print("enterEntity() .... Entrances: " + ents);
	}; 
    
    this.leaveEntity = function(entityID) {
      	exts++;
	print("enterEntity() .... Exits: " + exts);
    };    
})