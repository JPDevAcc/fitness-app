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

	export function roundValue(val, decimalPlaces) {
		const scale = Math.pow(10, decimalPlaces) ;
		let result = Math.round((val * scale)) / scale ;
		return (result === 0) ? 0 : result ; // (convert -0 to 0)
	}

	export function convertWeight(valsIn, valInUnits, valOutUnits) {
		const kg_per_lbs = 0.4535924 ;
		const lbs_per_st = 14 ;
		const kg_per_st = (kg_per_lbs * lbs_per_st) ;

		if (valInUnits === valOutUnits) return [valsIn[0], valsIn[1] ?? null] ;

		// Convert to metric
		let valMetric = valsIn[0] ;
		if (valInUnits === 'lbs') valMetric = valsIn[0] * kg_per_lbs ;
		if (valInUnits === 'st. lbs') valMetric = valsIn[0] * kg_per_st + valsIn[1] * kg_per_lbs ;

		// Convert to output units
		let valOut1 = null ;
		let valOut2 = null ;
		
		if (valOutUnits === 'kg') valOut1 = valMetric ;
		if (valOutUnits === 'lbs') valOut1 = valMetric / kg_per_lbs ;
		if (valOutUnits === 'st. lbs') {
			const lbs = valMetric / kg_per_lbs ;
			valOut1 = Math.floor(lbs / lbs_per_st) ;
			valOut2 = (lbs % lbs_per_st) ;
		}

		return [valOut1, valOut2] ;
	}

	export function convertHeight(valsIn, valInUnits, valOutUnits) {
		const m_per_inc = 0.0254 ;
		const in_per_ft = 12 ;
		const m_per_ft = (m_per_inc * in_per_ft) ;

		if (valInUnits === valOutUnits) return [valsIn[0], valsIn[1] ?? null] ;

		// Convert to metric
		let valMetric = valsIn[0] ;
		if (valInUnits === 'ft. in.') valMetric = valsIn[0] * m_per_ft + valsIn[1] * m_per_inc ;

		// Convert to output units
		let valOut1 = null ;
		let valOut2 = null ;
		
		if (valOutUnits === 'm') valOut1 = valMetric ;
		if (valOutUnits === 'ft. in.') {
			const inches = valMetric / m_per_inc ;
			valOut1 = Math.floor(inches / in_per_ft) ;
			valOut2 = (inches % in_per_ft) ;
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