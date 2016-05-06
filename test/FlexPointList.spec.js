/* global describe, it */

import assert from 'power-assert';
import FlexPointList from '../lib/FlexPointList';

describe('FlexPointList._mediaQueryParse', () => {
	it('0,0 w,0 w,h 0,h', () => {
		assert.deepEqual(FlexPointList._mediaQueryParse('0,0 w,0 w,h 0,h'), { 'default': '0,0 w,0 w,h 0,h' });
	});
	it('@media default { 0,0 w,0 w,h 0,h }', () => {
		assert.deepEqual(FlexPointList._mediaQueryParse('@media default { 0,0 w,0 w,h 0,h }'), { 'default': '0,0 w,0 w,h 0,h' });
	});
	it('@media default { 0,0 w,0 w,h 0,h } @media (max-width: 640px) { 0,0 w,0 w,h 0,h }', () => {
		assert.deepEqual(FlexPointList._mediaQueryParse('@media default { 0,0 w,0 w,h 0,h } @media (max-width: 640px) { 0,0 w,0 w,h 0,h }'), { 'default': '0,0 w,0 w,h 0,h', '(max-width: 640px)': '0,0 w,0 w,h 0,h' });
	});
});

describe('update', () => {
	it('(30,40) => (30,40)', () => {
		const list = new FlexPointList('0,0 w,0 w,h 0,h');
		// first set
		list.update(0, 30, 40);
		list.update(1, 30, 40);
		list.update(2, 30, 40);
		list.update(3, 30, 40);
		// change
		assert(!list.update(0, 30, 40).isChanged);
		assert(!list.update(1, 30, 40).isChanged);
		assert(!list.update(2, 30, 40).isChanged);
		assert(!list.update(3, 30, 40).isChanged);
	});
	it('(30,40) => (31,40)', () => {
		const list = new FlexPointList('0,0 w,0 w,h 0,h');
		// first set
		list.update(0, 30, 40);
		list.update(1, 30, 40);
		list.update(2, 30, 40);
		list.update(3, 30, 40);
		// change
		assert(!list.update(0, 31, 40).isChanged);
		assert(list.update(1, 31, 40).isChanged);
		assert(list.update(2, 31, 40).isChanged);
		assert(!list.update(3, 31, 40).isChanged);
	});
	it('(30,40) => (30,39)', () => {
		const list = new FlexPointList('0,0 w,0 w,h 0,h');
		// first set
		list.update(0, 30, 40);
		list.update(1, 30, 40);
		list.update(2, 30, 40);
		list.update(3, 30, 40);
		// change
		assert(!list.update(0, 30, 39).isChanged);
		assert(!list.update(1, 30, 39).isChanged);
		assert(list.update(2, 30, 39).isChanged);
		assert(list.update(3, 30, 39).isChanged);
	});
});
