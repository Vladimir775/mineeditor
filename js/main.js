import * as THREE from '/js/three.module.js';

import * as World from './WorldGen.js';

import * as Saver from './save.js';

import * as ExportManager from './ExportManager.js';

import * as PluginManager from './PluginManager.js';

import * as Collision from './phys.js';




var gravity = 0.1;

var keyboard = '';
var MoveSpeed = 0.075;
var jump_height = 1;

var fly = true;



// import { Stone } from './ClassManager.js'

var current = 'OakLog';

var canvas = document.querySelector('#canvas');

var renderer = new THREE.WebGLRenderer({canvas});
renderer.shadowMap.enabled = true;

var fov = 75;
var aspect = 2;
var near = 0.1;
var far = 50;
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 0;
camera.position.y = 12;
camera.rotation.order = 'YXZ'
// camera.rotation.y = 1.5708;
camera.rotation.x = -1.5708;
// console.log(camera);

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2( 1, 1 );
var mousedown = false;
var key = null;


var scene = new THREE.Scene();

const loader = new THREE.CubeTextureLoader();

const texture = [
	'content/right.png',
	'content/left.png',
	'content/top.png',
	'content/bottom.png',
	'content/back.png',
	'content/front.png',
];
setbgTexture(texture)



const color = 0xFFFFFF;
var intensity = 0;
var light = new THREE.DirectionalLight(color, intensity);
  light.position.set(-100, 100, 100);
  light.castShadow = true;
  // console.log(light);

  // var d = 500;

  //   light.shadow.camera.Left = -d;
  //   light.shadow.camera.Right = d;
  //   light.shadow.camera.Top = d;
  //   light.shadow.camera.Bottom = -d;

  //   light.shadow.camera.Far = 2000;
  scene.add(light);


var intensity = 1;
const ambLight = new THREE.AmbientLight(color, intensity);
  ambLight.position.set(-1, 2, 4);
  scene.add(ambLight);




{
  const color = 0x00ccff;
  const near = 100;
  const far = 200;
  scene.fog = new THREE.Fog(color, near, far);
  // scene.background = new THREE.Color(color);
}



for (var i = 0; i < World.map.length; i++) {
	// console.log(World.map[i].block)


	scene.add(World.map[i].block);


	// if(World.map[i].block.position.distanceTo(camera.position) <= 4){
		// scene.add(World.map[i].block);
	// }
}
console.log(camera)
var seconds = 0;
function render(time) {
	time *= 0.001;  // convert time to seconds

	if (is_gravity) {
		var res = false;
		for (var i = 0; i < worldmap.length; i++) {
			if(Collision.cam_col(camera,worldmap[i])){
				res = true;
			}
		}
		if (!res) {
			camera.position.y -= gravity
		}else if (keyboard ==32) {
			jump()
			//camera.position.y += 5.1;
			// worldlight.position.y += 0.1;
		}

		move()
	}

	if(Math.round(time) > seconds){
			World.refreshWorld();
			seconds = Math.round(time);
		}

	if (resizeRenderer(renderer)) {
		const canvas = renderer.domElement;
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
	    camera.updateProjectionMatrix();
	}


	renderer.render(scene, camera);

	if(mousedown){
        raycaster.setFromCamera( mouse, camera );

        var intersects  = raycaster.intersectObjects(scene.children);

        if(intersects.length >0){
        	if(intersects[0].distance <=7 && intersects[0].distance >=1){
				if(key == 2){
        			for (var i = 0; i < World.map.length; i++) {
        	   	    	if(intersects[0].object == World.map[i].block){
        	   	    		// console.log(intersects[0], 'hit');
        	   	    		var a = World.place(intersects[0],current);
        	   	    		scene.add(a);
        	   	    		mousedown = false;
        	   	    	}
        	  		}
        		}
        	}
			if(key == 1){
        		console.log(intersects[0]);
        		World.remove(intersects[0]);
        		scene.remove(intersects[0].object);
    			mousedown = false;
			}
        }
    }

	requestAnimationFrame(render);
}

function resizeRenderer(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

requestAnimationFrame(render);

var rotspeed = 0.02;;
canvas.onmousemove = function(e){
	if(e.buttons == 4){
		if (e.movementX >0) {
			if (!document.getElementById('X').getElementsByTagName('input')[0].checked){
				camera.rotation.y += rotspeed; //quaternion ?
			}
			else{
				camera.rotation.y -= rotspeed; //quaternion ?
			}
		}
		if (e.movementX <0) {
			if (!document.getElementById('X').getElementsByTagName('input')[0].checked){
				camera.rotation.y -= rotspeed; //quaternion ?
			}
			else{
				camera.rotation.y += rotspeed; //quaternion ?
			}
		}

		if (e.movementY >0) {
			if (!document.getElementById('Y').getElementsByTagName('input')[0].checked){
				if (camera.rotation.x + rotspeed < 1.5708)
					camera.rotation.x += rotspeed;
			}
			else{
				if (camera.rotation.x - rotspeed > -1.5708)
					camera.rotation.x -= rotspeed;
			}
		}
		if (e.movementY <0) {
			if (!document.getElementById('Y').getElementsByTagName('input')[0].checked){
				if (camera.rotation.x - rotspeed > -1.5708)
					camera.rotation.x -= rotspeed; //quaternion ?
			}
			else{
				if (camera.rotation.x + rotspeed < 1.5708)
					camera.rotation.x += rotspeed; //quaternion ?
			}
		}
		// console.log(camera.rotation);
	}
}



window.onkeydown = function(e){
	// console.log(e)
	if (is_gravity) {
		keyboard = e.keyCode;
	}else{


	if (e.key =='w' || e.key =='ц') {
		if (!document.getElementById('Fly').getElementsByTagName('input')[0].checked) {
			camera.position.z -= 0.2 * Math.cos(camera.rotation.y);
			camera.position.x -= 0.2 * Math.sin(camera.rotation.y);
		}else{
			camera.position.z -= 0.2 * Math.cos(camera.rotation.y) * Math.cos(camera.rotation.x);
			camera.position.x -= 0.2 * Math.sin(camera.rotation.y) * Math.cos(camera.rotation.x);
			camera.position.y += 0.2 * Math.sin(camera.rotation.x);
		}

		// worldlight.position.z -= 0.2 * Math.cos(camera.rotation.y);
		// worldlight.position.x -= 0.2 * Math.sin(camera.rotation.y);
	}
	if (e.key =='s' || e.key =='ы') {
		if (!document.getElementById('Fly').getElementsByTagName('input')[0].checked) {
			camera.position.z += 0.2 * Math.cos(camera.rotation.y);
			camera.position.x += 0.2 * Math.sin(camera.rotation.y);
		}else{
			camera.position.z += 0.2 * Math.cos(camera.rotation.y) * Math.cos(camera.rotation.x);
			camera.position.x += 0.2 * Math.sin(camera.rotation.y) * Math.cos(camera.rotation.x);
			camera.position.y -= 0.2 * Math.sin(camera.rotation.x);
		}

		// worldlight.position.z += 0.2 * Math.cos(camera.rotation.y);
		// worldlight.position.x += 0.2 * Math.sin(camera.rotation.y);
	}
	if (e.key =='a' || e.key =='ф') {
		camera.position.z -= 0.2 * Math.sin(-camera.rotation.y);
		camera.position.x -= 0.2 * Math.cos(-camera.rotation.y);

		// worldlight.position.z -= 0.2 * Math.sin(-camera.rotation.y);
		// worldlight.position.x -= 0.2 * Math.cos(-camera.rotation.y);
	}
	if (e.key =='d' || e.key =='в') {
		camera.position.z += 0.2 * Math.sin(-camera.rotation.y);
		camera.position.x += 0.2 * Math.cos(-camera.rotation.y);

		// worldlight.position.z += 0.2 * Math.sin(-camera.rotation.y);
		// worldlight.position.x += 0.2 * Math.cos(-camera.rotation.y);
	}
	if (e.key ==' ') {
		camera.position.y += 0.1;
		// worldlight.position.y += 0.1;
	}
	if (e.key =='Shift') {
		camera.position.y -= 0.1;
		// worldlight.position.y -= 0.1;
	}

	if(e.key == 'Alt'){
		var a = prompt('command');
		cmd(a.split(' '));
	}
	// worldlight.target.position.set(worldlight.position.x, worldlight.position.y - 10, worldlight.position.z);

	}
}

window.onkeyup = function(e){
	if (is_gravity) {
		keyboard = '';
	}
}




var prev_pos = new THREE.Vector3().copy(camera.position);
var colided = false;
function move(){
	if (keyboard){
		let moveOk = true;
		for (var i = 0; i < worldmap.length; i++) {
				if(Collision.movecol(camera,worldmap[i])){

					moveOk = false;
					break;
				}
			}
		if (moveOk && !colided) {
			// console.log(keyboard)
			if (keyboard == 87) {
				camera.position.z -= MoveSpeed * Math.cos(camera.rotation.y);
				camera.position.x -= MoveSpeed * Math.sin(camera.rotation.y);
				// worldlight.position.z -= MoveSpeed * Math.cos(camera.rotation.y);
				// worldlight.position.x -= MoveSpeed * Math.sin(camera.rotation.y);
			}
			if (keyboard == 83) {
				camera.position.z += MoveSpeed * Math.cos(camera.rotation.y);
				camera.position.x += MoveSpeed * Math.sin(camera.rotation.y);
				// worldlight.position.z += MoveSpeed * Math.cos(camera.rotation.y);
				// worldlight.position.x += MoveSpeed * Math.sin(camera.rotation.y);
			}
			if (keyboard ==65) {
				camera.position.z -= MoveSpeed * Math.sin(-camera.rotation.y);
				camera.position.x -= MoveSpeed * Math.cos(-camera.rotation.y);
				// worldlight.position.z -= MoveSpeed * Math.sin(-camera.rotation.y);
				// worldlight.position.x -= MoveSpeed * Math.cos(-camera.rotation.y);
			}
			if (keyboard ==68) {
				camera.position.z += MoveSpeed * Math.sin(-camera.rotation.y);
				camera.position.x += MoveSpeed * Math.cos(-camera.rotation.y);
				// worldlight.position.z += MoveSpeed * Math.sin(-camera.rotation.y);
				// worldlight.position.x += MoveSpeed * Math.cos(-camera.rotation.y);
			}
			if (keyboard ==16) {
				//camera.position.y -= 0.1;
				// worldlight.position.y -= 0.1;
			}

			if(keyboard == 18){
				// var a = prompt('command');
				// cmd(a.split(' '));
			}
			prev_pos.copy(camera.position);
			colided = false;
		}else{
			if (prev_pos.equals(camera.position)) {
				colided = true;
				if(keyboard == 87){
					camera.position.z += MoveSpeed * Math.cos(camera.rotation.y);
					camera.position.x += MoveSpeed * Math.sin(camera.rotation.y);
				}
				if(keyboard == 83){
					camera.position.z -= MoveSpeed * Math.cos(camera.rotation.y);
					camera.position.x -= MoveSpeed * Math.sin(camera.rotation.y);
				}
				if(keyboard == 68){
					camera.position.z -= MoveSpeed * Math.sin(-camera.rotation.y);
					camera.position.x -= MoveSpeed * Math.cos(-camera.rotation.y);
				}
				if(keyboard == 65){
					camera.position.z += MoveSpeed * Math.sin(-camera.rotation.y);
					camera.position.x += MoveSpeed * Math.cos(-camera.rotation.y);
				}
			}else{
				colided = false;
			}
		}
	}
}



var jumping = 0;
function jump(){
	var was_gravity = gravity + 0;
	gravity = 0;
	setTimeout(function j(){
		if (jumping >= jump_height) {
			jumping = 0;
			setTimeout(function a(){
				if (gravity < was_gravity) {
					gravity += was_gravity / 30;
					setTimeout(a,10);
				}
			},10);
		}else{
			let res = false;
			for (var i = 0; i < worldmap.length; i++) {
				if(Collision.cam_col2(camera,worldmap[i])){
					res = true;
				}
			}
			if (!res) {
				camera.position.y += 0.01;
				jumping += 0.01;
				setTimeout(j,1)
			}else{
				jumping = 0;
				setTimeout(function a(){
					if (gravity < was_gravity) {
						gravity += was_gravity / 30;
						setTimeout(a,10);
					}
				},10);
			}
		}
	},1);
}








canvas.onmousedown = function(e){
	if (e.buttons != 4) {
		mousedown = true;
		key = e.buttons;
		e.preventDefault();
		mouse.x = ( e.clientX / canvas.width ) * 2 - 1;
		mouse.y = - ( e.clientY / canvas.height ) * 2 + 1;
	}else{
		mousedown = false;
	}
}

canvas.onmouseup = function(e){
	mousedown = false;
}

document.getElementById('blocks').onclick= function(e){
	if(e.target.attributes[0].value != 'blocks'){
		console.log(e.target.attributes[0].value);
		current = e.target.attributes[0].value;
	}
}

document.getElementById('shadowmap').getElementsByTagName('input')[0].onchange= function(e){
	if(!document.getElementById('shadowmap').getElementsByTagName('input')[0].checked){
		light.intensity = 0;
		ambLight.intensity = 1;
	}else{
		light.intensity = 0.7;
		ambLight.intensity = 0.3;
	}
}

document.getElementById('Finp').oninput = function(){

	while(World.map.length > 0) {
		scene.remove(World.map[0].block);
		World.map.splice(0,1);
	}
	var loaded = Saver.load();
	setTimeout(function(){
	loaded.forEach( function(l, i) {
		scene.add(World.generate(parseInt(l[0]),parseInt(l[1]),parseInt(l[2]),l[3]));
	});},1)
}

document.getElementById('save_world').onclick = function(){
	Saver.save_world(World.map);
}

document.getElementById('exp_view').onchange = function(e){

	World.map.forEach( function(m, id) {
		m.block.receiveShadow = document.getElementById('exp_view').checked;
		m.block.castShadow = document.getElementById('exp_view').checked;
	});
}





document.getElementById('NMW').onclick = function(){

	while(World.map.length > 0) {
		scene.remove(World.map[0].block);
		World.map.splice(0,1);
	}

	World.terrain();
	for (var i = 0; i < World.map.length; i++) {
		scene.add(World.map[i].block)
	}
}

document.getElementById('NFW').onclick = function(){

	while(World.map.length > 0) {
		scene.remove(World.map[0].block);
		World.map.splice(0,1);
	}

	World.flat();

	for (var i = 0; i < World.map.length; i++) {
		scene.add(World.map[i].block)
	}
}

document.getElementById('NBW').onclick = function(){

	while(World.map.length > 0) {
		scene.remove(World.map[0].block);
		World.map.splice(0,1);
	}

	World.generate();
	for (var i = 0; i < World.map.length; i++) {
		scene.add(World.map[i].block)
	}
}



document.getElementById('gltfexport').onclick = function(){
	ExportManager.exportGLTF(scene);
}

document.getElementById('stlexport').onclick = function(){
	ExportManager.exportASCII(scene);
}


document.getElementById('plyexport').onclick = function(){
	ExportManager.PLYExport(scene);
}





document.getElementById('SkyboxChanger').oninput = function(e){
	var file = e.target.files[0];
	var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        var texture = evt.target.result;
        // console.log(text1);
		texture = JSON.parse(texture);
		texture = texture.skybox;
		console.log(texture);

		var arr = [];
		arr.push(texture.right);
		arr.push(texture.left);
		arr.push(texture.top);
		arr.push(texture.bottom);
		arr.push(texture.back);
		arr.push(texture.front);

		console.log(arr);

		setbgTexture(arr);
	}
}





document.getElementById('plugin_inp').addEventListener('change',function(){
	for (var i = 0; i < document.getElementById('plugin_inp').files.length; i++) {
		PluginManager.updateInventory(document.getElementById('plugin_inp').files[i]);
	}
	// PluginManager.updateInventory(document.getElementById('plugin_inp').files[0]);
	console.log('alive');
	// refresh()
	// document.getElementById('plugin_inp').onchange = plugIN();
});

function refresh(){
	document.getElementById('plugin_inp').addEventListener('change',function(){
		PluginManager.updateInventory(document.getElementById('plugin_inp').files[0]);
		console.log('alive');
		refresh()
		// document.getElementById('plugin_inp').onchange = plugIN();
	});
}

window.onload = function(){
	// PluginManager.updateInventory();
}




function cmd(){

	console.log(arguments);

	if(arguments[0].length>commandList[arguments[0][0]][1]){
		console.log(commandList[arguments[0][0]][0]);
		console.log(eval(commandList[arguments[0][0]][0]));
	}
}

export var commandList = {};

export function CommandSeter(name,params,cmd){
	commandList[name] = [cmd, params];

	console.log(commandList);

	// var a = prompt('command');

	// console.log(a.split(' '));
	// console.log(commandList[a.split(' ')[0]]);
}

export function EventSeter(command){
	eval(command);
}



function setbgTexture(textures){

	scene.background = loader.load(textures);
	console.log('alive');
}
