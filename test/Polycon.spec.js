/* global describe, it, before */

import assert from 'power-assert';
import Polycon from '../out/Polycon';

describe('construction', () => {

	before(() => {
		document.body.innerHTML = window.__html__['test/fixtures/01.html'];
	});

	it('new Polycon()', () => {
		const el = document.getElementById('polycon');
		el.style.width = '400px';
		el.style.height = '300px';
		// el.style.backgroundColor = 'red';
		const polycon = new Polycon(el);
		console.log(polycon.innerHTML);
	});
});
