// Set and remove error-status for the specified category
export function setErrorStatus(changeErrorStatusList, category, msg) {
	if (msg === null) removeErrorStatus(changeErrorStatusList, category);
	else changeErrorStatusList((errorStatusList) => ({ ...errorStatusList, [category]: msg }));
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

export function formatMonth(dateString) {
	const date = new Date(dateString);
	const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]

	const day = date.getDate();
	const month = date.getMonth(); // 0-indexed!
	return day + " " + months[month];
}

export function formatTime(dateString) {
	const date = new Date(dateString);
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const time = date.getHours() + ':' + minutes;
	return time;
}

export function formatDate(dateString) { // Is this function used anywhere?
	const date = new Date(dateString);
	return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0') // Will produce wrong results sometimes if passed a UTC string and you want a local-time date out
}