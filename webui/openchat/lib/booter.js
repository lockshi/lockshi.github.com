steal(
    'openchat/controller/main_layout',
    'openchat/lib/utils.js',
    'jquery/controller/subscribe'
).then(
    'openchat/lib3rd/jquery.jsperanto.js',
    function(){
        
        function renderUI(){
            $.jsperanto.init(function(){
                $("<div/>").appendTo("body").openchat_main_layout();
            },{lang:"en-US",async:false}); // we force sync loading, seems to be required by jqmobile.
        };
        
        function subscribeToMdbEvents(){
        	window.onMdbEvent = function(eventObj){
                console.log("MDB emitted event: " +eventObj.event);
	            OpenAjax.hub.publish("Mdb."+eventObj.event,eventObj);
	       }
        };
        
        function setTabletNavigationHelper(){

            window.loadPageInMainPanel =  function(page){
                if ( OpenChat.Utils.isTablet){
                    $targetContainer=$('div:jqmData(id="main")');
                    $.mobile.pageContainer=$targetContainer;
                    $.mobile.changePage(page, {pageContainer:$targetContainer});
                }else{
                    $.mobile.changePage(page);
                }
            }
        }
        
        function start(){
            setTabletNavigationHelper();
            renderUI();
            subscribeToMdbEvents();
        };
        
        /*export*/
        window.OpenChat = window.OpenChat || {};
        OpenChat.Booter = steal.extend(OpenChat.Booter || {},{
            start : start
        });
    }
);
