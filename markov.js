/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/); // NOTE: split text into separate lines
		this.words = words.filter(c => c !== ''); // NOTE: filter only words, not including empty lines
		this.makeChains();
	}

	makeChains(words) {
		let chains = new Map(); // NOTE: Map is object with key-value pairs
		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i]; // NOTE: pick a word
			let nextWord = this.words[i + 1] || null; // NOTE: pick next word
			if (chains.has(word)) {
				// NOTE: if chain object has the word
				chains.get(word).push(nextWord); // NOTE: word has to be a key
			} else {
				chains.set(word, [nextWord]); // NOTE: set word as key, and nextWord as [value]
			}
		}
		this.chains = chains;
	}

	static choice(arr) {
		// NOTE: if arr = [1,2,3]
		let idx = Math.floor(Math.random() * arr.length); // NOTE: returns random num which will equal index
		return arr[idx]; // NOTE: returns random index of array
	}

	makeText(numWords = 100) {
		let keys = Array.from(this.chains.keys()); // NOTE: make an array out of chain keys
		let key = MarkovMachine.choice(keys); // NOTE: choose a key at random
		let out = [];

		// NOTE: produce markov chain until reaching termination word
		while (out.length < numWords && key !== null) {
			out.push(key);
			key = MarkovMachine.choice(this.chains.get(key));
		}

		return out.join(' ');
	}
}

module.exports = {
	MarkovMachine
};
