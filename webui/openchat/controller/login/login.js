steal(
    'jquery/controller',
    'jquery/controller/view',
    'jquery/view/ejs',
    'openchat/models/login.js',
    'openchat/lib/mock.js',
    'openchat/lib/utils.js'
)
.then('./views/init.ejs',function(){
    /**
    * @class OpenChat.Login
    */
    $.Controller('Openchat.Controller.Login',
    /** @Static */
    {
        defaults: {},
        listensTo : ["pagebeforeshow"]
    },
    /** @Prototype */
    {
        init : function(){
            this.element.html(this.view("init"));
            if (!window.Mdb.isNetworkAvailable()){
                this.noNetwork();
            }else{
				this.element.find("#forgotpassword").attr("href", window.Mdb.getForgotPasswordUrl());
                this.element.find("#signup").attr("href", window.Mdb.getSignUpUrl());
            }
        },
        pagebeforeshow: function(){
            $("#main").css("display","none");
            // adding a flag so the splitview plugins know to not sho splitivew in this case
            if( Mdb.getLoginEmail() !== ""){
                this.element.find("#login_userEmail").val(Mdb.getLoginEmail());
            }
            $.mobile.splitview = false;
         },
        login : function(){
            var emailUser = this.element.find("#login_userEmail").val();
            var credentials = this.element.find("#login_credentials").val();
            if (! this.validate(emailUser, credentials) ){
                return;
            }
	
            if (OpenChat.Models.Login.login(emailUser, credentials) ) {
                 // let's show splitview now
                $.mobile.splitview = true;
                if ( $.support.splitview ){
                    // reshow main
                    $("#main").css("display", "block");
                    // moving to chat
                    $(window).trigger("orientationchange");
                    self.element.remove();
                    location.hash="#questions-page";
                }else{
                    $.mobile.changePage("#questions-page");
                }
            }
            else {
                this.showError($.t("login.loginGenericError"));
            }
        },
        validate : function(emailUser, credentials){
                if ( emailUser === "" || emailUser === null || credentials === "" || credentials === null){
                    this.showError($.t("login.loginEmptyEmailOrCredentials"));
                    return false;
                }

                var atpos=emailUser.indexOf("@");
                var dotpos=emailUser.lastIndexOf(".");
                if (atpos<1 || dotpos<atpos+2 || dotpos+2>=emailUser.length){
                    this.showError($.t("login.loginInvalidEmailAddress"));
                    return false;
                }
                return true;
        },
        "Mdb.CONNECTIVITY_CHANGED subscribe" : function(eventName, data){
            if (!window.Mdb.isNetworkAvailable()){
                this.noNetwork();
            }else{
                this.enableForm();
                this.removeError();
            }
        },
        showError : function(error){
            if ( this.element.find("#error-msg").length === 0 ){
                this.element.find("#login-page-content").prepend("<div id='error-msg'></div>");
            }
            this.element.find("#error-msg").html("");
            this.element.find("#error-msg").html(error);
        },
        removeError : function(){
            this.element.find("#error-msg").remove();
        },
        noNetwork : function(){
            //disable everything
            this.disableForm();
            //showError
            this.showError($.t("login.noNetwork"));
        },
        disableForm : function(){
            this.element.find("#login_userEmail").attr("disabled","disabled");
            this.element.find("#login_credentials").attr("disabled","disabled");
            this.element.find("#login_submit").attr("disabled", "disabled");
            this.element.find("#login_submit").addClass("disabled_submit");
            this.element.find("#login_submit").removeClass("brandButton");
			this.element.find("#forgotpassword").attr("href", "");
            this.element.find("#signup").attr("href", "");

        },
        enableForm : function(){
            this.element.find("#login_userEmail").removeAttr("disabled");
            this.element.find("#login_credentials").removeAttr("disabled");
            this.element.find("#login_submit").removeAttr("disabled");
            this.element.find("#login_submit").removeClass("disabled_submit");
            this.element.find("#login_submit").addClass("brandButton");
			this.element.find("#forgotpassword").attr("href", window.Mdb.getForgotPasswordUrl());
            this.element.find("#signup").attr("href", window.Mdb.getSignUpUrl());
        },
        "#login_submit click" : function(el, ev){
           ev.preventDefault();
           this.login();
        }
    });
});
