import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { InteractionManager } from '/node_modules/three.interactive/build/three.interactive.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import {PMREMGenerator} from "/node_modules/three/src/extras/PMREMGenerator.js";

document.querySelector(".enigme").addEventListener('click', function (e) {
   
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 17, 0);

    const renderer = new THREE.WebGLRenderer();
    var container = document.querySelector(".map");
    console.log(container.offsetWidth)
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    // add the output of the render function to the HTML
    document.querySelector(".enigme").appendChild(renderer.domElement);
    const loader = new GLTFLoader();
    const pmremGenerator = new PMREMGenerator();
    var map= new THREE.Object3D();
    var flagis;
 loader.load("/assets/map.glb",
     function ( gltf ) {
         map = gltf.scene
         gltf.scene.scale.set(0.1,0.1,0.1);
         scene.add( gltf.scene );
         flagis = scene.children[4].children[4];
         interactionManager.add(flagis);
         flagis.addEventListener('click', (event) => {new RGBELoader()
            .load('/assets/pal.hdr', (hdrEquiRect, textureData) => {
                    hdrCubeRenderTarget = pmremGenerator.fromEquirectangular(hdrEquiRect);
                    pmremGenerator.compileCubemapShader();
            
                    scene.background = hdrCubeRenderTarget.texture;
                    renderer.toneMapping = LinearToneMapping;
                    renderer.toneMappingExposure = 0.5;
            });});
     },
     function onError(err) {
         console.log('An error happened');
     }
    );
    console.log(flagis)
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