import * as THREE from '/js/three.module.js';

export function LoadTexture(texture_url){
	var loader = new THREE.TextureLoader();
	return(loader.load(texture_url));
}


export var BlockList = [];

export function Construct(className,texture_url, light = false, transp = false, extend= 'Block'){
	// var className = className;
	// var texture_url = texture_url;
	if (extend == 'Block') {
		BlockList[className] = function(x,y,z){
			var  params = {type : 'Solid', mesh: 'new THREE.BoxGeometry(1, 1, 1)', meshMat: 'new THREE.MeshPhongMaterial', transparency : false, side : 'THREE.FrontSide'}
			this.position = new THREE.Vector3(x,y,z);
			if (typeof(texture_url) != 'object') {
				this.material = new THREE.MeshStandardMaterial({color: 0xffffff, map: LoadTexture(texture_url)});
				this.material.shininess = 0;
				// this.material.transparent = params.transparency;
				this.material.map.magFilter = THREE.NearestFilter;
				this.material.transparent = transp;
			}else{
				this.material = [];
				for (var i = 0; i < texture_url.length; i++) {
					this.material.push(new THREE.MeshStandardMaterial({color: 0xffffff, map:LoadTexture(texture_url[i])}));
					this.material[this.material.length-1].transparent = true;
					this.material[this.material.length-1].shininess = 0
					this.material[this.material.length-1].map.magFilter = THREE.NearestFilter;
					this.material[this.material.length-1].transparent = transp;
				}
			}
			this.className = className;
			this.type = params.type;
			this.block = new THREE.Mesh(eval(params.mesh), this.material);
			// this.block.position = this.position;
			// this.block.receiveShadow = true
			// this.block.castShadow = true;

			this.block.position.copy(new THREE.Vector3(x,y,z));

			if(light){
				this.block.castShadow = false;
				this.block.receiveShadow = false;
				{
				  const color = 0xFFFFFF;
				  const intensity = 1;
				  const light = new THREE.PointLight(color, intensity, 10);
				  light.castShadow = true;
				  light.position.set(x,y,z);
				  this.block.add(light);
				}
			}
		}
	}else if (extend == 'Slab') {
		BlockList[className] = function(x,y,z){
			var  params = {type : 'Solid', mesh: 'new THREE.BoxGeometry(1, 0.5, 1)', meshMat: 'new THREE.MeshPhongMaterial', transparency : false, side : 'THREE.FrontSide'}
			this.position = new THREE.Vector3(x,y,z);
			if (typeof(texture_url) != 'object') {
				this.material = new THREE.MeshStandardMaterial({color: 0xffffff, map: LoadTexture(texture_url)});
				this.material.shininess = 0;
				// this.material.transparent = params.transparency;
				this.material.map.magFilter = THREE.NearestFilter;
				this.material.transparent = transp;
			}else{
				this.material = [];
				for (var i = 0; i < texture_url.length; i++) {
					this.material.push(new THREE.MeshStandardMaterial({color: 0xffffff, map:LoadTexture(texture_url[i])}));
					this.material[this.material.length-1].transparent = true;
					this.material[this.material.length-1].shininess = 0
					this.material[this.material.length-1].map.magFilter = THREE.NearestFilter;
					this.material[this.material.length-1].transparent = transp;
				}
			}
			this.className = className;
			this.type = params.type;
			this.block = new THREE.Mesh(eval(params.mesh), this.material);
			// this.block.position = this.position;
			// this.block.receiveShadow = true
			// this.block.castShadow = true;
			y -= 0.75;
			this.block.position.copy(new THREE.Vector3(x,y,z));

			if(light){
				this.block.castShadow = false;
				this.block.receiveShadow = false;
				{
				  const color = 0xFFFFFF;
				  const intensity = 1;
				  const light = new THREE.PointLight(color, intensity, 10);
				  light.castShadow = true;
				  light.position.set(x,y-0.1,z);
				  this.block.add(light);
				}
			}
		}
	}
	// console.log(BlockList);
}


// THREE.Vector3();
var W = 1, H=1, D=1;

class Block{
	constructor(x,y,z, texture_url,className, params = {type : 'Solid', mesh: 'new THREE.BoxGeometry(1, 1, 1)', meshMat: 'new THREE.MeshPhongMaterial', transparency : false, side : 'THREE.FrontSide'}){
		// console.log(params)
		this.position = new THREE.Vector3(x,y,z);
		if (typeof(texture_url) != 'object') {
			this.material = new THREE.MeshStandardMaterial({color: 0xffffff, map: LoadTexture(texture_url)});
			this.material.shininess = 0;
			// this.material.transparent = params.transparency;
			this.material.map.magFilter = THREE.NearestFilter;
		}else{
			this.material = [];
			for (var i = 0; i < texture_url.length; i++) {
				this.material.push(new THREE.MeshStandardMaterial({color: 0xffffff, map:LoadTexture(texture_url[i])}));
				// this.material[this.material.length-1].transparent = true;
				this.material[this.material.length-1].shininess = 0
				this.material[this.material.length-1].map.magFilter = THREE.NearestFilter;
			}
		}
		this.className = className;
		this.type = params.type;
		this.block = new THREE.Mesh(eval(params.mesh), this.material);
		// this.block.position = this.position;
		// this.block.receiveShadow = true
		// this.block.castShadow = true;

		this.block.position.copy(new THREE.Vector3(x,y,z));
	}
}

export class rotBlock extends Block{
	constructor(x,y,z,texture,className){
		super(x,y,z,texture,className);
	}

	rotate(vec){
		var x1 = vec.x;
		var y1 = vec.y;
		var z1 = vec.z;

		var px = this.block.position.x;
		var py = this.block.position.y;
		var pz = this.block.position.z;

		if (px == x1 && pz == z1) {
			this.block.rotation.copy(new THREE.Euler(0,0,0,'XYZ'));
		}

		if (px == x1 && py == y1) {
			this.block.rotation.copy(new THREE.Euler(1.5708,0,0,'XYZ'));
		}
		if (pz == z1 && py == y1) {
			this.block.rotation.copy(new THREE.Euler(0,0,1.5708,'XYZ'));
		}
	}
}

class Falling extends Block{
	constructor(x,y,z,texture,className){
		super(x,y,z,texture,className);
		this.target = NaN;
	}

	fall(){

	}
}



export class Stone extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Stone/stone.png','Stone');
		// this.block.material.
		//console.log(this);
	}
}

export class Stonebrick extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Stonebrick/stonebrick.png','Stonebrick');
		//console.log(this);
	}
}

export class Dirt extends Block{
	constructor(x,y,z, timeUntillGrass = 10){
		super(x,y,z,'/content/textures/Dirt/dirt.png','Dirt');
		this.timeUntillGrass = timeUntillGrass;
		this.refresh()
	}

	refresh(){
		if (this.timeUntillGrass > 0) {
			this.timeUntillGrass -= 0.1;
		}else{
			this.grass();
		}
	}

	grass(){
		var texture_url = ['/content/textures/Grass/dirt.png','/content/textures/Grass/dirt.png', '/content/textures/Grass/adirt.png', '/content/textures/Grass/bdirt.png','/content/textures/Grass/dirt.png', '/content/textures/Grass/dirt.png'];

		this.className = 'Grass';
		this.material = [];
		for (var i = 0; i < texture_url.length; i++) {
			this.material.push(new THREE.MeshPhongMaterial({color: 0xffffff, map:LoadTexture(texture_url[i])}));
			this.material[this.material.length-1].transparent = true;
		}
		this.block.material = this.material;
	}
}

export class Grass extends Block{
	constructor(x,y,z, timeUntillDirt = 100){
		super(x,y,z,['/content/textures/Grass/dirt.png','/content/textures/Grass/dirt.png', '/content/textures/Grass/adirt.png', '/content/textures/Grass/bdirt.png','/content/textures/Grass/dirt.png', '/content/textures/Grass/dirt.png',],'Grass');
		//console.log(this);
		this.timeUntillDirt = timeUntillDirt;
	}
}

export class Sealantern extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Sealantern/block.png','Sealantern');
		console.log(this)
		this.block.material.map.wrapS = this.block.material.map.wrapT = THREE.RepeatWrapping;
	    this.block.material.map.repeat.set(1, 0.2);
		//console.log(this);
		this.refresh();
		this.block.castShadow = false;
		this.block.receiveShadow = false;
		{
		  const color = 0xFFFFFF;
		  const intensity = 1;
		  const light = new THREE.PointLight(color, intensity, 10);
		  light.castShadow = true;
		  light.position.set(x,y,z);
		  this.block.add(light);
		}
		this.block.material.shininess = 0;
	}

	refresh(){
		this.block.material.map.offset.y -= 0.2;
	}
}

export class WhiteGlass extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Glass/WhiteGlass/WhiteGlass.png','WhiteGlass');
		this.block.material.transparent = true;
		this.block.castShadow = false;
	}
}

export class AcaciaPlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/AcaciaPlanks.png','AcaciaPlanks');
	}
}
export class BOakPlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/BOakPlanks.png','BOakPlanks');
	}
}
export class OakPlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/OakPlanks.png','OakPlanks');
	}
}
export class BirchPlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/BirchPlanks.png','BirchPlanks');
	}
}

export class SprucePlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/SprucePlanks.png','SprucePlanks');
	}
}
export class JunglePlanks extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/Planks/JunglePlanks.png','JunglePlanks');
	}
}


export class OakLog extends rotBlock{
	constructor(x,y,z, timeUntillDirt = 100){
		super(x,y,z,['/content/textures/OakLog/OakLog.png','/content/textures/OakLog/OakLog.png','/content/textures/OakLog/OakLogt.png','/content/textures/OakLog/OakLogt.png','/content/textures/OakLog/OakLog.png','/content/textures/OakLog/OakLog.png'],'OakLog');
		//console.log(this);
	}
}


export class OakLeaves extends Block{
	constructor(x,y,z){
		super(x,y,z,'/content/textures/OakLeaves/OakLeaves.png','OakLeaves');
		this.block.material.transparent = true;
		this.block.material.side = THREE.DoubleSide;
	}
}



export class Sand extends Falling{
	constructor(x,y,z, timeUntillDirt = 100){
		super(x,y,z,'/content/textures/Sand/sand.png','Sand');
		//console.log(this);
	}
}


// export class Sealantern extends Block{
// 	constructor(x,y,z){
// 		super(x,y,z,'/content/textures/Sealantern/block.png','Sealantern');
// 		console.log(this)
// 		this.block.material.map.wrapS = this.block.material.map.wrapT = THREE.RepeatWrapping;
// 	    this.block.material.map.repeat.set(1, 0.2);
// 		//console.log(this);
// 		this.refresh();
// 		this.block.castShadow = false;
// 		this.block.receiveShadow = false;
// 		{
// 		  const color = 0xFFFFFF;
// 		  const intensity = 1;
// 		  const light = new THREE.PointLight(color, intensity, 10);
// 		  light.castShadow = true;
// 		  light.position.set(x,y,z);
// 		  this.block.add(light);
// 		}
// 		this.block.material.shininess = 0;
// 	}

// 	refresh(){
// 		this.block.material.map.offset.y -= 0.2;
// 	}
// }


export class TallGrass extends Block{
	constructor(x,y,z){
		var i = Math.round(Math.random()*3)+1;
		super(x,y,z,['/content/textures/TallGrass/tallgrass'+i+'.png','/content/textures/TallGrass/tallgrass'+i+'.png','content/textures/air.png','content/textures/air.png','/content/textures/TallGrass/tallgrass'+i+'.png','/content/textures/TallGrass/tallgrass'+i+'.png'],'TallGrass');
		console.log(this);
		for (var i = 0; i < this.block.material.lengths; i++) {
			this.block.material[this.block.material.length-1].transparent = true;
			this.block.material[this.block.material.length-1].side = THREE.DoubleSide;
		}
	}
}