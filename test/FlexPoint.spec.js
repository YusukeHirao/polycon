/* global describe, it */

import assert from 'power-assert';
import FlexPoint from '../lib/FlexPoint';

describe('Evaluate', () => {
	it('(x,y)(30,40) => (30,40)', () => {
		assert.deepEqual(new FlexPoint('x', 'y').evaluate(30, 40), { x: 30, y: 40 });
	});
	it('(x+20,y-20)(30,40) => (30,40)', () => {
		assert.deepEqual(new FlexPoint('x+20', 'y-20').evaluate(30, 40), { x: 50, y: 20 });
	});
	it('(20%,-20%)(30,40) => (30,40)', () => {
		assert.deepEqual(new FlexPoint('20%', '-20%').evaluate(30, 40), { x: 6, y: -8 });
	});
});
