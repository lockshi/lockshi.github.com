steal(
    'openchat/models/mongo_collection.js',
    function () {
        window.Mdb.GetCollectionModel('questions')('OpenChat.Models.Questions',{},{});
    }
);
