const { MarkovMachine } = require('./markov');

test('checking markov chains', () => {
	let markov = new MarkovMachine('this is this and this is that');
	expect(markov.chains).toEqual(
		new Map([
			['this', ['is', 'and', 'is']],
			['is', ['this', 'that']],
			['and', ['this']],
			['that', [null]]
		])
	);
});

test('choice picks', () => {
	expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
});

test('get text', () => {
	let markov = new MarkovMachine('this is this and this is that');
	expect(markov.makeText()).toContain('that');
});
