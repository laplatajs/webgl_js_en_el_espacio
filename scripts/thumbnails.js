
  thumbnailsVisibles=false;
  function thumbnails(){
    thumbnailsVisibles= !thumbnailsVisibles;
    var texto = null;
    debugger;
    if (thumbnailsVisibles){
    document && (document.getElementById("preview").style.display="inline");
    	populateThumbnails();   
    }
    else
      document && (document.getElementById("preview").style.display="none");
  }

  function populateThumbnails(){
  	 for (var i = 0; i < diapositivas.length; i++) {
          diapositivas[i].escena(diapositivas[i],diapositivas[i-1]);
          for (var j = 0; j < diapositivas[i].texto.length; j++) {
            texto = cargarTexto(diapositivas[i],j);
            renderer.render( scene, camera );
            thumbnail(i,"100%","100%");
            scene.remove(texto);
          };
           renderer.render( scene, camera );
           thumbnail(i);
          //document.getElementById("preview").appendChild(document.createElement("br"));
      };
      gotoCurrentScene();
  }

  function thumbnail(nroEscena,width,height){
    var datImage = renderer.domElement.toDataURL("image/png");
    var img=new Image();
    img.src=datImage;
    img.style.width= width || "25%";
    img.style.height=height || "25%";
    if(typeof(w) == "undefined") 
    	document.getElementById("preview").appendChild(img);
    else
    	postMessage(img);
  }


  function initThumbnailsOnBackground(){

  	var documentWrapper = CircularJSON.stringify(document);// new Object();
  	//documentWrapper.createElement= function dummy(dummyData){};

     //var w = null;
   if(typeof(Worker) !== "undefined") {
        if(typeof(w) == "undefined") {
            w = new Worker("../scripts/thumbnailsWorker.js");
			w.postMessage(documentWrapper);
        }
        w.onmessage = function(img) {
        	debugger;
          console.log("worker msg");
          document.getElementById("preview").appendChild(img);
        };
    } else {
       // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Workers...";
    }
  }