function crearTexto(string,renglon,focalPoint,textColor){

   var height = 0.1,
      size = renglon?0.4:0.7,
      hover = 0.4,
      col=textColor || 0xc19a6b;
      viewPoint=focalPoint || new THREE.Vector3( 0, 0, 0 );

      curveSegments = 5,

      bevelThickness = 0.01,
      bevelSize = renglon?0.02:0.05,
      bevelSegments = 1,
      bevelEnabled = false,

      font = "droid sans", // helvetiker, optimer, gentilis, droid sans, droid serif
      weight = "normal", // normal bold
      style = "normal"; // normal italic

     var texto  = new THREEx.Text(string,{
      size: size,
      height: height,
      curveSegments: curveSegments,

      font: font,
      weight: weight,
      style: style,

      bevelThickness: bevelThickness,
      bevelSize: bevelSize,
      bevelEnabled: bevelEnabled,

      material: 0,
      extrudeMaterial: 1
    });
    
    var saltoDeLinea=renglon?(renglon-1)*size/4:-0.1;
    camera.updateProjectionMatrix();

    var radio= 0.6;

    /*    var zCamVec = new THREE.Vector3(0,0.09-desplazamientoTexto*slideDirection,-radio);
        var position = camera.localToWorld(zCamVec);*/

     //   angulo --> 3/32
    var phi=Math.PI/32*14 + saltoDeLinea - desplazamientoTexto*slideDirection, //Vertical
        theta=-Math.PI/2; //Horizontal
    var x = radio * Math.sin(phi) * Math.cos(theta);
    var z = radio * Math.sin(phi) * Math.sin(theta);
    var y = radio * Math.cos(phi);

    var zCamVec = new THREE.Vector3(x,y,z);
    var position = camera.localToWorld(zCamVec);

    var xTransf = position.x;
    var yTransf = position.y;
    var zTransf = position.z; 

    texto.position.set(xTransf,yTransf,zTransf);

    texto.material = new THREE.MeshLambertMaterial( { color:col,shading: THREE.FlatShading } );
    texto.lookAt(camera.position);
    return texto;

  } 

  function cargarTexto(diapositiva,posicion){
    var pos=posicion||0;
    var textoCargado=[];
    var texto;
    for (var i = 0; diapositiva.texto[pos] && i < diapositiva.texto[pos].length; i++) {
      texto=crearTexto(diapositiva.texto[pos][i],i);
      texto.scale.multiplyScalar(1/10);
      scene.add(texto);
      textoCargado.push(texto);
    };
    return textoCargado;
  };
  

  function oscilarTexto(delta, now){
    if (textoVisible){
      var motion=Math.sin(now)*0.00005;
      for (var i = textoVisible.length - 1; i >= 0; i--) {
          var texto=textoVisible[i];
          texto.position.x+=motion;
          texto.position.y+=motion;
          texto.position.z+=motion;
        }
      };
    };
  function deslizarTextoAlFoco(delta, now){
    if (desplazamientoTexto>0){
      desplazamientoTexto-=delta*2;
      desplazamientoTexto=Math.max(desplazamientoTexto,0);

      for (var i = 0; textoPendiente && i < textoPendiente.length; i++) {
        //textoPendiente[i].position.y += delta*slideDirection;
        var saltoDeLinea=i?(i-1)*size/4:-0.1;
        var phi= Math.PI/32*14 + saltoDeLinea + desplazamientoTexto*slideDirection, //Vertical
        theta=-Math.PI/2,
        radio=0.6; //Horizontal
        var x = radio * Math.sin(phi) * Math.cos(theta);
        var z = radio * Math.sin(phi) * Math.sin(theta);
        var y = radio * Math.cos(phi);

        var zCamVec = new THREE.Vector3(x,y,z);
        var position = camera.localToWorld(zCamVec);

        var xTransf = position.x;
        var yTransf = position.y;
        var zTransf = position.z; 
        var size = i?0.4:0.7;
        
        textoPendiente[i].position.set(xTransf,yTransf,zTransf);
        textoPendiente[i].lookAt(camera.position);
      };
      for (var i = 0; textoVisible && i < textoVisible.length; i++) {
        var saltoDeLinea=i?(i-1)*size/4:-0.1;
        var phi= //Math.PI/32*14 + 
              saltoDeLinea + desplazamientoTexto*slideDirection, //Vertical
        theta=-Math.PI/2,
        radio=0.6; //Horizontal
        var x = radio * Math.sin(phi) * Math.cos(theta);
        var z = radio * Math.sin(phi) * Math.sin(theta);
        var y = radio * Math.cos(phi);

        var zCamVec = new THREE.Vector3(x,y,z);
        var position = camera.localToWorld(zCamVec);

        var xTransf = position.x;
        var yTransf = position.y;
        var zTransf = position.z; 
        var size = i?0.4:0.7;

        //textoVisible[i].position.y += delta*slideDirection;
        textoVisible[i].position.set(xTransf,yTransf,zTransf);
        textoVisible[i].lookAt(camera.position);
      };
      
    }
    else{
        onRenderFcts.splice(onRenderFcts.indexOf(deslizarTextoAlFoco),1);
        for (var i = 0; textoVisible && i < textoVisible.length; i++) {
            var obj= textoVisible[i];
            scene.remove(obj);
            delete(obj);
        };
        textoVisible=textoPendiente;
      }

  }

  desplazamientoOriginalTexto= Math.PI/2;//0.5;
  desplazamientoOriginalPagina=Math.PI/4;//1;
  slideDirection=1;
  textoVisible=null;
  //onRenderFcts.push(oscilarTexto);