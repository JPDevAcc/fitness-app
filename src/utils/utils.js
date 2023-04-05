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

export function formatDate(date) { // Is this function used anywhere?
	return date.slice(0, 10) // Will produce wrong results sometimes if passed a UTC string and you want a local-time date out
}