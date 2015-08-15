  //////////////////////////////////////////////////////////////////////////////////
  //    uri api           //
  //////////////////////////////////////////////////////////////////////////////////
  
  function obtainScene(){
    var parser = document.createElement('a');
    parser.href = document.URL;
    //return parseFloat(parser.hash?parser.hash.substring(1, parser.hash.length):0);
    return(parser.hash?parser.hash.substring(1, parser.hash.length):'0');
  };

  function gotoScene(base,desplazamiento,keepNavigationUrl){

    
    if (base<diapositivas.length && base>=0){
      updatePad(base,desplazamiento);
      if (desplazamiento == 0){  //es entero, es escena base

        if (typeof(escenaActual) != "undefined"){
          var path=[];
          if (slideDirection>=0){
            if(typeof(escenaActual.diapositiva) != "undefined"
            && typeof(escenaActual.diapositiva.transitionPath) != "undefined"
            && escenaActual.diapositiva.transitionPath 
            && escenaActual.diapositiva.transitionPath.length){
              path=escenaActual.diapositiva.transitionPath.slice()
            }
          }
          else{
            if(typeof(diapositivas[base]) != "undefined"
            && typeof(diapositivas[base].transitionPath) != "undefined"
            && diapositivas[base].transitionPath 
            && diapositivas[base].transitionPath.length)
               path=diapositivas[base].transitionPath.slice().reverse();
          }
          transitionToNextSlide(path,base);
          escenaActual=new Escena(diapositivas[base]);
        }
        else{
             if(typeof(escenaActual)!="undefined" && escenaActual.transientObjects)
              if (typeof(escenaActual) != "undefined"){
                cleanTransientObjects(escenaActual);
                cleanSlideTransientObjects(escenaActual);
                cleanSlideTransientFunctions(escenaActual);
              }
            escenaActual=new Escena(diapositivas[base]);
            diapositivas[base].escena(diapositivas[base],diapositivas[base-1]);
            escenaActual.verTexto(escenaActual.diapositiva,0);
          }
        if (!keepNavigationUrl)
          updateUrl(base,desplazamiento)
      }
    else{ //se navega dentro del texto
        if (desplazamiento<diapositivas[base].texto.length && desplazamiento>=0){
          if(typeof(escenaActual)=="undefined")
            gotoScene(base,0,true);
           if(escenaActual.transientSlideObjects)
              for (var i = escenaActual.transientSlideObjects.length - 1; i >= 0; i--) {
                var obj= escenaActual.transientSlideObjects[i];
                scene.remove(obj);
                delete(obj);
                escenaActual.transientSlideObjects.splice(i,1);
              };
            escenaActual.verTexto(escenaActual.diapositiva,desplazamiento);
            if (!keepNavigationUrl)
              updateUrl(base,desplazamiento)
        }
        else{
          //fin texto
        }
      }

    }
    else{
      //fin de diapositivas
    } 
  
  };

  function updateUrl(base,desplazamiento){
        var parser = document.createElement('a');
        parser.href = document.URL;
        parser.hash=base+'/'+desplazamiento;
        window.history.pushState(parser.href,"JS",parser.pathname);
        window.location=parser.href;
  }

  function gotoCurrentScene(){
    var currentScene = obtainScene();
    var pointPosition=currentScene.indexOf('/')== -1?currentScene.length:currentScene.indexOf('/');
    var base= parseInt(currentScene.substring(0,pointPosition)); 
    var despl=currentScene.substring(pointPosition+1,currentScene.length)==""?
              0:
              parseInt(currentScene.substring(pointPosition+1,currentScene.length)); 
    gotoScene(base,despl);
  }

  function cleanTransientObjects(escena){
    for (var i = escena.transientObjects.length - 1; i >= 0; i--) {
        var obj= escena.transientObjects[i];
        scene.remove(obj);
        delete(obj);
        escena.transientObjects.splice(i,1);
      };
  }

  function cleanSlideTransientObjects(escena){
    if(typeof(escena)!="undefined" && escena.transientSlideObjects)
        for (var i = escena.transientSlideObjects.length - 1; i >= 0; i--) {
           var obj= escena.transientSlideObjects[i];
           scene.remove(obj);
           delete(obj);
           escena.transientSlideObjects.splice(i,1);
        };
  }
  function cleanSlideTransientFunctions(escena){
    if(typeof(escena)!="undefined" && escena.transientFunctions)
        for (var i = escena.transientFunctions.length - 1; i >= 0; i--) {
           var obj= escena.transientFunctions[i];
           escena.transientFunctions.splice(i,1);
           onRenderFcts.splice(onRenderFcts.indexOf(obj),1);
           delete(obj);
        };
  }

  function updatePad(base,despl){
    //var base= Math.floor(nro);
    //var despl=Math.floor(nro % 1*10);
    //var despl=Math.fround((nro - Math.floor(nro))*10);
    if ( despl == 0)
      pad.getObjectByName("up").material.opacity=0.2;
    else
      pad.getObjectByName("up").material.opacity=1;

    if (base <= 0 )
      pad.getObjectByName("left").material.opacity=0.2;
    else
      pad.getObjectByName("left").material.opacity=1;

     if (base >= diapositivas.length -1 )
      pad.getObjectByName("right").material.opacity=0.2;
    else
      pad.getObjectByName("right").material.opacity=1;

     if (despl >= diapositivas[base].texto.length -1 )
      pad.getObjectByName("down").material.opacity=0.2;
    else
      pad.getObjectByName("down").material.opacity=1;

  };

  (function keyboardNavigation(){
    var keyboard  = new THREEx.KeyboardState(renderer.domElement);
      renderer.domElement.setAttribute("tabIndex", "0");
      renderer.domElement.focus();

  /**
   * ## how to get rid of keyboard auto repeat
   * * keydown is repeated automatically due to keyboard autorepeat
   * * this is an example of how to handle detect keydown without autorepat
   */

  // only on keydown + no repeat
  var wasPressed  = {};
  
  // listen on keyup to maintain ```wasPressed``` array
  keyboard.domElement.addEventListener('keyup', function(event){
    if( keyboard.eventMatches(event, 'left') ){
      wasPressed['left']  = false;
      slideDirection=-1;
       var currentScene = obtainScene();
        var pointPosition=currentScene.indexOf('/')== -1?currentScene.length:currentScene.indexOf('/');
        var base= parseInt(currentScene.substring(0,pointPosition)); 
        var despl=parseInt(currentScene.substring(pointPosition+1,currentScene.length)); 
       gotoScene(base-1,0);  
    }
    if( keyboard.eventMatches(event, 'right') ){
      wasPressed['right'] = false;
      slideDirection=1;
      var currentScene = obtainScene();
      var pointPosition=currentScene.indexOf('/')== -1?currentScene.length:currentScene.indexOf('/');
      var base= parseInt(currentScene.substring(0,pointPosition)); 
      var despl=parseInt(currentScene.substring(pointPosition+1,currentScene.length)); 
       gotoScene(base+1,0);  
    }
     if( keyboard.eventMatches(event, 'down') ){
      wasPressed['down'] = false;
      slideDirection=1;
      var currentScene = obtainScene();
      var pointPosition=currentScene.indexOf('/')== -1?currentScene.length:currentScene.indexOf('/');
      var base= parseInt(currentScene.substring(0,pointPosition)); 
      var despl=parseInt(currentScene.substring(pointPosition+1,currentScene.length)); 
      gotoScene(base,despl +1);  //escene += escena*0.1
    }
     if( keyboard.eventMatches(event, 'up') ){
      wasPressed['up'] = false;
      slideDirection=-1;
      var currentScene = obtainScene();
      var pointPosition=currentScene.indexOf('/')== -1?currentScene.length:currentScene.indexOf('/');
      var base= parseInt(currentScene.substring(0,pointPosition)); 
      var despl=parseInt(currentScene.substring(pointPosition+1,currentScene.length)); 
      gotoScene(base,despl-1);   
    }
    /*if( keyboard.eventMatches(event, 'escape') ){
      wasPressed['escape'] = false;
      thumbnails(); 
    }*/
    
  })
      
  })();

 // window.addEventListener("hashchange", gotoCurrentScene);

 // window.addEventListener("load", gotoCurrentScene);

  

/*  var parser = document.createElement('a');
parser.href = "http://example.com:3000/pathname/?search=test#hash";
 
parser.protocol; // => "http:"
parser.hostname; // => "example.com"
parser.port;     // => "3000"
parser.pathname; // => "/pathname/"
parser.search;   // => "?search=test"
parser.hash;     // => "#hash"
parser.host;     // => "example.com:3000"
*/