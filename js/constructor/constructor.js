const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

function save(){
	blocks = document.getElementById('blocklist').getElementsByTagName('li');
	var mod_obj = {
	"name" : "'plugin v:0.0.1'",
	"blocks" : {}
	}

	mod_obj.name = (modname.value.replace(/\s/g, '') + modversion.value.replace(/\s/g, ''));

	for (var i = 0; i < blocks.length; i++) {
		var texture = blocks[i].getElementsByTagName('img')[0].currentSrc;
		var name = blocks[i].getElementsByTagName('input')[1].value.replace(/\s/g, '');
		var light = blocks[i].getElementsByTagName('input')[3].checked;
		var transparent = blocks[i].getElementsByTagName('input')[2].checked;
		var result ={
			"arm" : null,
			"textures" : texture,
			"className": name,
			"constructor": "default",
			"extends" : "Block",
			"light" : light,
			"transparent" : transparent
		}
		mod_obj.blocks[name] = result;
		console.log(mod_obj);
	}
	download(JSON.stringify(mod_obj, null, '\t'),modname.value.replace(/\s/g, '')+'.json');
}

function download(data, filename = 'plugin.json') {
    var file = new Blob([data], {type: 'plugin.json'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'plugin.json');
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}