steal(
    'jquery/class',
    'openchat/models/mongodb.js',
    function () {
        $.Class( 'OpenChat.Models.MongoNotif',
        {
            pollFrequency : 1000,
            qId : 0,
            replyCount : 0,
            init : function() {
            },
            setPollingFrequency : function(pollFrequencyInMs){
                pollFrequency = pollFrequencyInMs; 
            },
            startMonitor : function(questionId, replyArraySize) {
                qId = questionId;
                replyCount = replyArraySize;  
                setInterval(function() { OpenChat.Models.MongoNotif.checkNewReply() }, pollFrequency);         
            },
            checkNewReply : function() {
                var questions = new OpenChat.Models.Mongo("questions");
                questions.find({query:{ _id:{$oid: qId}, count:{$gt:replyCount} } }, function(results) {
                    if (results.length > 0) {
                        console.log(results);
                        replyCount = results[0].count;
                        OpenAjax.hub.publish("question.reply_message", results);
                    }
                });
            }
        },
        {                    
        });
    }
);
