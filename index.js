var startButton = document.getElementById('startButton');
var stopButton = document.getElementById('stopButton');
var sound = document.getElementById('sound');

var loop;

startButton.onclick = () => {
	loop = setInterval(isAvailable, 2000);
};

stopButton.onclick = () => {
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
			if (data.products.product[0].inventoryStatus.status == 'PRODUCT_INVENTORY_OUT_OF_STOCK') {
				clearInterval(loop);
				var path = './alarm_beep.wav';
				var snd = new Audio(path);
				snd.play();
				console.log('PLAY');
				// window.open('https://www.nvidia.com/en-us/geforce/graphics-cards/30-series/rtx-3080/', '_blank');
			}
		} catch (error) {
			console.log('Error');
			console.log(err);
		}
	});
}
