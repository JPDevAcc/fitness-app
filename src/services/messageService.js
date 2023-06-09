import NetService from "../netService" ;

const EP_MESSAGE = 'messages' ;
const EP_MESSAGEMETAS = 'messageMetas' ;

export default class MessageService extends NetService {
	sendMessage(recipientUserName, messageData) {
		return this.post(EP_MESSAGE + '/' + recipientUserName, messageData) ;
	}

	retrieveMessageMetas(isAuto = false) {
		return this.get(EP_MESSAGEMETAS, isAuto ? {noErrorClear: true, noSlowRequestHandling: true} : {}) ;
	}

	removeMessage(messageId) {
		return this.delete(EP_MESSAGE + '/' + messageId) ;
	}

	retrieveMessageContent(messageId) {
		return this.get(EP_MESSAGE + '/' + messageId) ;
	}
}