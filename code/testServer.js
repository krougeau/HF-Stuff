(function () { 
    var TestServer = function(){        
    };

    TestServer.prototype = {
        remotelyCallable: ["remoteCallTest"],
        remoteCallTest: function(id, params) {
            console.info("This function was called.");
        }
    }

    return new TestServer();
});