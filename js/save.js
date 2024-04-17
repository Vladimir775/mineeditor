function download(data, filename = 'world.mcsave') {
    var file = new Blob([data], {type: 'world.mcsave'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, 'world.mcsave');
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'world.mcsave';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

export function save_world(array){
    var text = []
    for (var i = 0; i < array.length; i++) {
        text.push(setline(array[i]));
    }
    download(text,'world','.mcsave');
}

function setline(block){
    return (block.block.position.x)+ ' ' + (block.block.position.y)+ ' ' + block.block.position.z+ ' ' + block.className
}

export function load(){
    var file = document.getElementById('Finp').files[0];
    var result = [];
    var leng;
    if(file){
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");

        reader.onload = function (e) {
            var arr = e.target.result.split(',');
            for (var i = 0; i < arr.length; i++) {
                result.push(arr[i].split(' '));
            }
        }
    }
    return result;
}