'use strict';

const fs = require('fs');
const table = require('ansi-color-table');
const prompt = require('prompt-sync')({ sigint: false });

let exit = false;
let readFile = function (path) {
	if (!fs.existsSync(path)) {
		console.log('The file does not exist, please try again.');
	} else {
		try {
			let content = fs.readFileSync(path, 'utf-8'), array = JSON.parse(content);
			if (Array.isArray(array) && array.length) {
				for (let i = 0; i < array.length; i++) {
					for (let j = 0; j < array[i].length; j++) {
						array[i][j] = array[i][j] == 1 ? String(array[i][j]).blue() : String(array[i][j]).red();
					}
				}
				table(array);
			}
		} catch (_) {
			console.log('The file does not has a matrix');
		};
	}
};
	
while (!exit) {
	let path = prompt('Enter the file path: ');
	readFile(path);
	
	let again = prompt('Would you like to load another file?, yes - 1, no - 2: ');
	if (Number(again) == 2) {
		console.log('Thank you to use the application :D');
		exit = true;
	} else {
		continue;
	}
};