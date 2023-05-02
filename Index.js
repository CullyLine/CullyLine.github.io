import * as THREE from 'three';

var sphere;
var camera;

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

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

	const cube2 = new THREE.Mesh( geometry, material );
	cube2.position.x = 2;
	scene.add( cube2 );

	const sphereGeometry = new THREE.SphereGeometry( 16, 64, 64 );
	const sphereMaterial = new THREE.MeshBasicMaterial( { color: 0x0000ff } );
	sphereMaterial.wireframe = true;
	//THREE.PointsMaterial( { color: 0x0000ff })
	sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
	
	scene.add( sphere );

	document.addEventListener( 'mousemove', onMouseMove );

    function tick() {
        sphere.rotation.y += 0.0005;
        
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

// import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// camera.position.z = 5;

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();