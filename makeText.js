const fs = require('fs');
const process = require('process');
const markov = require('./markov').default;
const axios = require('axios');

function generateText(text) {
	let mm = new markov.MarkovMachine(text);
	console.log(mm.makeText());
}

// NOTE: generates text if path is a file
function makeText(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error('ERROR', err);
			process.exit(1);
		} else {
			generateText(data);
		}
	});
}
// NOTE: generates text if path is a url
async function makeURLText(url) {
	let resp;
	try {
		resp = await axios.get(url);
	} catch (err) {
		console.error('ERROR', err);
		process.exit(1);
	}
	generateText(resp.data);
}

let [method, path] = process.argv.slice(2); //method either file or url

if (method === 'file') {
	makeText(path);
} else if (method === 'url') {
	makeURLText(path);
} else {
	console.error(`Unknown method: ${method}`);
	process.exit(1);
}
