// CSS
import "./css/_messages.scss"

// React and other packages
import React, { useEffect, useRef } from "react";
import { useParams } from 'react-router';

// React-bootstrap components
import { Button } from "react-bootstrap";

// Network services
import ContactService from "../services/contactService";
import MessageService from "../services/messageService";

// Our components
import MessageCard from "../components/_MessageCard" ;
import CreateMessageModal from "../components/_CreateMessageModal";

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export default function Messages({viewCommon}) {
	let { id } = useParams();
	const hasScrolled = useRef(false) ;

	const contactService = new ContactService(viewCommon.net);
	const messageService = new MessageService(viewCommon.net);

	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const contacts = userDataState.contacts ;
	const messageMetas = userDataState.messageMetas ;
	const [ writingMessageTo, changeWritingMessageTo ] = React.useState(null) ; // (null = not-writing, undefined = writing to any)
	const [ isSendingMessage, changeIsSendingMessage ] = React.useState(false) ;
	const [ messageContentTable, changeMessageContentTable ] = React.useState({}) ;

	const timerRef = useRef(null);

	// === Retrieve contacts and message metadata ===
	function getContacts() {
		contactService.retrieveContacts().then(({data: contacts}) => {
			userDataDispatch({ type: "setContacts", data: contacts});
		}) ;
	}
	function getMessageMetas() {
		messageService.retrieveMessageMetas().then(({data: messageMetas}) => {
			userDataDispatch({ type: "setMessageMetas", data: messageMetas});
		}) ;
	}

	useEffect(() => {
		// Scroll to the message if an ID was specified and we haven't already done so
		if (id && !hasScrolled.current) {
			// Schedule the scroll after React has a chance to render the element
			setTimeout(() => {
				if (document.getElementById(id)) {
					document.getElementById(id).scrollIntoView() ;
					hasScrolled.current = true ;
				}
			}, 0) ;
		}
	}, [messageMetas])

	// Start/stop polling for updates to contacts list
	useEffect(() => {
		getContacts() ;
		getMessageMetas() ;
		timerRef.current = setInterval(() => {
			getContacts() ;
			getMessageMetas() ;
		}, 10000);

		return () => {
			clearInterval(timerRef.current); // Stop update timer when user leaves the page
		} ;
	}, []);

	function sendMessageTo(userName) {
		changeWritingMessageTo(userName) ;
	}

	function handleRemoveMessage(messageId) {
		messageService.removeMessage(messageId).then(() => {
			const newMessageMetasData = messageMetas.filter((messageMeta) => messageMeta._id !== messageId) ;
			userDataDispatch({ type: "setMessageMetas", data: newMessageMetasData });
		}) ;
	}

	function handleCloseSendMessageModal() {
		changeWritingMessageTo(null) ;
	}

	function handleSendMessageSubmit({messageRecipient, messageSubject, messageContent}) {
		const messageData = {messageSubject, messageContent} ;
		changeIsSendingMessage(true) ;
		messageService.sendMessage(messageRecipient, messageData).finally(() => {
			changeWritingMessageTo(null) ;
			changeIsSendingMessage(false) ;
		}) ;
	}

	function getFullMessage(messageId) {
		messageService.retrieveMessageContent(messageId).then(({data: messageContent}) => {
			changeMessageContentTable(state => ({...state, [messageId]: messageContent}))
		}) ;
	}

	return (
		<>
			<div className="page-messages">
				<h1>Messages</h1>
					<div className="my-compose-button-container text-center p-3">
						<Button variant="outline-primary" onClick={() => changeWritingMessageTo(undefined)}>Compose Message</Button>
					</div>

				<div className="my-messages">
				{
					messageMetas.map((messageMeta) => 
						<MessageCard
							key={messageMeta._id} id={messageMeta._id} data={{...messageMeta, messageContent: messageContentTable[messageMeta._id]}}
							getFullMessage={() => getFullMessage(messageMeta._id)}
							handleReplyToMessage={() => sendMessageTo(messageMeta.sourceUserName)}
							handleRemoveMessage={() => handleRemoveMessage(messageMeta._id)}
					/>)
				}
				</div>

				<CreateMessageModal
					contacts={contacts}
					writingMessageTo={writingMessageTo}
					inputsDisabled={isSendingMessage}
					handleClose={handleCloseSendMessageModal}
					handleSubmit={handleSendMessageSubmit}
				/>
			</div>
		</>
  )
}