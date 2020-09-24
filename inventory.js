const { JSDOM } = require('jsdom');
const axios = require('axios');
const express = require('express');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res, next) => {
	try {
		const { data } = await axios.get('https://www.newegg.com/p/pl?d=rtx+3080&N=100006662');
		const dom = new JSDOM(data, {
			runScripts: 'dangerously',
			resources: 'usable'
		});
		const document = dom.window.document;
		// let list = document.querySelector('.item-cells-wrap');
		// console.log(list);
		let listOfItems = document.querySelectorAll('.item-cell');
		let inventoryJSON = [];
		listOfItems.forEach((even) => {
			try {
				let inventory = even.querySelector('.btn-mini').textContent;
				let title = even.querySelector('.item-title').textContent;
				let url = even.querySelector('.item-container').querySelector('a').getAttribute('href');
				if (inventory === 'Add to cart ') {
					inventoryJSON.push({ title, url });
				}
			} catch (error) {
				console.log('skipped');
			}
		});
		res.json(inventoryJSON);
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
