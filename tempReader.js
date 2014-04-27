/** tempReader.js */
var fs = require("fs");
var FILE_PATH = "temp_data";

function readTempFile (path, callback) {
	fs.readFile(path, "utf-8", function (err, content) {
		if (err) {
			//TODO: handle errors more gracefully
			console.log(err);
		} else {
			callback(content);
		}
	});
}

function formatTemp (temp, scale) {
	var ret = temp / 1000;
	scale = scale || "F";

	if (scale === "F") {
		ret = ret * 9.0 / 5.0 + 32.0;
	}
	
	return ret;
}

function loadTemp (callback) {
	readTempFile(FILE_PATH, function (content) {
		var ret = "";
		var index = content.indexOf("t=");

		if (index) {
			//the -2 is because we don't want the t= part
			//there may be a more elegant way of doing this
			ret = formatTemp(content.slice(index+2));
		}
		callback(ret);
	});
}

exports.loadTemp = loadTemp;