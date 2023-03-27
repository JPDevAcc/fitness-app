const MAIN_FILESERVER_URL = process.env.REACT_APP_API_URL ;

export function getFullUrl(url) {
	if (!url) return "" ; // (no URL)
	if (/^http/.test(url)) return url ; // (full URL)
	return MAIN_FILESERVER_URL + 'files/' + url ; // (filename on main server)
}