//js spd/scripts/build.js

load("steal/rhino/rhino.js");

/* fixing misbehavior from build script where font and image file path included full build folder path*/
var oldToReferenceFromSameDomain = steal.File.prototype.toReferenceFromSameDomain;
var stylesheetFolder = "stylesheets/";

steal.File.prototype.toReferenceFromSameDomain = function( url ) {
	var returnVal = oldToReferenceFromSameDomain.apply(this,[url]);
    var lastStylesheetPathIndex = returnVal.lastIndexOf(stylesheetFolder);
    
    if(lastStylesheetPathIndex != -1){
        returnVal = returnVal.substring(lastStylesheetPathIndex);
    }
    
    return returnVal;
};

steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('mspd/scripts/build.html',{to: 'mspd'});
});
