var socket = io.connect('http://localhost');
var temp = findByClass('temp');
var timeStamp = findByClass('timeStamp');

socket.on('tempReading', function (data) {
	console.log(data);
	temp.innerHTML = data.temp;
	timeStamp.innerHTML = data.timeStamp;
});


function findByClass (matchClass) {
    var elems = document.getElementsByTagName('*'), i;
    var found = false;
    for (i in elems) {
    	found = (' ' + elems[i].className + ' ').indexOf(' ' + matchClass + ' ')
                > -1
        if(found) {
        	return elems[i];
        }
    }

    return null
}
