diapositivas=[
	{
		"escena":escena0,
		"texto":[[],["WebGL","","JS","en el","espacio","(3D)"],["Temario","","Web GL","GLSL/Shaders","ThreeJS",]],
		"transitionPath": [
		      new THREE.Vector3(11, 0, 11).multiplyScalar(scale),
		      new THREE.Vector3(15, 3, 15).multiplyScalar(scale),
		      new THREE.Vector3(17,5, 10).multiplyScalar(scale),
		      new THREE.Vector3(18,4, 7).multiplyScalar(scale),
		      new THREE.Vector3(10,3.5,4).multiplyScalar(scale),
		      new THREE.Vector3(6.2,4, 3).multiplyScalar(scale)
		    ],
		 "tags":["Intro"]
	},
	{
		"escena":escena1,
		"texto":[[],["¿qué es WebGL?",'API "alto" nivel',"Principalmente, diseño 3D","Alto rendimiento","GPU"],
			['WebGL es "3d?"',"Api para dibujar px","Pipeline","Proc. paralelo GPU"]],
		"transitionPath": [
		       new THREE.Vector3(6.2,4, 3).multiplyScalar(scale),
		      new THREE.Vector3(6,4, 8).multiplyScalar(scale),
		      new THREE.Vector3(3,4, 10).multiplyScalar(scale),
		      new THREE.Vector3(0,4, 12).multiplyScalar(scale),
		      new THREE.Vector3(-6,4, 12).multiplyScalar(scale),
		      new THREE.Vector3(-0.75,4, 7.5).multiplyScalar(scale)
		    ],
		 "tags":["Intro"]
	},
	{
		"escena":escena2,
		"texto":[[],["GPU", "HW especializado","en graficar","Buffer de video"],
			["Características", "Arq paralela real","alta performance/costo",'"Bajo" consumo'],
			["CPU vs GPU"],
			["Arq CPU"],
			["Arq GPU"],
			],
		"funcionesTexto":{
			3:{
				"load":function(){
							loadPage3D("./material/cpuVSgpu.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			4:{
				"load":function(){
							loadPage3D("./material/cpu.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			5:{
				"load":function(){
							loadPage3D("./material/gpu.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
		},
		"transitionPath": [
		      new THREE.Vector3(-0.75,4, 7.5).multiplyScalar(scale),
		      new THREE.Vector3(2,4, 8.5).multiplyScalar(scale),
		      new THREE.Vector3(4,4, 9).multiplyScalar(scale),
		      new THREE.Vector3(10,4, 8).multiplyScalar(scale),
		      new THREE.Vector3(8,4, 5).multiplyScalar(scale),
		      new THREE.Vector3(5.5,3.7, -2.5).multiplyScalar(scale)
		    ],
		 "tags":["Intro"]
	},
	{
		"escena":escena3,
		"texto":[[],
			["3D en GPU", "Contexto 3D","se define un buffer","se lo divide", "se le asigna thread a core"],
			["Modelo"]
		],
		"transitionPath": [
		       new THREE.Vector3(5,3.7, -2.5).multiplyScalar(scale),
		      new THREE.Vector3(2,5, -8.5).multiplyScalar(scale),
		      new THREE.Vector3(0,5, -9).multiplyScalar(scale),
		      new THREE.Vector3(-5,5, -8).multiplyScalar(scale),
		      new THREE.Vector3(-8,5, -5).multiplyScalar(scale),
		      new THREE.Vector3(-5.5,5, -3.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							loadPage3D("./material/gputhreading.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena4,
		"texto":[[],["GPU Coding","WebGL/OpenGL ES 2.0","Shader","Sintaxis C"],["Alternativas","Cuda","GLSL","HLSL"]],
		"transitionPath": [
		      new THREE.Vector3(-5.5,5, -3.5).multiplyScalar(scale),		      
		      new THREE.Vector3(-8,5, -2).multiplyScalar(scale),
		      new THREE.Vector3(-10,5, -1).multiplyScalar(scale),
		      new THREE.Vector3(-7,5, 0.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							var code='<h3>Links</h3><a href="http://www.nvidia.es/object/cuda-parallel-computing-es.html" target="new">Cuda</a><br/>';
							code+='<a href="https://www.opengl.org/documentation/glsl/" target="new">GLSL (OpenGL)</a><br/>';
							code+='<a href="https://msdn.microsoft.com/en-us/library/windows/desktop/bb509561(v=vs.85).aspx" target="new">HLSL (DirectX)</a><br/>';
							populateModal(code);
						}
			}
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena5,//5
		"texto":[[],["GLSL","Vertex Shader","Fragment Shader","Pipeline"],
			["Shader"],
			["Vertex"],
			["Fragment"],
			["Pipeline"],
			["Pipeline detail"]
			],
		"transitionPath": [
		      new THREE.Vector3(-7,4, 0.5).multiplyScalar(scale),	      
		      new THREE.Vector3(-8,4, -2).multiplyScalar(scale),
		      new THREE.Vector3(-7,4, -3).multiplyScalar(scale),
		      new THREE.Vector3(-3,4.5, -6).multiplyScalar(scale),
		      new THREE.Vector3(0,4.8, -8).multiplyScalar(scale),
		      new THREE.Vector3(3,5, -10).multiplyScalar(scale),
		      new THREE.Vector3(5,5, -8).multiplyScalar(scale),
		      new THREE.Vector3(3.5,5, -6).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							loadPage3D("./material/shaderImg.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			3:{
				"load":function(){
							loadPage3D("./material/vertexImg.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			4:{
				"load":function(){
							loadPage3D("./material/fragmentImg.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			5:{
				"load":function(){
							loadPage3D("./material/pipelineSimpl.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			6:{
				"load":function(){
							loadPage3D("./material/pipeline.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
				
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena6,//6
		"texto":[[],["Ej de Shader"],["Vertex"],["Fragment"],[" Y JS ...?"],["Contexto :("]],
		"transitionPath": [
		      new THREE.Vector3(3,6, -5.5).multiplyScalar(scale),	      
		      new THREE.Vector3(4,5.6, -4).multiplyScalar(scale),
		      new THREE.Vector3(1.5,6, -2.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("./material/Spinning WebGL Box.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
							var code='<h3>Links</h3><a href="https://www.khronos.org/registry/webgl/sdk/demos/webkit/SpiritBox.html" target="new">Shader demo with texture</a>'
							populateModal(code);
							
						}
			},
			2:{
				"load":function(){
							loadPage3D("./material/vertex.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			3:{
				"load":function(){
							loadPage3D("./material/fragment.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			4:{
				"load":function(){
							loadPage3D("./material/sad.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},	
			5:{
				"load":function(){
							loadPage3D("./material/context.html");
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}				
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena7,//7
		"texto":[[],["Demos"],["Demos"],["Demos"],["Demos"]],
		"transitionPath": [
		     new THREE.Vector3(1.5,6, -2.5).multiplyScalar(scale),	      
		      new THREE.Vector3(4,5.5, -4).multiplyScalar(scale),
		      new THREE.Vector3(3.1,6.5, -0.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("http://webglsamples.org/aquarium/aquarium.html");
							var code='<h3>Links</h3><a href="http://webglsamples.org/aquarium/aquarium.html" target="new">aquarium</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			2:{
				"load":function(){
							loadPage3D("http://madebyevan.com/webgl-water/");
							var code='<h3>Links</h3><a href="http://madebyevan.com/webgl-water/" target="new">webgl-water</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			3:{
				"load":function(){
							loadPage3D("http://acko.net/files/dark-sunrise/git/");
							var code='<h3>Links</h3><a href="http://acko.net/files/dark-sunrise/git/" target="new">dark-sunrise</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			4:{
				"load":function(){
							loadPage3D("http://www.ro.me/");
							var code='<h3>Links</h3><a href="http://www.ro.me/" target="new">ro.me</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena8,//8 
		"texto":[[],["GLSL es ...","...engorroso...","...difícil","debug artesanal","shader editor"]
		],
		"transitionPath": [
		     new THREE.Vector3(3.1,6.5, -0.5).multiplyScalar(scale),	      
		      new THREE.Vector3(2,8.5, 0).multiplyScalar(scale),
		      new THREE.Vector3(0,8.5, 3).multiplyScalar(scale),
		      new THREE.Vector3(-3,5, 3.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							var code='<h3>Links</h3><a href="https://chrome.google.com/webstore/detail/shader-editor/ggeaidddejpbakgafapihjbgdlbbbpob" target="new">Shader Editor Chrome</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena9,//9
		"texto":[[],["Frameworks","Conceptos propios de 3D","Alto nivel"],
				["THREE.JS"],
				["babylon js"],
				["PhiloGL"]],
		"transitionPath": [
		 	new THREE.Vector3(-3,5, 3.5).multiplyScalar(scale),
		    new THREE.Vector3(-3.6,8, 3).multiplyScalar(scale),	      
		    new THREE.Vector3(-4,7, 2.5).multiplyScalar(scale),
		     
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							var code='<h3>Links</h3><a href="http://threejs.org/" target="new">ThreeJS</a>'
							loadPage3D("http://threejs.org/");
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			3:{
				"load":function(){
							loadPage3D("http://www.babylonjs.com/");
							var code='<h3>Links</h3><a href="http://www.babylonjs.com/" target="new">babylonjs</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			4:{
				"load":function(){
							loadPage3D("http://www.senchalabs.org/philogl/");
							var code='<h3>Links</h3><a href="http://www.senchalabs.org/philogl/" target="new">philogl</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
		},
		 "tags":["Intro"]
	},
	{
		"escena":escena10,//10
		"texto":[[],["Conceptos","Escena","Camara","Geometrías","Meshes","renderer","... etc"]],
		"transitionPath": [
		 	 new THREE.Vector3(-4,7, 2.5).multiplyScalar(scale),
		    new THREE.Vector3(0,8, 3).multiplyScalar(scale),	      
		    new THREE.Vector3(4,7, 2.5).multiplyScalar(scale)     
		    ],
		 "tags":["Intro"]
	},
	{
		"escena":escena11,//11
		"texto":[[],["Escena"]],
		"transitionPath": [
		 	new THREE.Vector3(4,7, 2.5).multiplyScalar(scale),
		    new THREE.Vector3(3,7, 2).multiplyScalar(scale),	      
		    new THREE.Vector3(2,7, 0.5).multiplyScalar(scale),
		     
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("./material/escena.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena12,//12
		"texto":[[],["Ejemplo"],["Demo"]],
		"transitionPath": [
		 	new THREE.Vector3(2,7, 0.5).multiplyScalar(scale),
		    new THREE.Vector3(2,7, 1.5).multiplyScalar(scale),	      
		    new THREE.Vector3(2.5,7.5, 3).multiplyScalar(scale),
		     
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("./material/threejsBasicDemoCode.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			2:{
				"load":function(){
							loadPage3D("./material/threejsBasicDemo.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena13,//13
		"texto":[[],["It's JS", "I know this"]],
		"transitionPath": [
			new THREE.Vector3(2.5,7.5, 3).multiplyScalar(scale),
		 	new THREE.Vector3(0,8, 2.5).multiplyScalar(scale),
		    new THREE.Vector3(-1,8.5, 2.5).multiplyScalar(scale)
		     
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("./material/knowthis.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena14,//14
		"texto":[[],[" + Conceptos","Luces","Material","Frustum"],
			["Luces","Ambient","Directional","Spot light","Point Light"],
			["Ejemplos"],
			["Materiales","Basic","Mesh Lambert","Mesh Phong","Normal","Shader material"],
			["Ejemplos"]
			],
		"transitionPath": [
			new THREE.Vector3(-1,8.5, 2.5).multiplyScalar(scale),
		 	new THREE.Vector3(-1.5,9, 1).multiplyScalar(scale),
		 	new THREE.Vector3(-2.5,9, 0.5).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			3:{
				"load":function(){

							loadPage3D("./material/Shadow.html")
							var code='<h3>Links</h3><a href="http://stemkoski.github.io/Three.js/Shadow.html" target="new">Shadows</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			},
			5:{
				"load":function(){
							loadPage3D("http://stemkoski.github.io/Three.js/Materials-Solid.html")
							var code='<h3>Links</h3><a href="http://stemkoski.github.io/Three.js/Materials-Solid.html" target="new">Demo Materiales</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
			}
			},
		   
		 "tags":["Intro"]
	},
	{
		"escena":escena15,//15
		"texto":[[]["Animacion","renderer","render function","requestAnimationFrame"],
			["Renderer","WebGLRenderer","CanvasRenderer","CSS3DRenderer"],
			["render fn"]			
		],
		"transitionPath": [
			new THREE.Vector3(-2.5,9, 0.5).multiplyScalar(scale),
		 	new THREE.Vector3(-1,9, 2.5).multiplyScalar(scale),
		 	new THREE.Vector3(0.5,9, 6).multiplyScalar(scale),
		 	
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							loadPage3D("./material/threejsBasicDemoCode.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena16,//16
		"texto":[[],["Vector","...en realidad matriz","Position","Rotation"],
				["Vector"]
		],
		"transitionPath": [
		 	new THREE.Vector3(0.5,9, 6).multiplyScalar(scale),
		 	new THREE.Vector3(0,9.5, 1).multiplyScalar(scale),
		 	new THREE.Vector3(-0.5,10, -2.5).multiplyScalar(scale),
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							loadPage3D("./material/threejsBasicDemoCode.html")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena17,//17
		"texto":[[],["+ Animacion","keyframe","mismo concepto Flash","o editores 3D"],
		],
		"transitionPath": [
		 	new THREE.Vector3(-0.5,10, -2.5).multiplyScalar(scale),
		 	new THREE.Vector3(-1.5,10, -2).multiplyScalar(scale),
		 	new THREE.Vector3(-2,10, -1).multiplyScalar(scale)
		 	
		    ],
		 "tags":["Intro"]
	},
	{
		"escena":escena18,//18
		"texto":[[],["Ejemplo"]],
		"transitionPath": [
			new THREE.Vector3(-2,10, -1).multiplyScalar(scale),
		 	new THREE.Vector3(0,10, -2.5).multiplyScalar(scale),
		 	new THREE.Vector3(-2,10, -4).multiplyScalar(scale),
		 	
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("./material/key.html")
							var code='<h3>Links</h3><a href="http://threejs.org/examples/#webgl_animation_skinning_blending" target="new">Demo keyframe</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena19,//19
		"texto":[[],["Demo"]],
		"transitionPath": [
			new THREE.Vector3(-2,10, -4).multiplyScalar(scale),
		 	new THREE.Vector3(-2,10.5, -2.5).multiplyScalar(scale),
		 	new THREE.Vector3(-3,10.5, -2).multiplyScalar(scale)
		 	
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							loadPage3D("http://threejs.org/examples/#webgl_animation_skinning_blending")
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena20,//20
		"texto":[[],["Editor","importar","exportar","Confeccionar escena"],["Editor"]],
		"transitionPath": [
		 	new THREE.Vector3(-3,10.5, -2).multiplyScalar(scale),
		 	//new THREE.Vector3(-2,10.5, -4).multiplyScalar(scale),
		 	new THREE.Vector3(-0.5,11, -5.5).multiplyScalar(scale),
		 	
		    ],
		"funcionesTexto":{
			2:{
				"load":function(){
							loadPage3D("http://threejs.org/editor/")
							var code='<h3>Links</h3><a href="http://threejs.org/editor/" target="new">Editor</a>'
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena21,//21
		"texto":[[],["Formatos","json","obj","stl"],
			["Plugin chrome","DEMO"],
		],
		"transitionPath": [
		 	new THREE.Vector3(-0.5,11, -5.5).multiplyScalar(scale),
		 	new THREE.Vector3(0,15, 1).multiplyScalar(scale)
		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							var code='<h3>Links</h3><a href="https://chrome.google.com/webstore/detail/threejs-inspector/dnhjfclbfhcbcdfpjaeacomhbdfjbebi" target="new">threejs-inspector</a><br/>';
							code+='<a href="https://www.khronos.org/webgl/" target="new">WebGL Spec</a><br/>'
							code+='<a href="https://www.khronos.org/vulkan" target="new">Vulcan (WebGL 2)</a><br/>'
							code+='<a href="http://www.turbosquid.com/" target="new">turbosquid (modelos 3D)</a><br/>'
							code+='<a href="http://www.threejsgames.com/extensions/" target="new">Threex (threejs assets)</a><br/>'
							code+='<a href="http://learningthreejs.com/" target="new">learning threejs</a><br/>'
							code+='<a href="https://stemkoski.github.io/Three.js/" target="new">stemkoski</a><br/>'

							
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	},
	{
		"escena":escena22,
		"texto":[[],["Fin","Links útiles"]],
		"transitionPath": [
		 	new THREE.Vector3(0,15, 1).multiplyScalar(scale),
		 	new THREE.Vector3(0,15, 0).multiplyScalar(scale),

		    ],
		"funcionesTexto":{
			1:{
				"load":function(){
							var code='<h3>Links</h3><a href="http://patriciogonzalezvivo.com/2015/thebookofshaders/" target="new">Book of shaders</a><br/>';
							code+='<a href="https://www.khronos.org/webgl/" target="new">WebGL Spec</a><br/>'
							code+='<a href="https://www.khronos.org/vulkan" target="new">Vulcan (WebGL 2)</a><br/>'
							code+='<a href="http://www.turbosquid.com/" target="new">turbosquid (modelos 3D)</a><br/>'
							code+='<a href="http://www.threejsgames.com/extensions/" target="new">Threex (threejs assets)</a><br/>'
							code+='<a href="http://learningthreejs.com/" target="new">learning threejs</a><br/>'
							code+='<a href="https://stemkoski.github.io/Three.js/" target="new">stemkoski</a><br/>'
							code+='<a href="https://www.shadertoy.com/" target="new">shadertoy</a><br/>'
							
							populateModal(code);
							onRenderFcts.push(deslizarPaginaAlFoco);
						}
				}
			},
		 "tags":["Intro"]
	}
	]
