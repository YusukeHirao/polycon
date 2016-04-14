/* global describe, it, before */

import assert from 'power-assert';
import Polycon from '../lib/Polycon';

describe('construction', () => {

	before(() => {
		document.body.innerHTML = window.__html__['test/fixtures/01.html'];
	});

	// it('new Polycon()', () => {
	// 	const el = document.getElementById('polycon');
	// 	const polycon = new Polycon(el);
	// 	console.log(polycon.innerHTML);
	// });

	it('Polycon.new()', () => {
		Polycon.new('.polycon');
	});
});
