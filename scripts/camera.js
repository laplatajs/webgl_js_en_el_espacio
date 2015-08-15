//////////////////////////////////////////////////////////////////////////////////
  //    Camera Controls             //
  //////////////////////////////////////////////////////////////////////////////////
  
  /*orbitControls();
  */

  /*
  trackballControls();
  */
traslating=false;

function setCameraToLastTransitionPoint(diapositiva){
    camera.position.copy(diapositiva.transitionPath[diapositiva.transitionPath.length-1]);
    cameraLight.position.set(camera.position.x,camera.position.y,camera.position.z);
    cameraLight.lookAt(diapositiva.lookAt || new THREE.Vector3(0,0,0));
}

function transitionToNextSlide(vectorArray,slideNum){

    function addGeometry( geometry, color ) {

        // 3d shape

        tubeMesh = THREE.SceneUtils.createMultiMaterialObject( geometry, [
          new THREE.MeshLambertMaterial({
            color: color
          }),
          new THREE.MeshLambertMaterial({
            color: color,
            opacity: 1,
            wireframe: true,
            transparent: false
        })]);

        scene.add( tubeMesh );

      }

    function navigateTransition(delta,now){
      //var camera= splineCamera || camera;
      // Try Animate Camera Along Spline
      var time = Date.now();
      if (cameraMoveStartTime ==null)
          cameraMoveStartTime=time;
      //time += delta;

      var looptime = 2 * 1000;
      var t = ( time % looptime ) / looptime;

      var pos = tube.parameters.path.getPointAt( t );
      //pos.multiplyScalar( scale );

      // interpolation
      var segments = tube.tangents.length;
      var pickt = t * segments;
      var pick = Math.floor( pickt );
      var pickNext = ( pick + 1 ) % segments;

      binormal.subVectors( tube.binormals[ pickNext ], tube.binormals[ pick ] );
      binormal.multiplyScalar( pickt - pick ).add( tube.binormals[ pick ] );


      dir = tube.parameters.path.getTangentAt( t );

      var offset = 0;

      normal.copy( binormal ).cross( dir );

      // We move on a offset on its binormal
      pos.add( normal.clone().multiplyScalar( offset ) );

      camera.position.copy( pos );
      cameraLight.position.set(camera.position.x,camera.position.y,camera.position.z);
      //splineCamera.position.copy( pos );
      //cameraEye.position.copy( pos );


      // Camera Orientation 1 - default look at
      // camera.lookAt( lookAt );

      // Using arclength for stablization in look ahead.
      var lookAt = tube.parameters.path.getPointAt( ( t + 30 / tube.parameters.path.getLength() ) % 1 );//;.multiplyScalar( scale/3 );

      // Camera Orientation 2 - up orientation via normal
      if (lookAhead){
        lookAt.copy( pos ).add( dir );
        camera.matrix.lookAt(camera.position, lookAt, normal);
        cameraLight.lookAt(rocket.position);
        //camera.rotation.setFromRotationMatrix( camera.matrix, camera.rotation.order );
        
        //parent.rotation.y += ( targetRotation - parent.rotation.y ) * 0.05;
        //cameraHelper.update();
        //camera.rotation.x += ( targetRotation - scene.rotation.y ) * 0.05;
      }
      else{
        if (diapositivas[slideNum].lookAt){
          camera.lookAt(diapositivas[slideNum].lookAt);
          cameraLight.lookAt(diapositivas[slideNum].lookAt);
          
        }
        else{
          camera.lookAt(scene.position);//, lookAt, normal);
          cameraLight.lookAt(scene.position);
          //cameraLight.lookAt(scene.position);
        }
      }

       var puntoVisualRocket = new THREE.Vector3( 0, 1000, 1000 );
      puntoVisualRocket.applyQuaternion( camera.quaternion );

      rocket.lookAt(puntoVisualRocket);


      if (pick == segments-1  ||  time - cameraMoveStartTime  > looptime){ // startTime sasaa

       cameraMoveStartTime=null;
        traslating=false;
        onRenderFcts.splice(onRenderFcts.indexOf(navigateTransition),1);
        //camera.position=vectorArray[vectorArray.length-1];//navigateTransition(delta,now);
         if (diapositivas[slideNum].lookAt)
          camera.lookAt(diapositivas[slideNum].lookAt);
        if(typeof(escenaAnterior)!="undefined" && escenaAnterior.transientObjects)
          if (typeof(escenaAnterior) != "undefined"){
            cleanTransientObjects(escenaAnterior);
            cleanSlideTransientObjects(escenaAnterior);
            cleanSlideTransientFunctions(escenaAnterior);
          }
        diapositivas[slideNum].escena(diapositivas[slideNum],diapositivas[slideNum-1]);
        escenaActual.verTexto(escenaActual.diapositiva,0);
        cameraLight.position.set(camera.position.x,camera.position.y,camera.position.z);
        cameraLight.lookAt(diapositivas[slideNum].lookAt || scene.position);

        //scene.remove(cameraLight);
      }

    }

  //transicion de camara

  //var sampleClosedSpline = new THREE.ClosedSplineCurve3(vectorArray);
  var sampleClosedSpline = new THREE.SplineCurve3(vectorArray);
  var binormal = new THREE.Vector3();
  var normal = new THREE.Vector3();
  var segments=100;
  var radiusSegments=3;
  var closed=false;
  var targetRotation=0;
  var tube = new THREE.TubeGeometry(sampleClosedSpline, segments, 0, radiusSegments, closed);
  var escenaAnterior=escenaActual;
  
  var lookAhead=false;
  var puntoVisualLuz = new THREE.Vector3( 0, 0, -1 );
  puntoVisualLuz.applyQuaternion( camera.quaternion );

  cameraLight.position.x = camera.position.x ;
  cameraLight.position.y = camera.position.y ;
  cameraLight.position.z = camera.position.z ; 
  //cameraLight.position.multiplyScalar(1.1);
  cameraLight.lookAt(puntoVisualLuz);
  cameraLight.distance=5*scale;
  scene.add( cameraLight );

  cameraMoveStartTime=null;  
  traslating=true;
  onRenderFcts.unshift(navigateTransition);

//Debug
/*
  camera.position.set(-10,10,-10);
  parent = new THREE.Object3D();
  parent.position.y = 1;
  scene.add( parent );

  addGeometry(tube, 0xff00ff);
  splineCamera = new THREE.PerspectiveCamera( 84, window.innerWidth / window.innerHeight, 0.01, 10 );
  parent.add( splineCamera );

  cameraHelper = new THREE.CameraHelper( splineCamera );
  scene.add( cameraHelper );

  // Debug point

  cameraEye = new THREE.Mesh( new THREE.SphereGeometry( 0.25 ), new THREE.MeshBasicMaterial( { color: 0xdddddd } ) );
  parent.add( cameraEye );
  scene.add( cameraHelper );
*/
 };

