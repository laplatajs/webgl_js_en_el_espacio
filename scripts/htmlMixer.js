
	
	//var updateFcts	= [];
	renderer.setClearColor(new THREE.Color('black'), 0)
	//////////////////////////////////////////////////////////////////////////////////
	//		create THREEx.HtmlMixer						//
	//////////////////////////////////////////////////////////////////////////////////
	var mixerContext= new THREEx.HtmlMixer.Context(renderer, scene, camera)

	// handle window resize for mixerContext
	window.addEventListener('resize', function(){
		mixerContext.rendererCss.setSize( window.innerWidth, window.innerHeight )
	}, false)


	//////////////////////////////////////////////////////////////////////////////////
	//		mixerContext configuration and dom attachement
	//////////////////////////////////////////////////////////////////////////////////

 	// set up rendererCss
	var rendererCss		= mixerContext.rendererCss
	rendererCss.setSize( window.innerWidth, window.innerHeight )
	// set up rendererWebgl
	var rendererWebgl	= mixerContext.rendererWebgl

	//TODO REVISAR PORQUE EN FIREFOX EL PLANO SE VE ANTES QUE LA PANTALLA CSS3D
	var css3dElement		= rendererCss.domElement
	css3dElement.style.position	= 'absolute'
	css3dElement.style.top		= '0px'
	css3dElement.style.width	= '100%'
	css3dElement.style.height	= '100%'
	css3dElement.style.zIndex	= 20
	css3dElement.id="css3dElement"
	document.body.appendChild( css3dElement )
	
	var webglCanvas			= rendererWebgl.domElement
	webglCanvas.style.position	= 'absolute'
	webglCanvas.style.top		= '0px'
	webglCanvas.style.width		= '100%'
	webglCanvas.style.height	= '100%'
	//webglCanvas.style.pointerEvents	= 'inherit'
	css3dElement.appendChild( webglCanvas )
	
	//////////////////////////////////////////////////////////////////////////////////
	//		create a Plane for THREEx.HtmlMixer				//
	//////////////////////////////////////////////////////////////////////////////////
	

	// create the iframe element
	var url		= 'material/pipeline.html';
	var domElement	= document.createElement('iframe')
	domElement.src	= url
	domElement.style.border	= 'none'
	domElement.id ="iframe3d"

	// create the plane
	mixerPlane	= new THREEx.HtmlMixer.Plane(mixerContext, domElement)
	//mixerPlane.object3d.scale.multiplyScalar(scale)
	scene.add(mixerPlane.object3d)


	//////////////////////////////////////////////////////////////////////////////////
	//		Make it move							//
	//////////////////////////////////////////////////////////////////////////////////
	
	// update it
	/*onRenderFcts.push(function(delta, now){
		mixerPlane.object3d.rotation.y += Math.PI * 2 * delta * 0.1;
	})*/

	
	//////////////////////////////////////////////////////////////////////////////////
	//		handle resize							//
	//////////////////////////////////////////////////////////////////////////////////

	function onResize(){
		// notify the renderer of the size change
		renderer.setSize( window.innerWidth, window.innerHeight )
		// update the camera
		camera.aspect	= window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()		
	}
	
	window.addEventListener('resize', onResize, false)

	//////////////////////////////////////////////////////////////////////////////////
	//		render the scene						//
	//////////////////////////////////////////////////////////////////////////////////
	// render the css3d
	onRenderFcts.push(function(delta, now){
		// NOTE: it must be after camera mode
		//camera.updateProjectionMatrix()
		mixerContext.update(delta, now)
	})
	

    function loadPage3D(url){

      document.getElementById("iframe3d").src=url;
      var radio= 1;

      var zCamVec = new THREE.Vector3(0,-0.17-desplazamientoPagina*slideDirection,-radio);
      var position = camera.localToWorld(zCamVec);
  /*
  x = \rho  \sen\phi  \cos\theta \\
  y = \rho  \sen\phi  \sen\theta \\
  z = \rho  \cos\phi
  */
      var xTransf = position.x;
      var yTransf = position.y;//-desplazamientoTexto*slideDirection;
      var zTransf = position.z; 

      mixerPlane.object3d.position.set(xTransf,yTransf,zTransf);
      mixerPlane.object3d.lookAt(new THREE.Vector3(camera.position.x,camera.position.y,camera.position.z));
      mixerPlane.object3d.visible=true;

    }

    function hidePage3D(){
       mixerPlane.object3d.visible=false;
    }

    function deslizarPaginaAlFoco(delta, now){
    if (desplazamientoPagina>0){
      desplazamientoPagina-=delta;
      desplazamientoPagina=Math.max(desplazamientoPagina,0);
      /*mixerPlane.object3d.position.y += delta*slideDirection;
      var pos = camera.position.clone();
      pos.y -=0.15;
      mixerPlane.object3d.lookAt(camera.position);*/
       var phi= Math.PI/32*17 + 
              desplazamientoPagina*slideDirection, //Vertical
        theta=-Math.PI/2,
        radio=1; 
        var x = radio * Math.sin(phi) * Math.cos(theta);
        var z = radio * Math.sin(phi) * Math.sin(theta);
        var y = radio * Math.cos(phi);

        var zCamVec = new THREE.Vector3(x,y,z);
        var position = camera.localToWorld(zCamVec);

        var xTransf = position.x;
        var yTransf = position.y;
        var zTransf = position.z; 
        mixerPlane.object3d.position.set(xTransf,yTransf,zTransf);
        mixerPlane.object3d.lookAt(camera.position);

    }
    else{
        onRenderFcts.splice(onRenderFcts.indexOf(deslizarPaginaAlFoco),1);
        //mixerPlane.object3d.visible=false;
      }

  }