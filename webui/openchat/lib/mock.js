
if ( !window.Mdb ){
    window.Mdb = {
        login : function(emailUser, credentials){
            console.log("Making login for " + emailUser + "  : " + credentials );
            if ( emailUser == "user@test.com" && credentials == "password"){
                return true;
            }
            return false;
        },
        isLoggedIn : function(){

            return false;
        },
        getLoginEmail : function(){
            return "user@test.com";
        },
        pageTransitionsEnabled : function(){
            return false;
        },
        isNetworkAvailable : function(){
            return true;
        },
        getDeviceType : function(){
            return "PHONE";
        },
        homePageVisited : function(){
            console.log("Calling homePageVisited");
        },
        getForgotPasswordUrl : function(){
                return "http://www.radialpoint.com/password";
        },
        getSignUpUrl : function(){
                return "http://www.radialpoint.com/signup";
        },
        getAccountUrl :  function(){
                return "http://www.radialpoint.com/account";
        },
        isMobile : function() {
            return false;
        },
	asyncInvoke: function(method, params, callbackName) {
		if ( method == "login" ) {
			var email = params[0];
			var password = params[1];
			var result = window.Mdb.login(email, password);
			window[callbackName]({'value': result.toString() }, {'msg':''});
		}

		return true;
	}
    };
};
