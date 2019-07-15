(function () { 
    var toggle = false;
    var RED = {
        red: 255,
        green: 0,
        blue: 0
    };
    var GREEN = {
        red: 0,
        green: 255,
        blue: 0
    };
    var TestServer = function(){        
    };

    TestServer.prototype = {
        remotelyCallable: ["remoteCallTest"],
        remoteCallTest: function(id, params) {
            console.info("This function was called.");
            if(toggle)                                
            {
                setEntityColour(id, RED);
                toggle = !toggle;
            } else{
                setEntityColour(id, GREEN);
                toggle = !toggle;
            }
        }
    }

    function setEntityColour(id, colour) {
        Entities.editEntity(id, {
            color: colour
        });
    }

    return new TestServer();
});
