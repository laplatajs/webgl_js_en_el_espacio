// detect WebGL
  if( !Detector.webgl ){
    Detector.addGetWebGLMessage();
    throw 'WebGL Not Available'
  } 
controls=null;
  var scale=10, transientObjects=[];

  // setup webgl renderer full page
  var renderer  = new THREE.WebGLRenderer({
                        alpha   : true,
                        //antialias: true,
                        maxLights:100,
                        preserveDrawingBuffer   : true   // required to support .toDataURL()
                        });
  
  //var renderer  = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  // setup a scene and camera
  var scene = new THREE.Scene();
  camera  = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 200*scale);
  camera.position.z =7*scale;

  // declare the rendering loop
  var onRenderFcts= [];

  // handle window resize events
  var winResize = new THREEx.WindowResize(renderer, camera)

  //////////////////////////////////////////////////////////////////////////////////
  //    default 3 points lightning          //
  //////////////////////////////////////////////////////////////////////////////////
  
  /*var ambientLight= new THREE.AmbientLight( 0xffffff )
  scene.add( ambientLight)
  /*var frontLight  = new THREE.DirectionalLight('white', 1)
  frontLight.position.set(0.5*scale, 0.5*scale, 2*scale)
  scene.add( frontLight )
  var backLight = new THREE.DirectionalLight('white', 0.75)
  backLight.position.set(-0.5 *scale, -0.5*scale, -2 *scale)
  scene.add( backLight ) */

    
 
  //////////////////////////////////////////////////////////////////////////////////
  //    render the scene            //
  //////////////////////////////////////////////////////////////////////////////////
  onRenderFcts.push(function(){
    renderer.render( scene, camera );   
  })
  
  //////////////////////////////////////////////////////////////////////////////////
  //    Rendering Loop runner           //
  //////////////////////////////////////////////////////////////////////////////////
  var lastTimeMsec= null
  requestAnimationFrame(function animate(nowMsec){
    // keep looping
    requestAnimationFrame( animate );
    // measure time
    lastTimeMsec  = lastTimeMsec || nowMsec-1000/60
    var deltaMsec = Math.min(200, nowMsec - lastTimeMsec)
    lastTimeMsec  = nowMsec
    // call each update function
    onRenderFcts.forEach(function(onRenderFct){
      onRenderFct(deltaMsec/1000, nowMsec/1000)
    })
    controls && controls.update();
  })

  