import {Construct} from './ClassManager.js';

import {CommandSeter, EventSeter} from './main.js';

// import * as THREE from '/js/three.module.js';

// import * as World from './WorldGen.js';

export var pluginList = [];

export function updatePlugins(){
}

export function updateInventory(file){
	var text1;
	var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
        text1 = evt.target.result;
        // console.log(text1);
		text1 = JSON.parse(text1);
		// document.getElementById('floatingDiv').innerHTML += '<img src = "' + text1.blocks.block1.textures || text1.blocks.block1.textures[0] + '">'

		if (!ModList.includes(text1.name)) {

			ModList.push(text1.name);


			if(text1.hasOwnProperty('blocks')){
				document.getElementById('blocks').innerHTML +='<br/><br/><p>Added by plugin. <br/> '+text1.name+'</p><br/><br/>'
				var blocks = text1.blocks;
				for(var block in blocks){
					console.log(blocks[block]);
					Construct(blocks[block].className,blocks[block].textures, blocks[block].light, blocks[block].transparent,blocks[block].extends)
					if (blocks[block].arm != null || blocks[block].arm == "") {
						document.getElementById('blocks').innerHTML +=
						'<li attrib="'+blocks[block].className+'" class="textureli" onclick="select(this)">'+blocks[block].className+'<br><img attrib="'+blocks[block].className+'" src="'+blocks[block].arm+'" alt=""></li>'
					}else if(typeof(blocks[block].textures)!= "object"){
						document.getElementById('blocks').innerHTML +=
						'<li attrib="'+blocks[block].className+'" class="textureli" onclick="select(this)">'+blocks[block].className+'<br><img attrib="'+blocks[block].className+'" src="'+blocks[block].textures+'" alt=""></li>'
					}else if(typeof(blocks[block].textures) == "object"){
						document.getElementById('blocks').innerHTML +=
						'<li attrib="'+blocks[block].className+'" class="textureli" onclick="select(this)">'+blocks[block].className+'<br><img attrib="'+blocks[block].className+'" src="'+blocks[block].textures[0]+'" alt=""></li>'
					}
				}
			}



			// console.log(ModList);

			// console.log(text1)
			if(text1.hasOwnProperty('misc')){
				if (text1.misc.hasOwnProperty('CMD')) {
					var result = text1.misc.CMD
					let cmd =text1.misc.CMD.split('$');
					for (var i = 1; i < cmd.length; i++) {
						// console.log(cmd[i].split(' ')[0]);
						// console.log(text1.misc[cmd[i].split(' ')[0]]);

						let reg = '$'+cmd[i].split(' ')[0];

						result = result.replace(reg,text1.misc[cmd[i].split(' ')[0]]);
						// console.log(result);
					}
					eval(result);
				}

				if (text1.misc.hasOwnProperty('scripts')) {
					for (var script in text1.misc.scripts) {
						eval(text1.misc.scripts[script]);
					}
				}

				if (text1.misc.hasOwnProperty('events')) {
					for (var events in text1.misc.events) {
						EventSeter(text1.misc.events[events]);
					}
				}


				if (text1.misc.hasOwnProperty('commands')) {
					var commands = text1.misc.commands;
					for (var i = 0; i < commands.length; i++) {
						let name = commands[i].name;
						let args_count = commands[i].args_count;
						let cmd = commands[i].command;
						let eventListener = commands[i].eventListener;

						CommandSeter(name,args_count,cmd);

					}
				}

			}
		}
    }//как то вызввать "конструктор"...
}
