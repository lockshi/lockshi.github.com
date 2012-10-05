//js spd/scripts/doc.js

load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('spd/spd.html', {
		markdown : ['spd']
	});
});