// Set and remove error-status for the specified category
export function setErrorStatus(changeErrorStatusList, category, msg) {
	changeErrorStatusList((errorStatusList) => ({ ...errorStatusList, [category]: msg }));
}
export function removeErrorStatus(changeErrorStatusList, category) {
	changeErrorStatusList((errorStatusList) => {
		const newerrorStatusList = { ...errorStatusList };
		delete newerrorStatusList[category];
		return newerrorStatusList;
	});
}

// Retrieve active (non-blank) error
export function getError(errorStatusList) {
	const values = Object.values(errorStatusList);
	if (values.length === 0) return null;
	let activeMsg = '';
	for (const msg of values) {
		if (msg) activeMsg = msg;
	}
	return activeMsg;
}

// Get HTML-formatted message
export function getMessageHtml(msg, type = 'err') {
	if (!msg) return <div className="text-center">&nbsp;</div>;
	return (type === 'err') ?
		<div className='text-center text-danger'>{msg}</div> :
		<div className='text-center text-success'>{msg}</div>;
}

// Returns boolean denoting whether there is currently an error
export function isError(errorStatusList) {
	return (getError(errorStatusList) !== null);
}

// Retrieve active (non-blank) error
export function getSpecificError(errorStatusList, category) {
	return errorStatusList[category] ?? null;
}

// Returns boolean denoting whether there is currently an error
export function isSpecificError(errorStatusList, category) {
	return (getSpecificError(errorStatusList, category) !== null);
}

// Get next id number from the specified object
export function nextIdFromData(data) {
	return Object.keys(data).reduce((max, id) => Math.max(max, id), -1) + 1;
}

export function formatMonth(date) {
	console.log(date)
	const months = {
		"01": "JAN",
		"02": "FEB",
		"03": "MAR",
		"04": "APR",
		"05": "MAY",
		"06": "JUN",
		"07": "JUL",
		"08": "AUG",
		"09": "SEP",
		"10": "OCT",
		"11": "NOV",
		"12": "DEC"
	}

	let month = date.slice(5, 7)
	let day = date.slice(8, 10)
	return day + " " + months[month]
}

export function formatTime(date) {
	console.log(date)
	let time = date.slice(11, 16)
	console.log(time)
	return time
}