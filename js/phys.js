export function intersect_Cubes(a, b) {
  return (a.block.position.x < b.block.geometry.parameters.width && (a.block.geometry.parameters.width + a.block.position.x) > b.block.position.x) &&
         (a.block.position.y < b.block.geometry.parameters.height && (a.block.geometry.parameters.height + a.block.position.y) > b.block.position.y) &&
         (a.block.position.z < b.block.geometry.parameters.depth && (a.block.geometry.parameters.depth + a.block.position.z) > b.block.position.z);
}



var radius = .75;
var height = 1;
var offsetX = 0.25, offsetZ = 0.25;

export function cam_col(a, b) {


	return (a.position.x + offsetX <= b.block.position.x + b.block.geometry.parameters.width && (radius + a.position.x - offsetX) >= b.block.position.x) &&
        ((a.position.y - height) <= b.block.position.y + b.block.geometry.parameters.height && a.position.y >= (b.block.position.y+height)) &&
        (a.position.z + offsetZ <= b.block.position.z + b.block.geometry.parameters.depth && (radius + a.position.z - offsetZ) >= b.block.position.z);
}


export function cam_col2(a, b) {


	return (a.position.x + offsetX <= b.block.position.x + b.block.geometry.parameters.width && (radius + a.position.x - offsetX) >= b.block.position.x) &&
        ((a.position.y + height) <= b.block.position.y + b.block.geometry.parameters.height && a.position.y >= (b.block.position.y-height)) &&
        (a.position.z + offsetZ <= b.block.position.z + b.block.geometry.parameters.depth && (radius + a.position.z - offsetZ) >= b.block.position.z);
}


export function movecol(a,b){
	// console.log(a);
	if ((a.position.y - height) <= b.block.position.y + b.block.geometry.parameters.height && a.position.y+height >= b.block.position.y){
		return (
        	((a.position.y - height) <= b.block.position.y && b.block.position.y + b.block.geometry.parameters.height <= a.position.y+height) &&
			((a.position.x + radius) >= b.block.position.x && (a.position.x)<= b.block.position.x + b.block.geometry.parameters.width) &&
			((a.position.z + radius) >= b.block.position.z && (a.position.z)<= b.block.position.z + b.block.geometry.parameters.depth)
        	)

		//console.log((a.position.y - height) <= b.block.position.y + b.block.geometry.parameters.height && b.block.position.y <= a.position.y+height
			// ((a.position.y - height) <= b.block.position.y && b.block.position.y + b.block.geometry.parameters.height <= a.position.y+height)
			// ((a.position.x) >= b.block.position.x && (a.position.x)<= b.block.position.x + b.block.geometry.parameters.width) &&
			// ((a.position.z) >= b.block.position.z && (a.position.z)<= b.block.position.z + b.block.geometry.parameters.depth)
		//);
	}
	if ((a.position.y + height) >= b.block.position.y && (a.position.y) <= b.block.position.y + b.block.geometry.parameters.height + 0.01){
		console.log()

		return (
			((a.position.x + radius) >= b.block.position.x && (a.position.x)<= b.block.position.x + b.block.geometry.parameters.width) &&
			((a.position.z + radius) >= b.block.position.z && (a.position.z)<= b.block.position.z + b.block.geometry.parameters.depth)
        	)
	}
	// console.log((a.position.x <= b.block.position.x + b.block.geometry.parameters.width && (radius + a.position.x) >= b.block.position.x) &&
 //        ((a.position.y - height) >= b.block.position.y + b.block.geometry.parameters.height && a.position.y <= (b.block.position.y+height)) &&
 //        (a.position.z <= b.block.position.z + b.block.geometry.parameters.depth && (radius + a.position.z) >= b.block.position.z))
	// return (a.position.x <= b.block.position.x + b.block.geometry.parameters.width && (radius + a.position.x) >= b.block.position.x) &&
 //        ((a.position.y - height) >= b.block.position.y + b.block.geometry.parameters.height && a.position.y <= (b.block.position.y+height)) &&
 //        (a.position.z <= b.block.position.z + b.block.geometry.parameters.depth && (radius + a.position.z) >= b.block.position.z);
}