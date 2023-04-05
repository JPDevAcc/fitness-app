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

export function formatDate(dateString) {
	const date = new Date(dateString);
	return date.getFullYear() + '-' + (date.getMonth() + 1).toString().padStart(2, '0') + '-' + date.getDate().toString().padStart(2, '0');
}