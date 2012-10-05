steal(
    'jquery/class',
    'openchat/config/config.js',
   function () {

      $.Class( 'OpenChat.Models.Login',
      
         /* @Static */
         {
            CHAT_STATE : {
               isLoggedIn : false,
            },

            userRecord : null,

            init : function() {
             },
 
            // -------------------
            login : function(emailAddress,password){
               var users = new OpenChat.Models.Mongo("users");
               var user = users.getUserRecord(emailAddress);
               if (password == user.password)
               {
                  this.CHAT_STATE.isLoggedIn = true;
                  this.userRecord = user;
                  return true;
               }

               return false;
            },

            isLoggedIn : function(){
               return this.CHAT_STATE.isLoggedIn;
            },
            
            getLoginEmail : function(){
               return this.userRecord.email;
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
         },
         {

         }
      );
   }
);
