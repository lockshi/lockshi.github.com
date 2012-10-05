steal("openchat/lib/mock.js",
    function(){
        var isTablet = Mdb.getDeviceType() === "TABLET";
        
        window.OpenChat = window.OpenChat || {};
        window.OpenChat.Utils = {
            isTablet : isTablet,
	    asyncInvoke: function(option) {
		var callbackName = option.method + Date.now() + Math.floor(Math.random() * 100);
		window[callbackName]  = function(result, error) {
			window[callbackName] = null;	
			if ( error.msg.length > 0 ) {
				if ( option.error != undefined ) {
					option.error(error);
				}
			}
			else {	
				if (option.success != undefined) {
					option.success(result);
				}
			}
		};
			
		if ( !Mdb.asyncInvoke(option.method, option.params, callbackName) ) {
			window[callbackName] = null;
			if (option.error != undefined) {
				option.error({ msg: "failed to call asyncInvoke" });
			}
		}
	   }
        };
    }
);
