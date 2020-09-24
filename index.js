var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var box = document.getElementById('box');

var loop;

startButton.onclick = () => {
	startButton.disabled = 'disabled';
	document.getElementById('text').innerHTML = 'Started';
	loop = setInterval(isAvailable, 2000);
};

stopButton.onclick = () => {
	startButton.removeAttribute('disabled');
	document.getElementById('text').innerHTML = 'Stopped';
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
	getJSON('https://api-prod.nvidia.com/direct-sales-shop/DR/products/en_us/USD/5438481700', function (err, data) {
		try {
			if (data.products.product[0].inventoryStatus.status !== 'PRODUCT_INVENTORY_OUT_OF_STOCK') {
				box.className = 'color-box-green';
				box.innerHTML = 'Found one';
				clearInterval(loop);
				var path = './alarm_beep.wav';
				var snd = new Audio(path);
				snd.play();
				window.open('https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/', '_blank');
			} else {
				box.innerHTML = 'Nothing So Far';
				box.className = 'color-box-red';
				console.log('Nothing so far');
			}
		} catch (error) {
			console.log('Error');
			console.log(err);
		}
	});
}
