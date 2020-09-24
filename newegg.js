var startButton = document.getElementById('startButton2');
var stopButton = document.getElementById('stopButton2');
var list = document.getElementById('list');

var loop;

startButton.onclick = () => {
	startButton.disabled = 'disabled';
	document.getElementById('text2').innerHTML = 'Started';
	loop = setInterval(isAvailable, 5000);
};

stopButton.onclick = () => {
	startButton.removeAttribute('disabled');
	document.getElementById('text2').innerHTML = 'Stopped';
	clearInterval(loop);
};

var getJSON = function (url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function () {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};

function isAvailable() {
	getJSON(document.URL + 'inventory', function (err, data) {
		try {
			console.log(data);
			if (data.length > 0) {
				var path = './alarm_beep.wav';
				var snd = new Audio(path);
				snd.play();
				// box.className = 'color-box-green';
				// box.innerHTML = 'Found one';
				data.forEach((item) => {
					var node = document.createElement('li');
					var a = document.createElement('a');
					var linkText = document.createTextNode(item.title);
					a.appendChild(linkText);
					a.href = item.url;
					node.appendChild(a);
					list.appendChild(node);
					window.open(item.url, '_blank');
				});
				clearInterval(loop);
			} else {
				// box.innerHTML = 'Nothing So Far';
				// box.className = 'color-box-red';
				console.log('Nothing so far');
			}
		} catch (error) {
			// box.innerHTML = 'Error, refresh';
			console.log('Error');
			console.log(err);
		}
	});
}
