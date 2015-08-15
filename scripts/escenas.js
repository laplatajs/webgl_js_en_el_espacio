//TODO HACER QUE LAS ESCENEAS DISPAREN UN EVENTO PARA ASOCIAR LOS NAVIGATION EVENT


  //////////////////////////////////////////////////////////////////////////////////
  //    escenas/diapositivas           //
  //////////////////////////////////////////////////////////////////////////////////

  
(function baseScene(){

/* var geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
 sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

onRenderFcts.push(function(delta, now){


      camera.updateProjectionMatrix();

      var zCamVec = new THREE.Vector3(-1.5,0,-1.5);
      var position = camera.localToWorld(zCamVec);

      sphere.position.set(position.x, position.y, position.z);
      sphere.lookAt(camera.position);

 });*/
  loadLogo();


  loadRocket();
  //rocket=null;
  THREEx.Planets.baseURL="./"
  var starSphere  = THREEx.Planets.createStarfield();
  starSphere.scale.set(scale, scale, scale);
  scene.add(starSphere)
  loadPad();

  pointLight = new THREE.PointLight( 0xffffff, 2.5,0.9 );
  //cameraLight = new THREE.PointLight( 0xffffff, 2.5,0.5 );
  cameraLight = new THREE.PointLight( 0xffffff, 2 ,5*scale );
  scene.add(cameraLight);
  //scene.add(pointLight);

})()

function loadRocket(){
  var loader = new THREE.OBJMTLLoader();
        loader.load( 'models/obj/probe.obj', 'models/obj/probe.mtl',function( geometry,mat ) {
        mesh = geometry;//new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(mat));
        //mesh.scale.set( scale/10, scale/10, scale/10 );
        mesh.scale.multiplyScalar( 1/6 );
        mesh.lookAt(camera.position);
        //mesh.rotation.x=Math.PI/4;
        //mesh.rotation.z=Math.PI/4;
        scene.add( mesh );
        viewPoint= scene.position;

        rocket=mesh;

       particleGroup = new SPE.Group({
            texture: THREE.ImageUtils.loadTexture('./images/smokeparticle.png'),
            maxAge: 2
          });

          emitter = new SPE.Emitter({
            type: 'sphere',
            radius:0.05,
            speed: 0,
            speedSpread: 0,
            position: new THREE.Vector3(0, 0, 0),
            positionSpread: new THREE.Vector3( 0.25, 0, 0.25),

            acceleration: new THREE.Vector3(0, -0.15, 0),
            accelerationSpread: new THREE.Vector3( -0.05, 0, -0.05 ),

            velocity: new THREE.Vector3(-0.5, -0.5, 0),
            velocitySpread: new THREE.Vector3(-0.15, -0.15, -0.15),

            colorStart: new THREE.Color('blue'),
            colorEnd: new THREE.Color('yellow'),

            sizeStart: 0.5,
            sizeEnd: 0,

            particleCount: 600
          });

          particleGroup.addEmitter( emitter );
          scene.add( particleGroup.mesh );
  
        onRenderFcts.push(function moveRocket(delta, now){
           
          mesh.rotateY( delta);

          camera.updateProjectionMatrix();

          var zCamVec = traslating?new THREE.Vector3(0,-0.1,-1):new THREE.Vector3(-0.9,0,-2);
          var position = camera.localToWorld(zCamVec);

          mesh.position.copy(position);

          emitter.position.copy(position);
          var positionAux=position.multiplyScalar(traslating?1/100:1/1000);

          if (traslating)mesh.lookAt(scene.position);

          emitter.velocity.copy(positionAux);
          emitter.velocitySpread.copy(positionAux);
          //particleGroup.mesh.lookAt(positionAux);
           particleGroup.tick( delta );
        })
    });
}

function changeEngineColor(engine,hexColor){
  var engineChildren=engine.children;
  var mat=new THREE.MeshPhongMaterial( { 
      color: hexColor || 0xff0000, 
      shading: THREE.FlatShading,
      vertexColors: THREE.VertexColors 
  });

  for(var i=0;i<engineChildren.length;i++){
    if (!engineChildren[i].material.map) // evita pisar texturas
      engineChildren[i].material=mat;
  }
}
function handleEngineColors(delta, now){
      if (lastRefresh>0.5){
        for (var i = 0; i < unsupportedEngines.length; i++) {
          changeEngineColor(unsupportedEngines[i],colorTurn?color1:color2);
        };
        
        lastRefresh=0;
        colorTurn= ++colorTurn % 2;
      }
      else
        lastRefresh+=delta;
  }

function alternateEngineColor(hexColor1,hexColor2){ //TODO AGREGAR A LA COLA DE RENDERING CON ALGUNA FORMA DE ALTERNAR I
  lastRefresh=0,colorTurn=0,color1=hexColor1,color2=hexColor2;
  onRenderFcts.push(handleEngineColors);
  escenaActual.transientFunctions.push(handleEngineColors);
}

  function loadLogo(){
    var loader = new THREE.JSONLoader();

    loader.load( "models/json/logo.json", function( geometry,mat ) {
        logo = new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(mat));
        logo.scale.set( scale, scale, scale );
        logo.rotation.x=-Math.PI/2;
        logo.receiveShadow  = true;
        scene.add( logo );
        camera.lookAt( logo.position );
    },"textures/" );
  };

  function adjustLogo(){
    if (logo.scale.z<1){
      onRenderFcts.push(adjustLogoHelper);
    }
  };

  function adjustLogoHelper(delta, now){
     if (logo.scale.z<scale){
      logo.scale.z+=delta;
    }
    else
      onRenderFcts.splice(onRenderFcts.indexOf(adjustLogoHelper),1);


  }

function loadPad(){
   var loader = new THREE.ObjectLoader();
        //loader.texturePath="../"
        correccionPad=0;
        loader.load( 'models/json/pad.json', 
          function ( geometry, materials) {;
            scene.add( geometry );
            pad=geometry;
            geometry.scale.multiplyScalar(1/6);
            scene.add( geometry );

            onRenderFcts.push(function(delta, now){

                  camera.updateProjectionMatrix();

                  var zCamVec = new THREE.Vector3(1,-0.5,-2);
                  var position = camera.localToWorld(zCamVec);
                   var motion=Math.sin(now)*0.02;
      
                  geometry.position.set(position.x+motion, position.y+motion, position.z+motion);
                  geometry.lookAt(camera.position);
                  geometry.rotateX(Math.PI/2);
                  geometry.rotateY(correccionPad);
                 // geometry.rotateY(Math.PI/2);

             });

        } );
  };

  function earthAndMoon(){

  function rotateEarth(delta, now){
    earthCloud.rotation.y += 1/8 * delta;  
    earthMesh.rotation.y += 1/16 * delta;   
  }

  var light = new THREE.DirectionalLight( 0xffffff, 2.5 )
  light.position.set(-15,-10,15)
  scene.add( light )
  light.castShadow  = true
  light.shadowCameraNear  = 0.01
  light.shadowCameraFar = 15
  light.shadowCameraFov = 45

  light.shadowCameraLeft  = -1
  light.shadowCameraRight =  1
  light.shadowCameraTop =  1
  light.shadowCameraBottom= -1
  // light.shadowCameraVisible  = true

  light.shadowBias  = 0.1
  light.shadowDarkness  = 0.2

  light.shadowMapWidth  = 1024
  light.shadowMapHeight = 1024

  var containerEarth  = new THREE.Object3D();
  containerEarth.rotateX(-20 * Math.PI/180);
  containerEarth.position.set (10,0,10);
  containerEarth.position.multiplyScalar(scale);
  scene.add(containerEarth);
  moonMesh  = THREEx.Planets.createMoon();
  moonMesh.material.bumpMap= THREE.ImageUtils.loadTexture('./images/moonbump1kJS.jpg')
  moonMesh.material.map= THREE.ImageUtils.loadTexture('./images/moonmap1kJS.jpg')
  moonMesh.position.set(0.8,-0.1,0.5);
  moonMesh.position.multiplyScalar(scale);
  moonMesh.scale.multiplyScalar(1/5*scale);
  moonMesh.receiveShadow  = true;
  moonMesh.castShadow = true;
  moonMesh.rotateY(Math.PI*14/8);
  moonMesh.rotateZ(-Math.PI/6);
  containerEarth.add(moonMesh);

  var earthMesh = THREEx.Planets.createEarth()
  earthMesh.receiveShadow = true
  earthMesh.castShadow  = true
  earthMesh.scale.multiplyScalar(scale);
  //earthMesh.position.set(scale,scale,scale);
  containerEarth.add(earthMesh)
 
  var geometry  = new THREE.SphereGeometry(0.5, 32, 32)
  var material  = THREEx.createAtmosphereMaterial()
  material.uniforms.glowColor.value.set(0x00b3ff)
  material.uniforms.coeficient.value  = 0.8
  material.uniforms.power.value   = 2.0
  var mesh  = new THREE.Mesh(geometry, material );
  mesh.scale.multiplyScalar(1.01*scale);
  containerEarth.add( mesh );
  // new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

  var geometry  = new THREE.SphereGeometry(0.5, 32, 32)
  var material  = THREEx.createAtmosphereMaterial()
  material.side = THREE.BackSide
  material.uniforms.glowColor.value.set(0x00b3ff)
  material.uniforms.coeficient.value  = 0.5
  material.uniforms.power.value   = 4.0
  var mesh  = new THREE.Mesh(geometry, material );
  mesh.scale.multiplyScalar(1.15*scale);
  containerEarth.add( mesh );
  // new THREEx.addAtmosphereMaterial2DatGui(material, datGUI)

  var earthCloud  = THREEx.Planets.createEarthCloud()
  earthCloud.receiveShadow  = true
  earthCloud.castShadow = true
  earthCloud.scale.multiplyScalar(scale);
  containerEarth.add(earthCloud);
  onRenderFcts.push(rotateEarth);

  escenaActual.transientFunctions.push(rotateEarth);
  escenaActual.transientObjects.push(light);
  escenaActual.transientObjects.push(containerEarth);

  return containerEarth;

  }

  thumbnailsVisibles=false;
  function thumbnails(){
    thumbnailsVisibles= !thumbnailsVisibles;
    if (thumbnailsVisibles){
      for (var i = 0; i < diapositivas.length; i++) {
          diapositivas[i].escena(diapositivas[i],diapositivas[i-1]);
          renderer.render( scene, camera );
          thumbnail(i);      
      };
      gotoCurrentScene();
      document.getElementById("preview").style.display="inline";
    }
    else
      document.getElementById("preview").style.display="none";

  }

  function thumbnail(nroEscena){
    //diapositivas[nroEscena].escena(diapositivas[nroEscena],diapositivas[nroEscena-1]);
    var datImage = renderer.domElement.toDataURL("image/png");
    var img=document.createElement("img");
    img.src=datImage;
    img.style.width="25%";
    img.style.height="25%";
    document.getElementById("preview").appendChild(img);
  }

  function verTexto(diapositiva,pos,isStatic){
    
    desplazamientoTexto= (typeof isStatic !="undefined" && isStatic)?0.01: desplazamientoOriginalTexto;
    desplazamientoPagina = (typeof isStatic !="undefined" && isStatic)?0.01: desplazamientoOriginalPagina;
    textoPendiente = cargarTexto(diapositiva,pos);
    if (diapositiva.funcionesTexto && diapositiva.funcionesTexto[pos])
       diapositiva.funcionesTexto[pos].load();
     else
      hidePage3D();

    if (typeof isStatic !="undefined" && isStatic)
        deslizarTextoAlFoco(0.01,0);
    else
        onRenderFcts.push(deslizarTextoAlFoco);
    }

  var Escena=function(diapositiva){
    this.diapositiva=diapositiva;
    this.transientObjects=[];
    textoVisible=null;
    this.transientSlideObjects=[];
  }

  Escena.prototype = {
  diapositiva:{},
  transientObjects:[],
  transientFunctions:[],
  transientSlideObjects:[],
  verTexto: verTexto
  };

  function inicial(diapositiva,diapositivaAnterior){
    var pos=diapositiva.transitionPath[0];
    camera.position.set(pos.x,pos.y,pos.z);
     if (diapositiva.lookAt)
          camera.lookAt(diapositiva.lookAt);
    correccionPad=Math.PI/2;
  };


  function escena0(diapositiva,diapositivaAnterior){
    $("#btnLinks").hide();
    adjustLogo();
    containerEarth=earthAndMoon();

    var pos=diapositiva.transitionPath[0];
    camera.position.set(pos.x,pos.y,pos.z);
     if (diapositiva.lookAt)
          camera.lookAt(diapositiva.lookAt);

    camera.lookAt( containerEarth.position);
     
    var puntoVisual = new THREE.Vector3( 0, 0, -1 );
    puntoVisual.applyQuaternion( camera.quaternion );
    
 
    //pointLight = new THREE.PointLight( 0xffffff, 2,1.5 );
    //pointLight.position.copy( camera.position );
    //scene.add(pointLight);
    //pointLight.lookAt(puntoVisual);
    //pointLight.lookAt(containerEarth.position);*/
    cameraLight.distance=3;
    cameraLight.position.copy(camera.position);
  
  }; 
  function commonScene(diapositiva,diapositivaAnterior){

    $("#btnLinks").hide(500);

    setCameraToLastTransitionPoint(diapositivaAnterior);

    if (typeof(logo)=="undefined")
      loadLogo();
    else{
      adjustLogo();
      camera.lookAt( logo.position );
    }
  
    var puntoVisual = new THREE.Vector3( 0, 0, -2 );
    puntoVisual.applyQuaternion( camera.quaternion );
    (typeof rocket !="undefined")&& rocket.lookAt(puntoVisual);

  }

  function escena1(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;
    
    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/usarocket.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(4,2.6, 1.8));
        mesh.position.multiplyScalar(scale)
        mesh.scale.multiplyScalar(1/2);
        mesh.rotateY(Math.PI/2);
        escenaActual.transientObjects.push(mesh);
        scene.add( mesh );
    } );
}

  function escena2(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/nave.json", function( mesh,mat ) {

        mesh.position.copy(new THREE.Vector3(-0.3,3, 6));
        mesh.position.multiplyScalar(scale);
        mesh.scale.multiplyScalar(1/8);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        escenaActual.transientObjects.push(mesh);
        scene.add( mesh );
    } );

  };

  function escena3(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/satelite.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(3.5,3, -1.5));
        mesh.position.multiplyScalar(scale);
        //mesh.scale.multiplyScalar(1/8);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );


  };

  function escena4(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/satelite2.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-3.8,4, -1.8));
        mesh.position.multiplyScalar(scale);
        mesh.scale.multiplyScalar(2);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );
    

  };

  function escena5(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/satelite3.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-5,4, 0.5));
        mesh.position.multiplyScalar(scale);
        //mesh.scale.multiplyScalar(2);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        mesh.castShadow=true;
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );
    

  };

  function escena6(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    var loader = new THREE.ObjectLoader();

    loader.load( "models/json/satelite4.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(2.5,4.5, -5));
        mesh.position.multiplyScalar(scale);
        //mesh.scale.multiplyScalar(2);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        mesh.castShadow=true;
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );
    

  };


  function escena7(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/3;

     var loader = new THREE.OBJMTLLoader();
        loader.load( 'models/obj/apollo.obj', 'models/obj/apollo.mtl',function( geometry,mat ) {
        var mesh = geometry;
        mesh.position.set(0.7,4.5, -1.7);
        mesh.position.multiplyScalar(scale);
        escenaActual.transientObjects.push(mesh);
        mesh.traverse( function( node ) {
              if( node.material ) {
                  node.material.side = THREE.DoubleSide;
              }
          });
        scene.add( mesh );
      });

  };

  function escena8(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

     var Mesh  = THREEx.Planets.createMercury();
    Mesh.position.set(2.5,5.5, -0.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/3*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    escenaActual.transientObjects.push(Mesh);
    scene.add(Mesh);
  
    

  };

  function escena9(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/8;

    var loader = new THREE.OBJMTLLoader();
        loader.load( 'models/obj/lunar.obj', 'models/obj/lunar.mtl',function( geometry,mat ) {
        lunarmesh = geometry;
        lunarmesh.position.set(-2,3.5, 2.7);
        lunarmesh.position.multiplyScalar(scale);

        lunarmesh.traverse( function( node ) {
              if( node.material ) {
                  node.material.side = THREE.DoubleSide;
              }
          });
        escenaActual.transientObjects.push(lunarmesh);
        scene.add( lunarmesh );
      });

  };   

  function escena10(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

     var Mesh  = THREEx.Planets.createVenus();
    Mesh.position.set(-3,6, 2);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    escenaActual.transientObjects.push(Mesh);
    scene.add(Mesh);

  };

  function escena11(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

     var Mesh  = THREEx.Planets.createMars();
    Mesh.position.set(3,5.5, 2);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    escenaActual.transientObjects.push(Mesh);
    scene.add(Mesh);

  };    

  function escena12(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/2;

     var Mesh  = THREEx.Planets.createMars();
    Mesh.position.set(1.5,6, 0.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    escenaActual.transientObjects.push(Mesh);
    scene.add(Mesh);

  };   
   function escena13(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/3;

    var loader = new THREE.OBJMTLLoader();
        loader.load( 'models/obj/stowed.obj', 'models/obj/stowed.mtl',function( geometry,mat ) {
         lunarmesh = geometry;
        lunarmesh.position.set(2,6, 2.5);
        lunarmesh.position.multiplyScalar(scale);
        lunarmesh.lookAt(camera.position);
        lunarmesh.traverse( function( node ) {
              if( node.material ) {
                  node.material.side = THREE.DoubleSide;
              }
          });
        escenaActual.transientObjects.push(lunarmesh);
        function anim(delta,now){
            lunarmesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
        scene.add( lunarmesh );
      });

  };  
   function escena14(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    Mesh  = THREEx.Planets.createJupiter();
    Mesh.position.set(-1.1,7, 2);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    escenaActual.transientObjects.push(Mesh);
    scene.add(Mesh);

  };  

   function escena15(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

    /*var Mesh  = THREEx.Planets.createJupiter();
    Mesh.position.set(-0.5,7.5, 1.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    scene.add(Mesh);*/

  };

  function escena16(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);;

   /* var Mesh  = THREEx.Planets.createSaturn();
    Mesh.position.set(0.5,7.5, 5.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    scene.add(Mesh);
    var Mesh2  = THREEx.Planets.createSaturnRing();
    Mesh2.position.set(0.5,7.5, 5.5);
    Mesh2.position.multiplyScalar(scale);
    Mesh2.scale.multiplyScalar(1/2*scale);
    Mesh2.receiveShadow  = true;
    Mesh2.castShadow = true;
    Mesh2.lookAt(camera.position);
    scene.add(Mesh2);*/

     var loader = new THREE.OBJMTLLoader();
        loader.load( 'models/obj/cassini.obj', 'models/obj/cassini.mtl',function( geometry,mat ) {
        var mesh = geometry;//new THREE.SkinnedMesh(geometry, new THREE.MeshFaceMaterial(mat));
        //mesh.scale.set( scale/10, scale/10, scale/10 );
        mesh.scale.multiplyScalar( 2/3 );
        //mesh.lookAt(camera.position);
        mesh.position.set(0.5,8, 5.3)
        mesh.position.multiplyScalar(scale);

        mesh.rotation.y=Math.PI/4;
        mesh.rotation.z=-Math.PI/4;
        escenaActual.transientObjects.push(mesh);
        scene.add( mesh );
      });
  };  

  function escena17(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/2;

    var loader = new THREE.ObjectLoader();
     loader.load( "models/json/asteroide1.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-0.3,8.5, -2.3));
        mesh.position.multiplyScalar(scale);
        //mesh.scale.multiplyScalar(2);
        mesh.castShadow=true;
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );
    /*var Mesh  = THREEx.Planets.createUranus();
    Mesh.position.set(0.5,7.5, 5.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    scene.add(Mesh);
    var Mesh2  = THREEx.Planets.createUranusRing();
    Mesh2.position.set(0.5,7.5, 5.5);
    Mesh2.position.multiplyScalar(scale);
    Mesh2.scale.multiplyScalar(1/2*scale);
    Mesh2.receiveShadow  = true;
    Mesh2.castShadow = true;
    Mesh2.lookAt(camera.position);
    scene.add(Mesh2);*/

  };  

  function escena18(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/2;

    var loader = new THREE.ObjectLoader();
     loader.load( "models/json/asteroide1.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-1.8,9, -1));
        mesh.position.multiplyScalar(scale);
        //mesh.scale.multiplyScalar(1/50);
        mesh.scale.x*=0.8;
        mesh.scale.y*=0.5;
        mesh.castShadow=true;
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );

    /*var Mesh  = THREEx.Planets.createNeptune();
    Mesh.position.set(0.5,7.5, 5.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    scene.add(Mesh);*/

  };  

  function escena19(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/2;

    var loader = new THREE.ObjectLoader();
     loader.load( "models/json/asteroide3.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-1.5,9, -3.5));
        mesh.position.multiplyScalar(scale);
        mesh.scale.multiplyScalar(1/20);
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
        function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );

    /*var Mesh  = THREEx.Planets.createPluto();
    Mesh.position.set(0.5,7.5, 5.5);
    Mesh.position.multiplyScalar(scale);
    Mesh.scale.multiplyScalar(1/2*scale);
    Mesh.receiveShadow  = true;
    Mesh.castShadow = true;
    Mesh.lookAt(camera.position);
    scene.add(Mesh);*/

  };  
  function escena20(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    var loader = new THREE.ObjectLoader();
     loader.load( "models/json/asteroide4.json", function( mesh,mat ) {
        mesh.position.copy(new THREE.Vector3(-2.8,10, -1.8));
        mesh.position.multiplyScalar(scale);
        mesh.scale.multiplyScalar(1/20);
        mesh.rotateY(Math.PI/4);
        mesh.rotateZ(Math.PI/4);
        mesh.rotateX(-Math.PI/4);
        mesh.castShadow=true;
        scene.add( mesh );
        escenaActual.transientObjects.push(mesh);
       function anim(delta,now){
            mesh.rotation.x += delta/2;
            mesh.rotation.y += delta/2;
        }
        escenaActual.transientFunctions.push(anim);
        onRenderFcts.push(anim);
    } );


  };  
  function escena21(diapositiva,diapositivaAnterior){
    commonScene(diapositiva,diapositivaAnterior);
    correccionPad=Math.PI/4;
    SunMesh  = THREEx.Planets.createSun();
    SunMesh.position.set(-0.6,10, -5);
    SunMesh.position.multiplyScalar(scale);
    SunMesh.scale.multiplyScalar(2/3*scale);
    SunMesh.receiveShadow  = true;
    SunMesh.castShadow = true;
    SunMesh.lookAt(camera.position);
    scene.add(SunMesh);
    addAmbientLight();
    cameraLight.color=new THREE.Color('black');
    cameraLight.distance=2;
  };  

  //metaballs(pos);

  function escena22(diapositiva,diapositivaAnterior){
  correccionPad=Math.PI;
  setCameraToLastTransitionPoint(diapositivaAnterior);
    camera.lookAt( logo.position );
    //pointLight.position.copy( camera.position );
    //pointLight.lookAt(logo.position);
    //pointLight.distance=100;
    //pointLight.intensity=2.5;
    onRenderFcts.push(escalaLogo);
  };
  function escalaLogo(delta,now){

    if (logo.scale.z>0.02){
        logo.scale.z-=delta;
        cameraLight.distance+=delta*100;
    }
    else
      onRenderFcts.splice(onRenderFcts.indexOf(escalaLogo),1);
  }

  function metaballs(pos){
    var axisMin = -5;
    var axisMax =  5;
    var axisRange = axisMax - axisMin;
    
    //scene.add( new THREE.AxisHelper(axisMax) );
    
    // The Marching Cubes Algorithm draws an isosurface of a given value.
    // To use this for a Metaballs simulation, we need to:
    // (1) Initialize the domain - create a grid of size*size*size points in space
    // (2) Initialize the range  - a set of values, corresponding to each of the points, to zero.
    // (3) Add 1 to values array for points on boundary of the sphere;
    //       values should decrease to zero quickly for points away from sphere boundary.
    // (4) Repeat step (3) as desired
    // (5) Implement Marching Cubes algorithm with isovalue slightly less than 1.
    
    var size  = 30; 
    var size2 = size*size; 
    var size3 = size*size*size;
    
    var points = [];
    
    // generate the list of 3D points
    for (var k = 0; k < size; k++)
    for (var j = 0; j < size; j++)
    for (var i = 0; i < size; i++)
    {
      var x = axisMin + axisRange * i / (size - 1);
      var y = axisMin + axisRange * j / (size - 1);
      var z = axisMin + axisRange * k / (size - 1);
      points.push( new THREE.Vector3(x,y,z) );
    }
    
      var values = [];
    // initialize values
    for (var i = 0; i < size3; i++) 
      values[i] = 0;
     
    // resetValues();
    addBall( points, values, new THREE.Vector3(0,3.5,0));
    addBall( points, values, new THREE.Vector3(0,0,0));
    addBall( points, values, new THREE.Vector3(-1,-1,0));
    
    // isolevel = 0.5;
    var geometry = marchingCubes( points, values, 0.5 );
    
    //debugger;
   // var colorMaterial =  new THREE.MeshPhongMaterial( {color: 0x444444, side:THREE.DoubleSide} );
    var colorMaterial = new THREE.MeshPhongMaterial( { color: 0x444444, specular: 0x111111, shininess: 1, side:THREE.DoubleSide } )
    colorMaterial.map= THREE.ImageUtils.loadTexture('./images/marsmap1k.jpg');
    colorMaterial.map= THREE.ImageUtils.loadTexture('./images/marsbump1k.jpg');    
    colorMaterial.map= THREE.ImageUtils.loadTexture('./images/marsbump1k.jpg');
    var mesh = new THREE.Mesh( geometry, colorMaterial );
    mesh.position.copy(pos);
    scene.add(mesh);

     // bubbles like to move around
    this.ballUpdate = function(delta,now)
    {
      //delta=t/2;
      resetValues( values );
      addBall( points, values, new THREE.Vector3( 2.0 * Math.cos(1.1 * now), 1.5 * Math.sin(1.6 * now), 3.0 * Math.sin(1.0 * now) ) );
      addBall( points, values, new THREE.Vector3( 2.4 * Math.sin(1.8 * now), 1.5 * Math.sin(1.3 * now), 1.9 * Math.cos(1.9 * now) ) );
      addBall( points, values, new THREE.Vector3( 3.0 * Math.cos(1.5 * now), 2.5 * Math.cos(1.2 * now), 2.1 * Math.sin(1.7 * now) ) );

      //addBall( points, values, new THREE.Vector3( 2.0 * Math.cos( now), 1.5 * Math.sin( now), 3.0 * Math.sin( now) ) );
      //addBall( points, values, new THREE.Vector3( 2.4 * Math.sin( now), 1.5 * Math.sin( now), 1.9 * Math.cos( now) ) );
      //addBall( points, values, new THREE.Vector3( 3.0 * Math.cos( now), 2.5 * Math.cos( now), 2.1 * Math.sin( now) ) );
        
      scene.remove( mesh );
      var newGeometry = marchingCubes( points, values, 0.5 );
      mesh = new THREE.Mesh( newGeometry, colorMaterial );
      mesh.position.copy(pos);
      scene.add( mesh );
    }

    onRenderFcts.push(this.ballUpdate);
    
  }

// METABALLS FUNCTIONS

function resetValues( values )
{
    for (var i = 0; i < values.length; i++)
    values[i] = 0;
}

  // add values corresponding to a ball with radius 1 to values array
function addBall(points, values, center)
{
  for (var i = 0; i < values.length; i++)
  {
    var OneMinusD2 = 1.0 - center.distanceToSquared( points[i] );
    values[i] += Math.exp( -(OneMinusD2 * OneMinusD2) );
  }
}


// MARCHING CUBES ALGORITHM
// parameters: domain points, range values, isolevel 
// returns: geometry
function marchingCubes( points, values, isolevel )
{
  // assumes the following global values have been defined: 
  //   THREE.edgeTable, THREE.triTable
  
  var size = Math.round(Math.pow(values.length, 1/3));
  var size2 = size * size;
  var size3 = size * size * size;
  
  // Vertices may occur along edges of cube, when the values at the edge's endpoints
  //   straddle the isolevel value.
  // Actual position along edge weighted according to function values.
  var vlist = new Array(12);
  
  var geometry = new THREE.Geometry();
  var vertexIndex = 0;
  
  for (var z = 0; z < size - 1; z++)
  for (var y = 0; y < size - 1; y++)
  for (var x = 0; x < size - 1; x++)
  {
    // index of base point, and also adjacent points on cube
    var p    = x + size * y + size2 * z,
      px   = p   + 1,
      py   = p   + size,
      pxy  = py  + 1,
      pz   = p   + size2,
      pxz  = px  + size2,
      pyz  = py  + size2,
      pxyz = pxy + size2;
    
    // store scalar values corresponding to vertices
    var value0 = values[ p    ],
      value1 = values[ px   ],
      value2 = values[ py   ],
      value3 = values[ pxy  ],
      value4 = values[ pz   ],
      value5 = values[ pxz  ],
      value6 = values[ pyz  ],
      value7 = values[ pxyz ];
    
    // place a "1" in bit positions corresponding to vertices whose
    //   isovalue is less than given constant.
    
    var cubeindex = 0;
    if ( value0 < isolevel ) cubeindex |= 1;
    if ( value1 < isolevel ) cubeindex |= 2;
    if ( value2 < isolevel ) cubeindex |= 8;
    if ( value3 < isolevel ) cubeindex |= 4;
    if ( value4 < isolevel ) cubeindex |= 16;
    if ( value5 < isolevel ) cubeindex |= 32;
    if ( value6 < isolevel ) cubeindex |= 128;
    if ( value7 < isolevel ) cubeindex |= 64;
    
    // bits = 12 bit number, indicates which edges are crossed by the isosurface
    var bits = THREE.edgeTable[ cubeindex ];
    
    // if none are crossed, proceed to next iteration
    if ( bits === 0 ) continue;
    
    // check which edges are crossed, and estimate the point location
    //    using a weighted average of scalar values at edge endpoints.
    // store the vertex in an array for use later.
    var mu = 0.5; 
    
    // bottom of the cube
    if ( bits & 1 )
    {   
      mu = ( isolevel - value0 ) / ( value1 - value0 );
      vlist[0] = points[p].clone().lerp( points[px], mu );
    }
    if ( bits & 2 )
    {
      mu = ( isolevel - value1 ) / ( value3 - value1 );
      vlist[1] = points[px].clone().lerp( points[pxy], mu );
    }
    if ( bits & 4 )
    {
      mu = ( isolevel - value2 ) / ( value3 - value2 );
      vlist[2] = points[py].clone().lerp( points[pxy], mu );
    }
    if ( bits & 8 )
    {
      mu = ( isolevel - value0 ) / ( value2 - value0 );
      vlist[3] = points[p].clone().lerp( points[py], mu );
    }
    // top of the cube
    if ( bits & 16 )
    {
      mu = ( isolevel - value4 ) / ( value5 - value4 );
      vlist[4] = points[pz].clone().lerp( points[pxz], mu );
    }
    if ( bits & 32 )
    {
      mu = ( isolevel - value5 ) / ( value7 - value5 );
      vlist[5] = points[pxz].clone().lerp( points[pxyz], mu );
    }
    if ( bits & 64 )
    {
      mu = ( isolevel - value6 ) / ( value7 - value6 );
      vlist[6] = points[pyz].clone().lerp( points[pxyz], mu );
    }
    if ( bits & 128 )
    {
      mu = ( isolevel - value4 ) / ( value6 - value4 );
      vlist[7] = points[pz].clone().lerp( points[pyz], mu );
    }
    // vertical lines of the cube
    if ( bits & 256 )
    {
      mu = ( isolevel - value0 ) / ( value4 - value0 );
      vlist[8] = points[p].clone().lerp( points[pz], mu );
    }
    if ( bits & 512 )
    {
      mu = ( isolevel - value1 ) / ( value5 - value1 );
      vlist[9] = points[px].clone().lerp( points[pxz], mu );
    }
    if ( bits & 1024 )
    {
      mu = ( isolevel - value3 ) / ( value7 - value3 );
      vlist[10] = points[pxy].clone().lerp( points[pxyz], mu );
    }
    if ( bits & 2048 )
    {
      mu = ( isolevel - value2 ) / ( value6 - value2 );
      vlist[11] = points[py].clone().lerp( points[pyz], mu );
    }
    
    // construct triangles -- get correct vertices from triTable.
    var i = 0;
    cubeindex <<= 4;  // multiply by 16... 
    // "Re-purpose cubeindex into an offset into triTable." 
    //  since each row really isn't a row.
     
    // the while loop should run at most 5 times,
    //   since the 16th entry in each row is a -1.
    while ( THREE.triTable[ cubeindex + i ] != -1 ) 
    {
      var index1 = THREE.triTable[cubeindex + i];
      var index2 = THREE.triTable[cubeindex + i + 1];
      var index3 = THREE.triTable[cubeindex + i + 2];
      
      geometry.vertices.push( vlist[index1].clone() );
      geometry.vertices.push( vlist[index2].clone() );
      geometry.vertices.push( vlist[index3].clone() );
      var face = new THREE.Face3(vertexIndex, vertexIndex+1, vertexIndex+2);
      geometry.faces.push( face );

      geometry.faceVertexUvs[ 0 ].push( [ new THREE.Vector2(0,0), new THREE.Vector2(0,1), new THREE.Vector2(1,1) ] );

      vertexIndex += 3;
      i += 3;
    }
  }
  
  geometry.mergeVertices();
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();
  
  return geometry;
}