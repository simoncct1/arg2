// import * as THREE from 'three';
// import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


document.querySelector(".vid").addEventListener('click', function (e){;
    document.getElementById('video').play();
    console.log("bish");
})

var blocker = document.getElementById("blocker");
blocker.addEventListener('click', function (e){
    document.getElementById('video').pause();
    document.getElementById('video').currentTime = 0;
})

// SETTINGS of this demo:
const SETTINGS = {
    gltfModelURL: 'DamagedHelmet/glTF/mask.gltf',
    cubeMapURL: 'Bridge2/',
    offsetYZ: [0, 0]
  };
  
  let THREECAMERA = null;
  
  
  // build the 3D. called once when Jeeliz Face Filter is OK
  function init_threeScene(spec){
    const threeStuffs = JeelizThreeHelper.init(spec, null);
  
    // CREATE THE ENVMAP:
    const path = SETTINGS.cubeMapURL;
    const format = '.jpg';
    const envMap = new THREE.CubeTextureLoader().load( [
      path + 'posx' + format, path + 'negx' + format,
      path + 'posy' + format, path + 'negy' + format,
      path + 'posz' + format, path + 'negz' + format
    ] );
  
    // IMPORT THE GLTF MODEL:
    // from https://threejs.org/examples/#webgl_loader_gltf
    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load( SETTINGS.gltfModelURL, function ( gltf ) {
      gltf.scene.traverse( function ( child ) {
        if ( child.isMesh ) {
          child.material.envMap = envMap;
        }
      } );
      gltf.scene.frustumCulled = false;
      
      // center and scale the object:
      const bbox = new THREE.Box3().expandByObject(gltf.scene);
  
      // center the model:
      const centerBBox = bbox.getCenter(new THREE.Vector3());
      gltf.scene.position.add(centerBBox.multiplyScalar(-1));
      gltf.scene.position.add(new THREE.Vector3(0,SETTINGS.offsetYZ[0], SETTINGS.offsetYZ[1]));
  
      // scale the model according to its width:
      const sizeX = bbox.getSize(new THREE.Vector3()).x;
      gltf.scene.scale.multiplyScalar(SETTINGS.scale / sizeX);
  
      // dispatch the model:
      threeStuffs.faceObject.add(gltf.scene);
    } ); //end gltfLoader.load callback
    
    //CREATE THE CAMERA
    THREECAMERA = JeelizThreeHelper.create_camera();
  } //end init_threeScene()
  
  
  //entry point:
  function main(){
    JeelizResizer.size_canvas({
      canvasId: 'jeeFaceFilterCanvas',
      isFullScreen: false,
      isApplyCSS: true,
      callback: start,
      onResize: function(){
        JeelizThreeHelper.update_camera(THREECAMERA);
      }
    })
  }
  
  
  function start(){
    JEELIZFACEFILTER.init({ 
    
      followZRot: true,
      canvasId: 'jeeFaceFilterCanvas',
      NNCPath: '../../../neuralNets/', //root of NN_DEFAULT.json file
      callbackReady: function(errCode, spec){
        if (errCode){
          console.log('AN ERROR HAPPENS. SORRY BRO :( . ERR =', errCode);
          return;
        }
  
        console.log('INFO: JEELIZFACEFILTER IS READY');
        init_threeScene(spec);
      }, //end callbackReady()
  
      // called at each render iteration (drawing loop):
      callbackTrack: function(detectState){
        JeelizThreeHelper.render(detectState, THREECAMERA);
      }
    }); //end JEELIZFACEFILTER.init call
  } //end start()
  
  
  window.addEventListener('load', main);