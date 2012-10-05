steal('./models/models.js')
.then('steal/less')
.then('openchat/stylesheets/import.less')
.then('openchat/lib3rd/jquery.mobile/compiled/jquery.mobile.min.css',
    'openchat/lib3rd/jquery.mobile/jquery.mobile-1.1.1.min.css',
    'openchat/lib3rd/jquery.mobile/plugins/jquery.mobile.splitview.css',
    'openchat/lib3rd/jquery.mobile/plugins/jquery.mobile.grids.collapsible.css')
.then('openchat/lib3rd/jquery.mobile/jquery.mobile.custom.css')
.then('jquery')
.then('./lib/booter.js')
.then('openchat/lib3rd/jquery.mobile/plugins/jquery.mobile.splitview.js')
.then('openchat/lib3rd/jquery.mobile/compiled/jquery.mobile.js')
.then(
    'openchat/lib3rd/iscroll.js',
    function(){
    	window.originalHeight = $(window).height(); 
        OpenChat.Booter.start();
});
