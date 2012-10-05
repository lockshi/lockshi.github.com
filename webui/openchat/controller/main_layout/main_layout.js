steal(
    'jquery/controller',
    'jquery/controller/view',
    'jquery/view/ejs',
    'openchat/controller/login',
    'openchat/controller/chat',
    'openchat/controller/questions',
    'openchat/lib/utils.js'
)
.then(
    './views/init.ejs','./views/menu_unread.ejs',function(){
        /*
        * @class OpenChat.MainLayout
        */
        $.Controller( 'Openchat.Controller.MainLayout',
            /* @Static */
            
            {
            defaults : {}
            },
            /* @Prototype */
            {
                init : function() {
                    this.jqMobileSetup();
                    this.killTouchMove();
                    // ported from home.html, is this really needed ?
                    $("body").addClass("ui-mobile-viewport ui-overlay-c");
                    this.element.html(this.view("init"));

                    if ( !OpenChat.Utils.isTablet ){
                        this.element.find("#menu_panel").remove();
                        // extra flag used in splitview plugin to not refresh with a splitview
                        $.mobile.splitview = false;
                    }
                    
                    if ( !window.Mdb.isLoggedIn() ){
                        this.element.find("#login-page").openchat_login();
                        setTimeout(this.proxy("continueInit"),1);
                    }else{
                        this.element.find("#login-page").remove();
                        this.continueInit();
                    }
                },
                continueInit : function(){
                    this.element.find("#chat-page").openchat_chat();
                    this.element.find("#questions-page").openchat_questions();
                },
                jqMobileSetup : function(){
                    // we now disable transitions until it performes great or we get rid of jquery mobile.
                    $.mobile.defaultPageTransition = "none";
                    $.support.orientation = false;
                },
                killTouchMove : function(){
                    document.addEventListener('touchmove', function (e) {
                        e.preventDefault();
                    }, false);
                },
                setTitle: function(title){
                        this.element.find("#tablet_nav h1").html(title);
                }
            }
        );
    }
);
