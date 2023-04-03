const MAIN_FILESERVER_URL = process.env.REACT_APP_API_URL ;

export function getFullUrl(url, fallback = "") {
	if (!url) return fallback ; // (no URL so return the fallback)
	if (url.substring(0, 5) === 'none_') return fallback ; // (unique URL denoting no image so return the fallback)
	if (/^http/.test(url)) return url ; // (full URL)
	return MAIN_FILESERVER_URL + 'files/' + url ; // (filename on main server)
}

export function getProfileImageUrl(url) {
	return getFullUrl(url, "images/user.png") 
}