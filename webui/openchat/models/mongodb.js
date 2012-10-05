steal(
    'jquery/class',
    'openchat/config/config.js',
    function () {
        $.Class( 'OpenChat.Models.Mongo',
        {
            getUrlParam : function(url, param) {
                var urlParam = url;
                urlParam += (param.query != undefined) ? "&q=" + JSON.stringify(param.query) : "";
                urlParam += (param.fields != undefined) ? "&f=" + JSON.stringify(param.fields) : "";
                urlParam += (param.orderBy != undefined) ? "&s=" + JSON.stringify(param.orderBy) : "";
                urlParam += (param.skip != undefined) ? "&sk=" + param.skip : "";
                urlParam += (param.limit != undefined) ? "&l=" + param.limit : "";
                urlParam += (param.single != undefined) ? "&fo=" + param.single : "";
                return urlParam;
            },
            isString : function(obj) {
                return typeof obj == "string" || (typeof obj == "object" && obj.constructor == String);
            }
        },
        {
               /*
                *Sample query to count users
                var users = new OpenChat.Models.Mongo("users");
                var v = users.count();
                alert("count1: " + v);

                //Sample query to find one user by email
                users.findOne({query:{email:"user@email.com"}}, function(results) {
                   alert(results); 
                });
                
                //Update user by email
                users.update({fields:{email:"user@email.com", phone:"12345"}});

                //Create new user 
                users.save({email:"newuser@email.com"});

                //More example of rest api:
                //http://support.mongolab.com/entries/20433053-rest-api-for-mongodb */

            init : function(collection){
                this.apiKey = "506d147ce4b01f1c93e7d67b";
                this.collection = collection;
                this.dbName = "openchat";
                this.urlNoKey = "https://api.mongolab.com/api/1/databases/" + this.dbName + "/collections/" + this.collection;
                this.url = this.urlNoKey + "?apiKey=" + this.apiKey;
            },
            count : function(query){   
                var retVal = -1;  
                query = ( query == undefined ) ? [] : query;
                var urlParam = this.url + "&q=" + JSON.stringify(query) + "&c=true";
                $.ajax( { url: urlParam,
                      type: "GET",
                      async: false,
                      success: function(results) {
                        retVal = results;
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });  

                return retVal;      
            },
            find : function(param, success) {
                var urlParam = OpenChat.Models.Mongo.getUrlParam(this.url, param);
                $.ajax( { url: urlParam,
                      type: "GET",
                      async: true,
                      success: function(results) {
                        success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },
            findOne : function(param, success) {
                param.single = true;
                var urlParam = OpenChat.Models.Mongo.getUrlParam(this.url, param);
                $.ajax( { url: urlParam,
                      type: "GET",
                      async: true,
                      success: function(results) {
                        success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },
            findOneById : function(id, success) {
                var urlParam = this.urlNoKey + "/" + id + "?apiKey=" + this.apiKey;
                $.ajax( { url: urlParam,
                      type: "GET",
                      async: true,
                      success: function(results) {
                        success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },

            getUserRecord : function(emailAddress) {
                var userRecord = null;
                var param = {query:{email:emailAddress}};
                param.single = true;

                var urlParam = OpenChat.Models.Mongo.getUrlParam(this.url, param);
                var self = this;
                $.ajax( { url: urlParam,
                      type: "GET",
                      async: false,
                      success: function(results) {
                        alert(OpenChat.Models.Mongo.isString(results));
                        userRecord = JSON.parse(results);
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });

                return userRecord;
            },

            save : function(object, success) {
                $.ajax( { url: this.url,
                      data: JSON.stringify( object ),
                      type: "POST",
                      contentType: "application/json;charset=utf-8",
                      success: function(results) {
                        if ( success != undefined)
                            success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },
            update : function(param, success) {
                var urlParam = this.url;
                urlParam += (param.query != undefined) ? "&q=" + JSON.stringify(param.query) : "";
                var object = { "$set" : param.fields };
                $.ajax( { url: urlParam,
                      data: JSON.stringify( object ),
                      type: "PUT",
                      contentType: "application/json;charset=utf-8",
                      success: function(results) {
                        if ( success != undefined)
                            success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },
            updateOneById : function(id, fields, success) {
                var urlParam = this.urlNoKey + "/" + id + "?apiKey=" + this.apiKey;
                var object = { "$set" : fields };
                $.ajax( { url: urlParam,
                      data: JSON.stringify( object ),
                      type: "PUT",
                      contentType: "application/json;charset=utf-8",
                      success: function(results) {
                        if ( success != undefined)
                            success(JSON.parse(results));
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            },
            pushFieldById : function(id, fields, success) {
                var urlParam = this.urlNoKey + "/" + id + "?apiKey=" + this.apiKey;
                var object = { "$push" : fields };
                $.ajax( { url: urlParam,
                      data: JSON.stringify( object ),
                      type: "PUT",
                      contentType: "application/json;charset=utf-8",
                      success: function(results) {
                        if ( success != undefined)
                            success(results);
                      },
                      error: function(XMLHttpRequest, textStatus, errorThrown) {
                            alert('error:'  + XMLHttpRequest.status + ':' + textStatus);
                      } 
                });
            }
        });
    }
);
