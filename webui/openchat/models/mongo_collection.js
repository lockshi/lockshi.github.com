steal(
    'jquery/model',
    'openchat/models/mongodb.js',
    function () {
        window.Mdb.GetCollectionModel = function(collectionName) {
            var mongoDriver = new OpenChat.Models.Mongo(collectionName);

            function fixId(el){
                if(el.id === undefined &&
                    el._id && el._id.$oid){
                    el.id = el._id.$oid;
                }
                delete el._id;

                return el;
            }

            return $.Model('',
            {
                findAll: function(params, success, error){
                    var self = this;
                    mongoDriver.find(params, function(datas){
                        success(_.map(datas, function(el){
                            el = fixId(el);
                            return new self(el);
                        }));
                    });
                },

                findOne: function(params, success, error){
                    var self = this;
                    mongoDriver.findOne(params, function(data){
                        data = fixId(data);
                        success(new self(data));
                    });
                },

                create: function(attrs, success, error){
                    mongoDriver.save(attrs, function(newAttrs){
                        console.log(newAttrs);
                        if(newAttrs.id === undefined &&
                            newAttrs._id && newAttrs._id.$oid){
                            newAttrs.id = newAttrs._id.$oid;
                        }
                        delete newAttrs._id;
                        success(newAttrs);
                    });
                },

                update: function(id, attrs, success, error){
                    delete attrs.id;
                    delete attrs._id;
                    mongoDriver.updateOneById(id, attrs, function(){
                        success({});
                    });
                },

                destroy: function(params, success, error){
                    console.warning('Destroy not implemented');
                }
            },
            {
                
            });
        };
    }
);
