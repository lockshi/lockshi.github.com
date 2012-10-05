steal(
    'jquery/controller',
    'jquery/controller/view',
    'jquery/controller/subscribe',
    'jquery/view/ejs',
    'openchat/lib/utils.js',
    'openchat/models/login.js',
    'openchat/models/mongodb.js',
    'openchat/models/questions.js'

)
.then('./views/init.ejs',function(){
        /**
         * @class OpenChat.Tutorials
         */
        $.Controller('Openchat.Controller.Questions',
        /** @Static */
        {
            defaults : {},
            status: ["active", "open", "close"],
            listensTo: ["pageinit"],
            gotFirstClickOnQInputs: false,
        },
        /** @Prototype */
        {
            init : function(){
                if(location.hash == '#questions-page')
                    this.pageinit();
            },

            pageinit: function(){
                var self = this;
                this.element.html(this.view("init"));
                var content = self.element.find(".content");
                OpenChat.Models.Questions.findAll({}, function(questions){
                    var groupedQuestion = _.groupBy(questions, 'status');
                    _.each(self.Class.status, function(status){
                        var questionsList = groupedQuestion[status];
                        if(questionsList && questionsList.length){
                            var statusEl = $(self.view("status", {status: status})).appendTo(content);
                            _.each(questionsList, function(question){
                                $(self.view("question", question)).appendTo(statusEl);
                            });
                        }else{
                            $(self.view("empty_status", {status: status})).appendTo(content);
                        }
                    });

                    $(self.element).trigger('create');
                }); //end findAll()
            },
            
            'button[name=askButton] click': function() {
                if (!OpenChat.Models.Login.isLoggedIn())
                {
                    alert ("You are not logged in.");
                    return;
                }
                var qTextField = $("#questionText");
                var qText = qTextField.val();
                var qTitleField = $("#questionTitle");
                var qTitle = qTitleField.val();

                var email = OpenChat.Models.Login.getLoginEmail();
                var date = new Date().toString();
                var questions = new OpenChat.Models.Mongo("questions");

                questions.save({
                    author:email,
                    channel:"sales",
                    count: -1,
                    description: qText,
                    rating: 0,
                    resolution: "",
                    status: "open",
                    title: qTitle,
                    when: date});
                qTextField.val("");
                qTitleField.val("");

                this.init();

            },

             'input[name=qtitle] click': function() {
                if (!this.gotFirstClickOnQInputs){
                    this.element.find('input:text').val("");
                    gotFirstClickOnQInputs = true;
                }
             },

            destroy : function(){

            }
        });
    }
);
