steal("funcunit", function(){
	module("spd test", { 
		setup: function(){
			S.open("//spd/spd.html");
		}
	});
	
	test("Copy Test", function(){
		equals(S("h1").text(), "Welcome to JavaScriptMVC 3.2!","welcome text");
	});
})