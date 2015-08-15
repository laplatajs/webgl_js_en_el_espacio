function buildAxes( length ) {
 var axisHelper = new THREE.AxisHelper( length );
  scene.add( axisHelper );

}

function addAmbientLight(){
  var ambientLight= new THREE.AmbientLight( 0xffffff )
    scene.add( ambientLight);
}

function signo(d){
    return d==0?1:d/Math.abs(d);
  }

if (!Number.isInteger) {
  Number.isInteger = function isInteger(nVal) {
    return typeof nVal === 'number'
      && isFinite(nVal)
      && nVal > -9007199254740992
      && nVal < 9007199254740992
      && Math.floor(nVal) === nVal;
  };
}

function orbitControls(){
	controls = new THREE.OrbitControls( camera );
  	controls.damping = 0.2;
  	controls.addEventListener( 'change', renderer );
}

function trackballControls(){
	controls = new THREE.TrackballControls( camera );

	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	controls.noZoom = false;
	controls.noPan = false;

	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;

	//controls.keys = [ 65, 83, 68 ];

	controls.addEventListener( 'change', renderer );
}

function flyControls(){
    controls = new THREE.FlyControls( camera );
    controls.movementSpeed = 50;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 8;
    controls.autoForward = false;
    controls.dragToLook = true;
    //DEMO.ms_Controls=controls;
}

function checkBrowserSupport(tech){
  $.ajax({
          url: "http://api.html5please.com/"+tech+".json?text&supported",
          dataType: 'json',
          success: function(data){
              //console.dir(data);
              //var supportedBrowsers=[];
              unsupportedEngines=[];
              unsupportedEngines.push(rocket.getObjectByName("ie_engine"));
              unsupportedEngines.push(rocket.getObjectByName("chrome_engine"));
              unsupportedEngines.push(rocket.getObjectByName("firefox_engine"));
              unsupportedEngines.push(rocket.getObjectByName("opera_engine"));
              unsupportedEngines.push(rocket.getObjectByName("safari_engine"));

              for (var agent in data.agents){
                var browserEngine=rocket.getObjectByName(agent+"_engine");
                if (browserEngine){
                  //supportedBrowsers.push(browserEngine);
                  unsupportedEngines.splice(unsupportedEngines.indexOf(browserEngine),1);
                }
              }
                alternateEngineColor(0xffffff,0xff0000);
          }
      });
}

function populateModal(code){
  $("#modal-1 .md-content").html(code);
  $("#btnLinks").show(500);
}