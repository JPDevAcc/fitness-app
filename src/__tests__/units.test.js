import * as units from '../utils/units';

describe('Units - roundValue()', () => {

	// Integer inputs
	it('returns 0 when rounding 0 to 0 decimal places', () => {
		expect(units.roundValue(0, 0)).toBe(0) ;
	});

	it('returns 0 when rounding 0 to 2 decimal places', () => {
		expect(units.roundValue(0, 2)).toBe(0) ;
	});

	it('returns -1 when rounding -1 to 0 decimal places', () => {
		expect(units.roundValue(-1, 0)).toBe(-1) ;
	});

	it('returns -1 when rounding -1 to two decimal places', () => {
		expect(units.roundValue(-1, 2)).toBe(-1) ;
	});

	it('returns 1 when rounding 1 to 0 decimal places', () => {
		expect(units.roundValue(1, 0)).toBe(1) ;
	});

	it('returns 1 when rounding 1 to two decimal places', () => {
		expect(units.roundValue(1, 2)).toBe(1) ;
	});

	// Fractional inputs
	it('returns 0 when rounding 0.49 to 0 decimal places', () => {
		expect(units.roundValue(0.49, 0)).toBe(0) ;
	});

	it('returns 0.5 when rounding 0.49 to one decimal places', () => {
		expect(units.roundValue(0.49, 1)).toBe(0.5) ;
	});

	it('returns 0.49 when rounding 0.49 to two decimal places', () => {
		expect(units.roundValue(0.49, 2)).toBe(0.49) ;
	});

	it('returns 1 when rounding 0.5 to 0 decimal places', () => {
		expect(units.roundValue(0.5, 0)).toBe(1) ;
	});

	it('returns 0.5 when rounding 0.5 to one decimal places', () => {
		expect(units.roundValue(0.5, 1)).toBe(0.5) ;
	});

	it('returns 0 when rounding -0.49 to 0 decimal places', () => {
		expect(units.roundValue(-0.49, 0)).toBe(0) ;
	});

	it('returns -0.5 when rounding -0.49 to one decimal places', () => {
		expect(units.roundValue(-0.49, 1)).toBe(-0.5) ;
	});

	it('returns -0.49 when rounding -0.49 to two decimal places', () => {
		expect(units.roundValue(-0.49, 2)).toBe(-0.49) ;
	});

	it('returns 0 when rounding -0.5 to 0 decimal places', () => { // (half-way point rounds up)
		expect(units.roundValue(-0.5, 0)).toBe(0) ;
	});

	it('returns -0.5 when rounding -0.5 to one decimal places', () => {
		expect(units.roundValue(-0.5, 1)).toBe(-0.5) ;
	});
}) ;

describe('Units - convertWeight()', () => {
	// Identity conversions
	it('returns the value unaltered in converting kg -> kg', () => {
		expect(units.convertWeight([60], 'kg', 'kg')).toStrictEqual([60, null]) ;
	});
	it('returns the value unaltered in converting lbs -> lbs', () => {
		expect(units.convertWeight([160.5], 'lbs', 'lbs')).toStrictEqual([160.5, null]) ;
	});
	it('returns the value unaltered in converting st. lbs -> st. lbs', () => {
		expect(units.convertWeight([10, 2], 'st. lbs', 'st. lbs')).toStrictEqual([10, 2]) ;
	});


	// Conversions from kg
	it('returns the correct value converting kg -> lbs', () => {
		expect(units.convertWeight([5], 'kg', 'lbs')[0]).toBeCloseTo(11.023113) ; // (expected value from https://www.calculateme.com)
	});

	it('returns the correct value converting kg -> st. lbs', () => {
		expect(units.convertWeight([10], 'kg', 'st. lbs')[0]).toBe(1) ; // (22.046226 pounds = one stone + remainder)
		expect(units.convertWeight([10], 'kg', 'st. lbs')[1]).toBeCloseTo(8.046226)  ; // (22.046226 % 14 = 8.046226 pounds expected value from https://www.calculateme.com)
	});

	// Conversions from lbs
	it('returns the correct value converting lbs -> kg', () => {
		expect(units.convertWeight([11.023113], 'lbs', 'kg')[0]).toBeCloseTo(5) ;
	});
	it('returns the correct value converting lbs -> st. lbs', () => {
		expect(units.convertWeight([20.5], 'lbs', 'st. lbs')).toStrictEqual([1, 6.5]) ; // (14 pounds in a stone, 6.5 pounds remainder)
	});

	// Conversions from st. lbs
	it('returns the correct value converting st. lbs -> kg', () => {
		expect(units.convertWeight([1, 8.046226], 'st. lbs', 'kg')[0]).toBeCloseTo(10) ; // (inverse of kg -> st. lbs above)
	});
	it('returns the correct value converting st. lbs -> lbs', () => {
		expect(units.convertWeight([1, 6.5], 'st. lbs', 'lbs')).toStrictEqual([20.5, null]) ; // (inverse of lbs -> st. lbs above)
	});
}) ;

describe('Units - convertHeight()', () => {
	// Identity conversions
	it('returns the value unaltered in converting m -> m', () => {
		expect(units.convertHeight([1.5], 'm', 'm')).toStrictEqual([1.5, null]) ;
	});
	it('returns the value unaltered in converting ft. in. -> ft. in.', () => {
		expect(units.convertHeight([5, 8], 'ft. in.', 'ft. in.')).toStrictEqual([5, 8]) ;
	});

	// Conversions from metres
	it('returns the correct value converting m -> ft. in.', () => {
		expect(units.convertHeight([1.5], 'm', 'ft. in.')[0]).toBe(4) ; // (expected value from https://www.calculateme.com)
		expect(units.convertHeight([1.5], 'm', 'ft. in.')[1]).toBeCloseTo(11.06) ; // (expected value from https://www.calculateme.com)
	});

	// Conversions from feet and inches
	it('returns the correct value converting ft. in. -> m', () => {
		expect(units.convertHeight([4, 11.06], 'ft. in.', 'm')[0]).toBeCloseTo(1.5) ; // (inverse of m -> ft. in. above)
	});
}) ;