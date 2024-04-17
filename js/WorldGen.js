import * as THREE from '/js/three.module.js';

// import { rotBlock, Stone, Dirt, Stonebrick, Grass, /*TallGrass,*/ Sealantern, WhiteGlass, AcaciaPlanks, BOakPlanks, OakPlanks, BirchPlanks, SprucePlanks, JunglePlanks, OakLog, OakLeaves, Sand } from './ClassManager.js'
import * as BLOCKS from './ClassManager.js'

export const boxWidth = 2;
export const boxHeight = 1;
export const boxDepth = 1;

const block = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth)

const loader = new THREE.TextureLoader();

const material = new THREE.MeshPhongMaterial({color: 0xcccccc});



const stone_texture = new THREE.MeshPhongMaterial({color: 0xffffff/*, map: loader.load('content/textures/Stone/stone.png')*/});
stone_texture.shininess = 0


function dist(a,b){
	console.log(Math.sqrt( Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2)));
	return Math.sqrt( Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));
}

export var map = worldmap;
// export var map = [];

// console.log(BLOCKS);



/* ======================== TERRAIN GENERATION ======================== */



var size = 10;
let multip = (Math.random()+1)*(Math.random()*2);



var offset = 0//Math.round(Math.random() * 1000);

const treeIntensity = 15;

export function terrain(){
	for (var i = -size; i <= size; i++) {
		for (var j = -size; j <= size; j++) {
			var rand = Math.round(noise(i +462, j+462));
			// var rand = 0 + Math.round(noise(i +462, j+462))//-2 + Math.abs(Math.round(Math.random() * (i||1)*(j||1)))//-2 + Math.round(Math.random() * Math.round(Math.random() * Math.round(Math.random() * 3)));
			map.push(new BLOCKS.Grass(i,rand,j));


			for (var k = rand-1; k > rand - 2; k--) {
				map.push(new BLOCKS.Dirt(i,k,j));
			}
			for (var h = rand-2; h > -2; h--) {
				map.push(new BLOCKS.Stone(i,h,j));
			}
			if ( Math.abs(Math.round(Math.random() * (i + j * treeIntensity))) == treeIntensity) {
				tree(i,rand+1,j);
			}
		}
	}
}
terrain();

export function debug(){
	for (var i = -size; i <= size; i++) {
		for (var j = -size; j <= size; j++) {
			var rand = -3 + Math.round(noise(i +offset, j+offset))//-2 + Math.abs(Math.round(Math.random() * (i||1)*(j||1)))//-2 + Math.round(Math.random() * Math.round(Math.random() * Math.round(Math.random() * 3)));
			map.push(new BLOCKS.Grass(i,rand,j));
		}
	}
}


export function flat(){
	for (var i = -size*2; i <= size*2; i++) {
		for (var j = -size*2; j <= size*2; j++) {
			map.push(new BLOCKS.Grass(i,-2,j));
			// var rand = -2 + Math.round(Math.random() * Math.round(Math.random() * Math.round(Math.random() * 3)));
			// console.log(rand);
			// map[map.length -1].block.position.y = rand;

			for (var k = -3; k > -4; k--) {
				map.push(new BLOCKS.Dirt(i,k,j));
			}
			for (var h = -4; h > -5; h--) {
				map.push(new BLOCKS.Stone(i,h,j));
			}
		}
	}
}



export function cube(type = 'Stone'){
	for (var i = -size; i < size; i++) {
		for (var j = -size; j < size; j++) {
			for (var k = -size; k < size; k++) {
				// console.log(Noise3D(i,j,k)+' '+ i+" "+ j+' '+ k)
				// if(Math.abs(Noise3D(i,j,k)) <=5)
				map.push(eval('new BLOCKS.'+type+'('+i+','+k+','+j+')'));
			}
		}
	}
}





/* ======================== NOISE GENERATION ======================== */

function f(x,y){
	return (Math.cos(x/2)+Math.sin((y+x)/2));
}

function noise(x,y){
	var cos = Math.cos;
	var sin = Math.sin;
	var r = Math.floor;
	var min = Math.min;

	return ( ( (Math.cos(x/7) + Math.sin(y/7) ) * 6 + (n(x,y+ r(y/2) )) ) / 2 );
	// return n(x,y);
	// return (((cos(2*x)*cos(2*x)) + cos(x) + sin(.5*y) )/2 )
	return (( (Math.cos(x/3)+Math.sin(y/3)) * f(x,y) )/2 *3);
}

function n(x,y){
	var corners = ( Noise2D(x-1, y-1)+Noise2D(x+1, y-1)+
		Noise2D(x-1, y+1)+Noise2D(x+1, y+1) ) / 16;
	var sides   = ( Noise2D(x-1, y)  +Noise2D(x+1, y)  +
		Noise2D(x, y-1)  +Noise2D(x, y+1) ) / 8;
	var center  =  Noise2D(x, y) /4;
	return corners + sides + center;
}

function Noise2D(x,y)
{
  var n = x + y * 57;
  n = (n<<3) ^ n;
  // return  5-Math.abs(1.0 - ( (n * (n * n * 15731 + 789221) + 1376312589) & 0xffffffff) / 1073741824.0).toString()[3];
  return  Math.round((1.0 - ( (n * (n * n * 15731 + 789221) + 1376312589) & 0xffffffff) / 1073741824.0)*multip);
}

function Noise3D(x,y,z){
	var ab = Noise2D(x, y);
	var ba = Noise2D(y, x);

	var bc = Noise2D(y, z);
	var cb = Noise2D(z, y);

    var ac = Noise2D(x, z);
    var ca = Noise2D(z, x);

    var abc = ab + bc + ac + ba + cb + ca;
    return abc / 6;
}


console.log(map);


/* ======================== TREE GENERATION ======================== */



function tree(x,y,z){
	const minTreeHeight = 2;
	const maxTreeHeight = 6;
	var rand = minTreeHeight + Math.round(Math.random()*(maxTreeHeight - minTreeHeight));

	for (var i = y; i < y + rand; i++) {
		map.push(new BLOCKS.OakLog(x,i,z));
	}
	for (var i = y +rand - 2; i < y + rand; i++) {
		for (var j = x-1; j <= x+1; j++) {
			for (var k = z-1; k <= z+1; k++) {
				var isAir = true;
				for (var m = 0; m < map.length; m++) {
					if(map[m].block.position.equals(new THREE.Vector3(j,i,k))){
						isAir = false;
					}
				}
				if(isAir){
					if (j!=x || k!=z)
						map.push(new BLOCKS.OakLeaves(j,i,k));
				}
			}
		}
	}

	for (var l = y + rand; l < y + rand+ 1 + Math.round(Math.random()); l++) {
		map.push(new BLOCKS.OakLeaves(x,l,z));
		map.push(new BLOCKS.OakLeaves(x-1,l,z));
		map.push(new BLOCKS.OakLeaves(x,l,z-1));
		map.push(new BLOCKS.OakLeaves(x,l,z+1));
		map.push(new BLOCKS.OakLeaves(x+1,l,z));
	}
}





/* ======================== BLOCKS INTERACTION ======================== */



export function place(intersect, ClassName = 'Stone'){
	var position = new THREE.Vector3().copy( intersect.object.position ).floor().add( intersect.face.normal );
	console.log(position);
  if(eval('BLOCKS.'+ClassName)){
	var cube = eval('new BLOCKS.'+ClassName+'('+position.x+','+position.y+','+position.z+')');
  }else if (BLOCKS.BlockList[ClassName]){
	var cube = new BLOCKS.BlockList[ClassName](position.x,position.y-0.5,position.z);
  }
	if (intersect.object.rotation.equals(new THREE.Euler(0,0,0,'XYZ'))) {
		cube.block.position.copy(position);
	}else{

		if(intersect.object.rotation.x >0 && Math.abs(intersect.face.normal.z) == 1){
			cube.block.position.copy(position)
		}
		if(intersect.object.rotation.x >0 && Math.abs(intersect.face.normal.x) == 1){
			cube.block.position.copy(position)
		}
		if(intersect.object.rotation.x >0 && Math.abs(intersect.face.normal.y) == 1){
			cube.block.position.copy(position)
		}


		if(intersect.object.rotation.z >0 && Math.abs(intersect.face.normal.z) == 1){
			cube.block.position.copy(position)
		}
		if(intersect.object.rotation.z >0 && Math.abs(intersect.face.normal.x) == 1){
			cube.block.position.copy(position)
		}
		if(intersect.object.rotation.z >0 && Math.abs(intersect.face.normal.y) == 1){
			cube.block.position.copy(position)
		}
	}

	if(cube instanceof BLOCKS.rotBlock){
		cube.rotate(intersect.object.position);
	}

	console.log(intersect, intersect.face.normal,"\n"+map.length);
	map.push(cube);


	return(map[map.length - 1].block);


	// console.log(map[map.length - 1]);
	// console.log(new THREE.BufferGeometry().setFromObject(cube.block), cube.block.position);
	// cube.position.divideScalar( 1 ).floor().multiplyScalar( 1 ).addScalar(0)
}


export function generate(x,y,z, ClassName = 'Stone', euler = new THREE.Euler(0,0,0,'XYZ')){
  if(eval('BLOCKS.'+ClassName)){
	var cube = eval('new BLOCKS.'+ClassName+'('+x+','+y+','+z+')');
  }else if (BLOCKS.BlockList[ClassName]){
	var cube = new BLOCKS.BlockList[ClassName](x,y,z);
  }
	cube.block.rotation.equals(euler);
	map.push(cube);

	return(map[map.length - 1].block);
}




export function remove(int){
	if (map.length>1)
		for (var i = 0; i < map.length; i++) {
			if(int.object == map[i].block){
				map.splice(i,1);
				// console.log(map);
				console.log(map.length);
				return;
			}
		}
}

export function refreshWorld(){
	for (var i = 0; i < map.length; i++) {
		// if (map[i].className == 'Dirt') {
		// 	for (var j = 0; j < map.length; j++) {
		// 		if (map[j].className == 'Grass')
		// 			if(dist(map[i].position, map[j].position) ==0 ){
		// 				console.log(map[j]);
		// 				map[i].refresh();
		// 				break;
		// 			}
		// 	}
		// }
		if (map[i].className == 'Sealantern') {
			map[i].refresh();
		}

		// if (map[i].className == 'Sand') {
		// 	map[i].target = -10;
		// 	for (var j = 0; j < map.length; j++) {
		// 		if(map[j].block.position.x == map[i].block.position.x && map[j].block.position.z == map[i].block.position.z){
		// 			for (var k = 0; k < map.length; k++) {
		// 				if(map[j].block.position.x == map[k].block.position.x && map[j].block.position.z == map[k].block.position.z){
		// 					if (map[k].block.position.y < map[i].block.position.y && map[k].block.position.y > map[i].target) {
		// 						map[i].target = map[k].block.position.y;
		// 					}
		// 				}
		// 			}
		// 		}
		// 	}
		// 	map[i].block.position.y = map[i].target;
		// }

	}
}



// var BLOCK = function(x,y,z){
// 	this.texture = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0ElEQVR42j1TaVPaUBTNH24tase2o92s2+h0mel0puICIpW6UjYVBAOyCAKyExIgLAEBddraH3B6c1E/nORlXu55955zntBTf+G65WF0aw40yrtoSLu463vRb7gZw7Wd14Omh791DJouCB3lJ8rJDVQyG1ByZn6XUhbkEqtIRj6jeGlEIWWElF3n/XzaCE21Q6t70K7uQ4iIsyjQT7mLT4ievkP87D2iwRkkIgsIn04jIk4jJr7GmfcVQt5RpGJzSMW/IeRfRNA7BSEe+oi7mxA6NTduNTcS4Tf4Owg/ttlr+KBVPfC7R/hbX1+prsd9IRF+CylnoRZXULr8zgSqZCJCG2lhhUTdBb0GtCr7tG9EtWCCVnOilF5FrWiCUM5scqEOpbDOBI3KHm1aSTQn1PImwv5xItiDlFmFnF1DrWAlol2I3hcQ5NwPpM+XGInIPBNc0Pyq5EKr6sTpoYEJoqRVU9lHTdpBKbOOWumeQBfmTz/INvZUB89/0wkgHl6CLvBN28X4N/CxoMnYVxZaL77tnkLQH5W8FW15H0rWTK2ZyY1JLuo1fZBzO6jkVtBStpFJLN7770YkMDUkKNLsDZkEqwwhk9/hkzH0VSeqRduw7bINxfQaxKMREtcOVd5GyPcSdRqHRhgjtslHFNPLSEZn+FQdnbqT3stQSmbEQzOkwQGigXGGePgMwu/uER7QlHdxTiE6cT9FxP+coReHfBOMQfuYC1vyFm47fobQbzooGMdcnIwu4LrtZLIH8fTCm26YBZbzNhJ3Hl1adyhgjYodQpda1AmKqRUeoZQ2k9/Wod80u05Qzm5RTpb5H/FolO6Bg2wmcbMWCKnYF8r+LDQSS8+/krfgigJUl+wIHE5APyAe0tO5Ta3b2Eqf8wkFbAMBz1PqgFq5bh/SJaHwlE2IBT8wguSzphxQnC3sjHhkoNs5hx6dfqt5yCkDjXqM/6F/Rx5wEVOFAAAAAElFTkSuQmCC";
// 	this.position = new THREE.Vector3(x,y,z);
// 	if (typeof(texture_url) != 'object') {
// 		this.material = new THREE.MeshStandardMaterial({color: 0xffffff, map: THREE.ImageUtils.loadTexture(this.texture)});
// 		this.material.shininess = 0;
// 		// this.material.transparent = params.transparency;
// 		this.material.map.magFilter = THREE.NearestFilter;
// 	}
// 		this.block = new THREE.Mesh(eval('new THREE.BoxGeometry(1, 1, 1)'), this.material);
// 		this.block.position.copy(new THREE.Vector3(x,y,z));
// }
// console.log(new BLOCK(0,0,0));



// InstantinateClass('Cl');

// function InstantinateClass(classname, extender = 'Stone'){
// 	eval('var '+classname+`=class `+classname+`{
// 		constructor(){}
// 			call(){
// 				console.log('test');
// 			}
// 		}
// 		`)
// 	console.log(eval(classname));
// 	var a = eval('new asdx()');
// 	a.call();
// }