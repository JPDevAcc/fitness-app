	// *** IMPORTANT: METRIC UNIT MUST BE FIRST IN LIST ***
	
	const weightUnitOpts = [
		{value: 'kg'},
		{value: 'lbs'},
		{value: 'st. lbs'}
	] ;

	const heightUnitOpts = [
		{value: 'm'},
		{value: 'ft. in.'}
	] ;

	const distanceUnitOpts = [
		{value: 'km'},
		{value: 'miles'},
	] ;

	const temperatureUnitOpts = [
		{value: 'Celsius'},
		{value: 'Fahrenheit'}
	] ;

	function roundValue(val, decimalPlaces) {
		const scale = Math.pow(10, decimalPlaces) ;
		return Math.round((val * scale)) / scale ;
	}

	export function convertWeight(valsIn, valInUnits, valOutUnits) {
		if (valInUnits === valOutUnits) return [roundValue(valsIn[0], 1), valsIn[1] ? roundValue(valsIn[1], 1) : null] ;

		// Convert to metric
		let valMetric = valsIn[0] ;
		if (valInUnits === 'lbs') valMetric = valsIn[0] * 0.4535924 ;
		if (valInUnits === 'st. lbs') valMetric = valsIn[0] * (0.4535924 * 14) + valsIn[1] * 0.4535924 ;

		// Convert to output units
		let valOut1 = null ;
		let valOut2 = null ;
		
		if (valOutUnits === 'kg') valOut1 = roundValue(valMetric, 1) ;
		if (valOutUnits === 'lbs') valOut1 = Math.floor(valMetric / 0.4535924) ;
		if (valOutUnits === 'st. lbs') {
			const lbs = Math.round(valMetric / 0.4535924) ;
			valOut1 = Math.floor(lbs / 14) ;
			valOut2 = (lbs % 14) ;
		}

		return [valOut1, valOut2] ;
	}

	export function convertHeight(valsIn, valInUnits, valOutUnits) {
		if (valInUnits === valOutUnits) return [roundValue(valsIn[0], 1), valsIn[1] ? roundValue(valsIn[1], 1) : null] ;

		// Convert to metric
		let valMetric = valsIn[0] ;
		if (valInUnits === 'ft. in.') valMetric = valsIn[0] * (0.0254 * 12) + valsIn[1] * 0.0254 ;

		// Convert to output units
		let valOut1 = null ;
		let valOut2 = null ;
		
		if (valOutUnits === 'm') valOut1 = roundValue(valMetric, 1) ;
		if (valOutUnits === 'ft. in.') {
			const inches = Math.round(valMetric / 0.0254) ;
			valOut1 = Math.floor(inches / 12) ;
			valOut2 = (inches % 12) ;
		}

		return [valOut1, valOut2] ;
	}

	export function calcBMIValues(weightKm, heightM) {
		const bmiExact = weightKm / (heightM * heightM) ;
		const bmiPrime = roundValue(bmiExact / 25, 2) ; // Note: For SE Asian and S Chinese populations, this should actually be 23 - in future we could make this configurable
		const bmi = roundValue(bmiExact, 1) ;
		return {bmi, bmiPrime} ;
	}

	export { weightUnitOpts, heightUnitOpts, distanceUnitOpts, temperatureUnitOpts } ;