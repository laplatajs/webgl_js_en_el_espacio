//importScripts("../../bower_components/jquery/dist/jquery.min.js");
 this.onmessage = function(doc){
 	var documentWrapper= new Object();
  	documentWrapper.createElement = function dummy(dummyData){};
  	document=documentWrapper;

  	window = new Object();
  	window.addEventListener = function dummy(dummyData){};

 	importScripts("../build/three.js");
 	importScripts("../demo/assets/libs/RequestAnimationFrame.js");
 	//importScripts("../../vendor/three.js/examples/js/Detector.js");
	importScripts("escenas.js");
	importScripts("diapositivas.js");
	importScripts("thumbnails.js");
	importScripts("../demo_basic/assets/js/demo.js");
	//importScripts("../demo_basic/assets/js/main.js");

	requestAnimationFrame = window.requestAnimationFrame;
	importScripts("init.js");
	
	thumbnails();
 }; 
