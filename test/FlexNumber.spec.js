/* global describe, it */

import assert from 'power-assert';
import FlexNumber from '../out/FlexNumber';

describe('Parse', () => {
	it('absolute number 0', () => {
		assert(new FlexNumber('0')._abs === 0);
	});
	it('absolute number -0', () => {
		assert(new FlexNumber('-0')._abs === 0);
	});
	it('absolute number 1', () => {
		assert(new FlexNumber('1')._abs === 1);
	});
	it('absolute number -1', () => {
		assert(new FlexNumber('-1')._abs === -1);
	});
	it('absolute number -\\s\\s1', () => {
		assert(new FlexNumber('-  1')._abs === -1);
	});
	it('absolute number 1.0', () => {
		assert(new FlexNumber('1.0')._abs === 1);
	});
	it('absolute number -1.0', () => {
		assert(new FlexNumber('-1.0')._abs === -1);
	});
	it('absolute number 3.14', () => {
		assert(new FlexNumber('3.14')._abs === 3.14);
	});
	it('absolute number -3.14', () => {
		assert(new FlexNumber('-3.14')._abs === -3.14);
	});
	it('absolute number .99', () => {
		assert(new FlexNumber('.99')._abs === 0.99);
	});
	it('absolute number -.99', () => {
		assert(new FlexNumber('-.99')._abs === -0.99);
	});
	it('rate 1%', () => {
		assert(new FlexNumber('1%')._rate === 1);
	});
	it('rate -1%', () => {
		assert(new FlexNumber('-1%')._rate === -1);
	});
	it('rate 1\\s%', () => {
		assert(new FlexNumber('1 %')._rate === 1);
	});
	it('rate 99%', () => {
		assert(new FlexNumber('99%')._rate === 99);
	});
	it('rate -99%', () => {
		assert(new FlexNumber('-99%')._rate === -99);
	});
	it('rate 99.99%', () => {
		assert(new FlexNumber('99.99%')._rate === 99.99);
	});
	it('rate -99.99%', () => {
		assert(new FlexNumber('-99.99%')._rate === -99.99);
	});
	it('offset v', () => {
		assert(new FlexNumber('v')._offset === 0);
	});
	it('offset v + 0', () => {
		assert(new FlexNumber('v + 0')._offset === 0);
	});
	it('offset v - 1', () => {
		assert(new FlexNumber('v - 0')._offset === 0);
	});
	it('offset v+10', () => {
		assert(new FlexNumber('v+10')._offset === 10);
	});
	it('offset v-10', () => {
		assert(new FlexNumber('v-10')._offset === -10);
	});
	it('offset \\sv\\s+\\10\\s', () => {
		assert(new FlexNumber(' v + 10 ')._offset === 10);
	});
	it('invalid value 1\\s.0', () => {
		assert.throws(() => new FlexNumber('1 .1'));
	});
	it('invalid value 99\\s.\\s99%', () => {
		assert.throws(() => new FlexNumber('99 . 99%'));
	});
	it('invalid value \\sv\\s+\\10\\s', () => {
		assert.throws(() => new FlexNumber(' v 10 '));
	});
});

describe('Evaluate', () => {
	it('abs 0', () => {
		assert(new FlexNumber('0').evaluate(0) === 0);
	});
	it('abs 0 --2', () => {
		assert(new FlexNumber('0').evaluate(100) === 0);
	});
	it('rate 0%', () => {
		assert(new FlexNumber('0%').evaluate(100) === 0);
	});
	it('rate 50%', () => {
		assert(new FlexNumber('50%').evaluate(100) === 50);
	});
	it('rate 100%', () => {
		assert(new FlexNumber('100%').evaluate(100) === 100);
	});
	it('offset v + 0', () => {
		assert(new FlexNumber('v + 0').evaluate(100) === 100);
	});
	it('offset v + 20', () => {
		assert(new FlexNumber('v + 20').evaluate(100) === 120);
	});
	it('offset v - 20', () => {
		assert(new FlexNumber('v - 20').evaluate(100) === 80);
	});
});
