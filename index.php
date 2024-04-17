<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>mineditor</title>
	<link rel="stylesheet" href="styles/style.css">
	<script>
	  var is_gravity = false;
      var worldmap = [];
      var camera ='';
	</script>
</head>
<body oncontextmenu="return false">
	<header>
		<div id="LOGO"><h2>Mineditor</h2></div>
		<div class="dropdown" id="FileGeneral">
		    <button class="dropbtn">
		    	File
		    </button>
		    <div class="dropdown-content" id="World_General">
		    	<a id="NMW">New World</a>
		    	<a id="NFW">New Flat World</a>
		        <a id="NBW">1 Block World</a>
		    	<a><label for="Finp">Open World</label>
				<input id="Finp" type="file" style='display: none;' accept=".mcsave"></a>
		    	<a id="save_world">Save World</a>
			</div>
		</div>

		<div class="dropdown" id="Exporter">
		    <button class="dropbtn">
		    	Export
		    </button>
		    <div class="dropdown-content">
		    	<a id="gltfexport">Export .gltf</a>
		    	<a id="stlexport">Export .stl</a>
		    	<a id="plyexport">Export .ply</a>
		    	<!--<br>
		    	<p><span>↓↓↓NOT WORKING↓↓↓</span></p>
		    	<a id="objexport">Export .obj</a>-->
			</div>
		</div>

		<div class="dropdown" id="ViewGeneral">
		    <button class="dropbtn">
		    	View
		    </button>
		    <div class="dropdown-content">
		    	<p>shadow options</p>
		    	<a><label for="exp_view">experimental</label><input id="exp_view" type="checkbox"></a>
		    	<br>
		    	<p>Skybox options</p>
		    	<a>
		    		<label for="SkyboxChanger">Change Skybox</label><input type="file" id="SkyboxChanger" style="display:none" accept=".skybox"/>
		    	</a>
			</div>
		</div>

		<div class="dropdown">
		    <button class="dropbtn">
		    	Tools
		    </button>
		    <div class="dropdown-content">
		    	<a>
		    		<label for="plugin_inp">Include Plugin</label>
					<input id="plugin_inp" type="file" style='display: none;' accept=".json" multiple>
				</a>
		    	<br>
		    	<br>
		    	<br>
		    	<p><span2>↓↓↓EXPERIMENTAL↓↓↓</span2></p>
		    	<a href="constructor.html" target="_blank">Plugin Creator</a><!--<span2>experimental</span2>-->
			</div>
		</div>

		<div class="dropdown">
		    <button class="dropbtn">
		    	Options
		    </button>
		    <div class="dropdown-content">

		    	<br>
				<p>
					Shadow options
				</p>
				<br>

			    <div id="shadowmap">
					<label class="switch">
					  <input type="checkbox">
					  <span class="slider round"></span>
					</label>
					Shadowmap
				</div>

				<br>
				<p>
					Movement options
				</p>
				<br>

				<div id="Fly">
					<label class="switch">
					  <input type="checkbox" checked="checked">
					  <span class="slider round"></span>
					</label>
					Move to look direction
				</div>

				<div id="Y">
					<label class="switch">
					  <input type="checkbox" checked="checked">
					  <span class="slider round"></span>
					</label>
					Reverse Y
				</div>
				<div id="X">
					<label class="switch">
					  <input type="checkbox">
					  <span class="slider round"></span>
					</label>
					Reverse X
				</div>

				<br>
				<p>
					Physics options
				</p>
				<br>

				<div id="Gravity">
					<label class="switch">
					  <input type="checkbox" onchange="is_gravity = this.checked">
					  <span class="slider round"></span>
					</label>
					Gravity
				</div>
			</div>
		</div>

		<div class="dropdown">
			<button class="dropbtn">
				<a href="/shop.html" style="color: inherit; text-decoration: none;">Shop</a>
		    </button>
		</div>

	</header>
	<canvas id="canvas" ssad="sa"></canvas>
	<div class="control" id="panel1">
		<input type="text" id="searcher" onkeyup="search()" placeholder="Search for names.." title="Type in a name">
		<ul id="blocks">
			<?
				foreach(glob("content/textures/*", GLOB_ONLYDIR) as $a){
					if(!in_array( explode('/',$a)[2], ['Wool', 'Fire', 'TallGrass', 'Glass', 'Planks', 'Sandstone', 'Flower'] ) )
						print_r('<li attrib="'.explode('/',$a)[2].'" class="textureli" onclick="select(this)">'.explode('/',$a)[2].'<br><img attrib="'.explode('/',$a)[2].'" src="'.glob($a."/*.{png}",GLOB_BRACE )[0].'" alt=""></li>');
					else{
						if (explode('/',$a)[2] == 'Glass') {
							foreach(glob($a.'/*', GLOB_ONLYDIR) as $b){
								print_r('<li attrib="'.explode('/',$b)[3].'" class="textureli" onclick="select(this)">'.explode('/',$b)[3].'<br><img attrib="'.explode('/',$b)[3].'" src="'.glob($b."/*.{png}",GLOB_BRACE )[0].'" alt=""></li>');
							}
						}

						if (explode('/',$a)[2] == 'Planks') {
							foreach(glob($a.'/*.{png}', GLOB_BRACE) as $b){
								$c = explode('.',explode('/',$b)[3])[0];
								print_r('<li attrib="'.$c.'" class="textureli" onclick="select(this)">'.$c.'<br><img attrib="'.$c.'" src="'.$b.'" alt=""></li>');
							}
						}
					}
				}
			?>
		</ul>
	</div>
	<div class="control" id="panel2">
		<div class="options" style="float: left;">

		</div>
		<div class="options" style="float: left; margin: 0 2vw; width: 30vw; text-align:center;">
			<h1> * рекламка * </h1>
			<i><small>как бы вставить? )))</small></i>
		</div>
	</div>
	<div id="floatingDiv">

	</div>
	<script type="module" src="js/main.js"></script>
	<script>
		function select(el){
			li = document.getElementsByClassName('textureli')
			for (var i = 0; i < li.length; i++){
				li[i].className = 'textureli';
			}
			el.className = 'textureli selected';
		}

		select(document.getElementsByClassName('textureli')[4]);


		function search(){
			var input, filter, ul, li, a, i, txtValue;
		    input = document.getElementById("searcher");
		    filter = input.value.toUpperCase();
		    ul = document.getElementById("blocks");
		    li = ul.getElementsByTagName("li");
		    for (i = 0; i < li.length; i++) {
		        a = li[i].attributes[0];
		        txtValue = a.textContent || a.innerText;
		        if (txtValue.toUpperCase().indexOf(filter) > -1) {
		            li[i].style.display = "";
		        } else {
		            li[i].style.display = "none";
		        }
		    }
		}

		var ModList = [];


		// fetch('/content/worlds/world'+logo+'.txt')
		// 		.then(function(response) {
		//     	response.text().then(function(text) {
		//     	var arr = text.split(',');
		// 		// console.log(arr);
		// 		for (var i = 0; i < arr.length; i++) {
		// 	    	data = arr[i].split(' ');
		// 	    	world_blocks.push(eval('new ' + data[3] + '(' +data[0]+ ',' +data[1]+ ',' +data[2]+ ')'));
		// 	    	// console.log(arr[i]);
		// 		}
		//     });
		//   });
	</script>
</body>
</html>