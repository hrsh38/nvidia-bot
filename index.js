var startButtonNvidia = document.getElementById('startButtonNvidia1');
var stopButtonNvidia = document.getElementById('stopButtonNvidia1');
var testButtonNvidia = document.getElementById('testButtonNvidia1');
var box = document.getElementById('box');

var loopNvidia;

testButtonNvidia.onclick = () => {
	isAvailable(true);
};

startButtonNvidia.onclick = () => {
	startButtonNvidia.disabled = 'disabled';
	document.getElementById('text1').innerHTML = 'Started';
	loopNvidia = setInterval(isAvailableNvidia, 5000);
};

stopButtonNvidia.onclick = () => {
	startButtonNvidia.removeAttribute('disabled');
	document.getElementById('text1').innerHTML = 'Stopped';
	clearInterval(loopNvidia);
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

function isAvailableNvidia(success) {
	getJSON('https://api-prod.nvidia.com/direct-sales-shop/DR/products/en_us/USD/5438481700', function (err, data) {
		try {
			if (data.products.product[0].inventoryStatus.status !== 'PRODUCT_INVENTORY_OUT_OF_STOCK' || success) {
				box.className = 'color-box-green';
				box.innerHTML = 'Found one';
				clearInterval(loopNvidia);
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
			box.innerHTML = 'Error, refresh';
			console.log('Error');
			console.log(err);
		}
	});
}
