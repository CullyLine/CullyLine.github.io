import * as THREE from 'three'; //'/node_modules/three/build/three.js';
import { Vector2 } from 'three';

var sphere; 
var sphere2;
var camera;
var raycaster;
var pointer;

function init() {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();
    // create a camera, which defines where we're looking at
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    // tell the camera where to look
    camera.position.set(0, 0, 10);
    // create a render and set the size
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(sizes.width, sizes.height);
    // add the output of the render function to the HTML
    document.body.appendChild(renderer.domElement);
    // function for re-rendering/animating the scene

    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.z = 5
    cube.position.x = -3
    scene.add( cube );

    const material2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	const cube2 = new THREE.Mesh( geometry, material2 );
	cube2.position.x = 2;
    cube2.position.z = 5
	scene.add( cube2 );
	const sphereGeometry = new THREE.SphereGeometry( 16, 64, 64 );
	const sphereMaterial = new THREE.MeshBasicMaterial( { color: '#a988ba', opacity: .5, transparent: true } );
	sphereMaterial.wireframe = true;
	sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

    const sphereGeometry2 = new THREE.SphereGeometry( 50, 64, 64 );
	const sphereMaterial2 = new THREE.MeshBasicMaterial( { color: '#8b2abf', opacity: .5, transparent: true } );
	sphereMaterial2.wireframe = true;
	sphere2 = new THREE.Mesh( sphereGeometry2, sphereMaterial2 );
	
	scene.add( sphere );
    scene.add( sphere2 );

	document.addEventListener( 'mousemove', onMouseMove );
    window.addEventListener( 'pointermove', onPointerMove );

    function tick() {
        sphere.rotation.y += 0.00005;
        sphere2.rotation.y += 0.00008;

        cube.material.color = new THREE.Color( 0x00ff00 );
        cube2.material.color = new THREE.Color( 0x00ff00 );
        
        // update the picking ray with the camera and pointer position
        raycaster.setFromCamera( pointer, camera );

        // calculate objects intersecting the picking ray
        var intersects = raycaster.intersectObjects( scene.children );
        for ( let i = 0; i < intersects.length; i ++ ) {
            intersects[ i ].object.material.color.set( 0xff0000 );
        }

        requestAnimationFrame(tick);
        renderer.render(scene, camera);
    }
    tick();
}
init();

function onMouseMove(event) {
	event.preventDefault();
	const x = event.clientX;
	const y = event.clientY;
	const centerX = window.innerWidth / 2;
	const centerY = window.innerHeight / 2;
	const mouseX = x - centerX;
	const mouseY = y - centerY;
	camera.rotation.y = mouseX * -.0001;
	camera.rotation.x = mouseY * -.0001;
}

function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}