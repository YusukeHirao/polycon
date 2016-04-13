/**
 * Object that represents the number of any of the absolute value, rate, relative (offset) value.
 *
 */
export default class FlexNumber {

	/**
	 * absolute value
	 */
	private _abs: number = 0;

	/**
	 * rate (%)
	 */
	private _rate: number = 100;

	/**
	 * relative (offset) value
	 */
	private _offset: number = 0;

	/**
	 * current type
	 */
	private _type: 'abs' | 'rate' | 'offset';

	/**
	 * @param anyValue any value
	 */
	constructor (anyValue: string) {

		if (anyValue === undefined) {
			throw new TypeError('Missing arguments for method');
		}

		// to string and remove spaces
		anyValue = `${anyValue}`.trim().replace(/-\s+/, '-');

		if (/^-?[0-9]*\.?[0-9]+$/.test(anyValue)) {
			this._abs = parseFloat(anyValue);
			this._type = 'abs';
		} else if (/^-?[0-9]*\.?[0-9]+\s*%$/.test(anyValue)) {
			this._rate = parseFloat(anyValue.replace('%', ''));
			this._type = 'rate';
		} else if (/^[a-z]+(?:\s*[\-\+]\s*-?\s*[0-9]*\.?[0-9]+)?\s*$/i.test(anyValue)) {
			const [ , sign, _n ]: string[] = anyValue.match(/^[a-z]+(?:\s*([\-\+])\s*(-?[0-9]*\.?[0-9]+))?$/i);
			const n: number = parseFloat(_n) || 0;
			if (sign === '-') {
				this._offset = n * -1;
			} else {
				this._offset = n;
			}
			this._type = 'offset';
		} else {
			throw new TypeError(`Invalid value "${anyValue}", in FlexNumber constructor`);
		}
	}

	/**
	 * evaluate from base number
	 *
	 * @param base base number
	 * @return result
	 */
	public evaluate (base: number): number {
		switch (this._type) {
			case 'abs': return this._abs;
			case 'rate': return base * this._rate / 100;
			case 'offset': return base + this._offset;
			default: throw new Error(`An unexpected error. A Type of FlexNumber instance is undefined`);
		}
	}

}
