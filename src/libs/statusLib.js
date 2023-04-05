export default class StatusLib {
	constructor(errorStatusList, changeErrorStatusList, successMessage = null, changeSuccessMessage = null) {
		this.errorStatusList = errorStatusList ;
		this.changeErrorStatusList = changeErrorStatusList ;
		this.successMessage = successMessage ;
		this.changeSuccessMessage = changeSuccessMessage ;
	}

	// Set error-status for the specified category
	setErrorStatus(category, msg) {
		console.log("setErrorStatus: ", category, msg) ;
		if (msg === null) this.removeErrorStatus(category) ;
		else this.changeErrorStatusList((errorStatusList) => ({ ...errorStatusList, [category]: msg }));
	}

	// Remove error-status for the specified category
	removeErrorStatus(category) {
		this.changeErrorStatusList((errorStatusList) => {
			const newErrorStatusList = { ...errorStatusList };
			delete newErrorStatusList[category];
			return newErrorStatusList;
		});
	}

	// Retrieve active (non-blank) error
	getError() {
		const values = Object.values(this.errorStatusList);
		if (values.length === 0) return null;
		let activeMsg = '';
		for (const msg of values) {
			if (msg) activeMsg = msg;
		}
		return activeMsg;
	}

	// Returns boolean denoting whether there is currently an error
	isError() {
		return (this.getError() !== null);
	}

	// Retrieve active (non-blank) error
	getSpecificError(category) {
		return this.errorStatusList[category] ?? null;
	}

	// Returns boolean denoting whether there is currently an error for a specific category
	isSpecificError(category) {
		return (this.getSpecificError(category) !== null);
	}

	// Get status-message (error or success) in HTML format
	getStatusMessageHtml() {
		const error = this.getError() ;
		if (error !== null) return StatusLib.getMessageHtml(error);
		else if (this.changeSuccessMessage) return StatusLib.getMessageHtml(this.successMessage, 'success');
	}

	// Retrieve success-message
	getSuccessMsg() {
		if (!this.changeSuccessMessage) {
			console.error("No success message change-function was provided") ;
			return null ;
		}
		return this.successMessage ;
	}

	// Change success-message
	changeSuccessMsg(msg) {
		if (!this.changeSuccessMessage) {
			console.error("No success message change-function was provided") ;
			return ;
		}
		this.changeSuccessMessage(msg) ;
	}

	// Get HTML-formatted message
	static getMessageHtml(msg, type = 'err') {
		if (!msg) return <div className="text-center">&nbsp;</div>;
		return (type === 'err') ?
			<div className='text-center text-danger'>{msg}</div> :
			<div className='text-center text-success'>{msg}</div>;
	}
}