import { GLTFExporter } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/GLTFExporter.js';

import { STLExporter } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/STLExporter.js';

// import { OBJExporter } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/OBJExporter.js';

import { PLYExporter } from 'https://threejsfundamentals.org/threejs/resources/threejs/r115/examples/jsm/exporters/PLYExporter.js';


export function exportGLTF( input ) {
	var gltfExporter = new GLTFExporter();

	var options = {
		trs: false,
		onlyVisible: true,
		truncateDrawRange: true,
		binary: false,
		forcePowerOfTwoTextures: false,
		maxTextureSize: 4096//Number( document.getElementById( 'option_maxsize' ).value ) || Infinity // To prevent NaN value
	};
	gltfExporter.parse( input, function ( result ) {
		if ( result instanceof ArrayBuffer ) {
			saveArrayBuffer( result, 'scene.glb' );
		} else {
			var output = JSON.stringify( result, null, 2 );
			// console.log( output );
			saveString( output, 'scene.gltf' );
		}
	}, options );
}


export function exportASCII(scene) {
	var exporter =  new STLExporter();
	var result = exporter.parse( scene );
	saveString( result, 'box.stl' );
}


function saveString( text, filename ) {
	save( new Blob( [ text ], { type: 'text/plain' } ), filename );
}

function save( blob, filename ) {
	var link = document.createElement('a');
	link.href = URL.createObjectURL( blob );
	link.download = filename;
	link.click();

	// URL.revokeObjectURL( url ); breaks Firefox...
}


export function exportToObj(scene) {
	var exporter = new OBJExporter();
	var result = exporter.parse( scene );
	floatingDiv.style.display = 'block';
	floatingDiv.innerHTML = result.split( '\n' ).join( '<br />' );
}


export function PLYExport(scene){
	var exporter = new PLYExporter();

// Parse the input and generate the ply output
	var data = exporter.parse( scene );
	saveString(data, 'scene.ply');
}