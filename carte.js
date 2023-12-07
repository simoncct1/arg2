import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { InteractionManager } from '/node_modules/three.interactive/build/three.interactive.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import {PMREMGenerator} from "/node_modules/three/src/extras/PMREMGenerator.js";

document.querySelector(".enigme").addEventListener('click', function (e) {
    function getDate(){
        var today = new Date();
        var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        var time = today.getHours() + ":" + today.getMinutes();
        var dateTime = date+' '+time;
        document.getElementById('datetime').innerHTML =
            date + " : " + time;
        console.log(dateTime)
        }
        getDate();
        setInterval(getDate, 60000);
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 15, 0);

    const renderer = new THREE.WebGLRenderer();
    var container = document.querySelector(".map");
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    // add the output of the render function to the HTML
    document.querySelector(".enigme").appendChild(renderer.domElement);
    const loader = new GLTFLoader();
    const pmremGenerator = new PMREMGenerator(renderer);
    var map= new THREE.Object3D();
    var flagis;
    var flagind;
    var flagtex;
    var flagarg;
    var flagbe;
    var other;
 loader.load("/assets/mappp.glb",
     function ( gltf ) {
         map = gltf.scene
         gltf.scene.scale.set(0.1,0.1,0.1);
         scene.add( gltf.scene );
//flags
         var flags = scene.children[4].children;
         var flagsliced = flags.slice(0,5)
        //  console.log(flagsliced[1]);
        //  flagsliced[1].children[0].material.emissive = new THREE.Color( 0xbb0000 );
        //  flagsliced[1].children[0].material.emissiveIntensity = 0.01;
        
         //el dictador
         flagarg = scene.children[4].children[0];
         interactionManager.add(flagarg);
         flagarg.addEventListener('click', (event) => {const hdriLoader = new RGBELoader()
         hdriLoader.load( 'assets/arg.hdr', function ( texture ) {
           const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
           texture.dispose(); 
           scene.environment = envMap
           scene.background = envMap
           document.querySelector(".oper").style.opacity ="1";
           document.querySelector(".oper p").innerHTML ="Opération CHAINSAW";
         } );});
          //boh
          flagtex = scene.children[4].children[1];
          interactionManager.add(flagtex);
          flagtex.addEventListener('click', (event) => {const hdriLoader = new RGBELoader()
          hdriLoader.load( 'assets/tex.hdr', function ( texture ) {
            const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
            texture.dispose(); 
            scene.environment = envMap
            scene.background = envMap
            document.querySelector(".oper").style.opacity ="1";
            document.querySelector(".oper p").innerHTML ="Opération REVIVAL";
          } );});

            //lesnappes situation
            flagbe = scene.children[4].children[2];
            interactionManager.add(flagbe);
            flagbe.addEventListener('click', (event) => {const hdriLoader = new RGBELoader()
            hdriLoader.load( 'assets/bel.hdr', function ( texture ) {
              const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
              texture.dispose(); 
              scene.environment = envMap
              scene.background = envMap
              document.querySelector(".oper").style.opacity ="1";
              document.querySelector(".oper p").innerHTML ="Opération PHREA";
            } );});
  

         //free palestine
         flagis = scene.children[4].children[3];
         interactionManager.add(flagis);
         flagis.addEventListener('click', (event) => {const hdriLoader = new RGBELoader()
         hdriLoader.load( 'assets/pal.hdr', function ( texture ) {
           const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
           texture.dispose(); 
           scene.environment = envMap
           scene.background = envMap
           document.querySelector(".oper").style.opacity ="1";
              document.querySelector(".oper p").innerHTML ="Opération OLIVIERS";
         } );});

         //flagind
         flagind = scene.children[4].children[4];
         interactionManager.add(flagind);
         flagind.addEventListener('click', (event) => {const hdriLoader = new RGBELoader()
         hdriLoader.load( 'assets/ind.hdr', function ( texture ) {
           const envMap = pmremGenerator.fromEquirectangular( texture ).texture;
           texture.dispose(); 
           scene.environment = envMap
           scene.background = envMap
           document.querySelector(".oper").style.opacity ="1";
              document.querySelector(".oper p").innerHTML ="Opération KOCHI";
         } );});

         //ctt noir
         var others = scene.children[4].children;
         var othersliced = others.slice(5,26)
         
    for(var i = 0; i <= 20; i++){
         interactionManager.add(othersliced[i]);
         othersliced[i].addEventListener('click', (event) => {
           scene.environment = null;
           scene.background = "#OOOOOO";
           document.querySelector(".oper").style.opacity ="0";
           document.querySelector(".oper p").innerHTML ="Opération KOCHI";
         } );
        }

     },
     function onError(err) {
         console.log('An error happened');
     }
    );

   const light = new THREE.PointLight( 0xffffff, 3, 800 );
   light.position.set( 0, 10, 0);
   scene.add( light );
   const light4 = new THREE.PointLight( 0xDC143C, 1.55, 800 );
   light4.position.set( 0, 10, 0);
   scene.add( light4 );
   const light2 = new THREE.PointLight( 0xDC143C, 3, 800 );
   light2.position.set( -20, 10, 0);
   scene.add( light2 );
   const light3 = new THREE.PointLight( 0xDC143C, 3, 800);
   light3.position.set( 20, 10, 0);
   scene.add( light3 );
   const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
  );

  
 
//control
const controls = new OrbitControls( camera, renderer.domElement );
controls.mouseButtons = {
	LEFT: THREE.MOUSE.PAN,
	MIDDLE: THREE.MOUSE.DOLLY,
	RIGHT: THREE.MOUSE.ROTATE

}

controls.update();

    // function for re-rendering/animating the scene
    function tick() {
        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
    tick();
},{once : true})
document.querySelector(".enigme").addEventListener('click', function (e) {
document.querySelector(".mapicon").style.display ="none";
})
document.querySelector("#blocker").addEventListener('click', function (e) {
    document.querySelector(".mapicon").style.display ="block";
})