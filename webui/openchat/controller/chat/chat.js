steal(
    'jquery/controller',
    'jquery/controller/view',
    'jquery/controller/subscribe',
    'jquery/view/ejs',
    'openchat/lib/utils.js',
    'openchat/models/mongodb.js',
    'openchat/models/mongo_notif.js',
    'openchat/lib3rd/underscore-min.js'
)
.then('./views/init.ejs',function(){
        /**
         * @class OpenChat.Tutorials
         */
        $.Controller('Openchat.Controller.Chat',
        /** @Static */
        {
            defaults : {
                user: null,
                question : null,
                questionQuery : {query:{author:"user@test.com"}}
            },
            listensTo: ["pagebeforeshow","pageshow"]
        },
        /** @Prototype */
        {
            init : function(){
                this.currentState = $.extend({}, this.Class.defaults);
                this.element.html(this.view("init"));
                OpenChat.Models.MongoNotif.setPollingFrequency(1000);    
                this.getActiveQuestion();
            },

            pagebeforeshow : function(){
            },

            destroy : function(){
                $("#messages-page").off('pagebeforeshow');
            },

            pageshow : function(){
                if(window.messagescroll){
                    window.messagescroll.refresh();
                }
            },

		    createScroller : function(){
		    	if(window.messagescroll){
		    		window.messagescroll.destroy();
		    	}
              	setTimeout(
					function loaded() {
						window.messagescroll = new iScroll('wrapper-messages', 
							{hScroll: false, hScrollbar: false, vScrollbar: false });
					}, 200);
		    },

            getReplies: function(question){
                var self = this;
                _.each(
                    question.replies,
                    function(reply) { self.addMessageToUi(reply); }
                );
            },

            addMessageToUi: function(reply) {
                $('<li><img src="http://3.bp.blogspot.com/_29ZwqU4Si1w/S8d5Ii_XSzI/AAAAAAAAAAk/oIS-PO3errA/s1600/doofus1.gif"/>' + reply.who + ': ' + reply.answer + '<div class="clear"></div></li>').appendTo($(".repliesList"));
                $('html, body').animate({scrollTop:$(document).height()}, 'slow');
            },

            // Returns the first active question
            getActiveQuestion : function(){
                var self = this,
                    questionsDb = new OpenChat.Models.Mongo("questions");

                questionsDb.find(
                    {query:{author:"user@test.com"}},
                    function(results) {
                        if(results.length > 0) {
                            self.currentState.question = results[0];
                            self.getReplies(self.currentState.question);
                        }
                    }
                );
            },

            '#sendButton click' : function() {
                this.sendMessage($("#sendTextInput").val());
            },

            sendMessage : function(messageText) {
                var questionsDb = new OpenChat.Models.Mongo("questions");
                var reply = { "who": "user@test.com", "answer": messageText };
                questionsDb.pushFieldById(
                    this.currentState.question._id.$oid,
                    { replies : reply },
                    function(results){}
                );
                
                //TODO: Did any messages show up before we last refreshed? We should update the UI

                this.addMessageToUi(reply);
            },
            "question.reply_message subscribe" : function(question) {
                //add this when you have questionId, count
                // OpenChat.Models.MongoNotif.startMonitor("506d26c0e4b01f1c93e7d6b5", 1);    
            }
        });
    }
);
