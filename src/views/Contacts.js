// CSS
import "./css/contacts.scss"

// React and other packages
import React, { useEffect, useRef } from "react";

// React-bootstrap components
import { Button, Form, Modal } from "react-bootstrap";

// Network services
import ContactService from "../services/contactService";
import MessageService from "../services/messageService";

// Our components
import ContactCard from "../components/ContactCard" ;
import CreateMessageModal from "../components/CreateMessageModal";

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export default function Contacts({viewCommon}) {
	const contactService = new ContactService(viewCommon.net);
	const messageService = new MessageService(viewCommon.net);

	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const contacts = userDataState.contacts ;
	const [ addContactUserName, changeAddContactUserName ] = React.useState("") ;
	const [ writingMessageTo, changeWritingMessageTo ] = React.useState(null) ;
	const [ isSendingMessage, changeIsSendingMessage ] = React.useState(false) ;
	const [ contactReqSentTo, changeContactReqSentTo ] = React.useState(null) ;

	const timerRef = useRef(null);

	// === Retrieve contacts ===
	function getContacts(isAuto = false) {
		contactService.retrieveContacts(isAuto).then(({data: contacts}) => {
			userDataDispatch({ type: "setContacts", data: contacts});
		}) ;
	}

	// Start/stop polling for updates to contacts list
	useEffect(() => {
		getContacts() ;
		timerRef.current = setInterval(() => getContacts(true), 10000);

		return () => {
			clearInterval(timerRef.current); // Stop update timer when user leaves the page
		} ;
	}, []);

	function handleSendMessage(userName) {
		changeWritingMessageTo(userName) ;
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

	function handleSendContactRequest(e) {
		e.preventDefault() ;
		contactService.createRequest(addContactUserName).then(() => {
			changeContactReqSentTo(addContactUserName) ;
		}).finally(() => changeAddContactUserName("")) ;
	}

	function handleRemoveContact(userName) {
		contactService.removeContact(userName).then(() => {
			const newContactsData = contacts.filter((contact) => contact.userName !== userName) ;
			userDataDispatch({ type: "setContacts", data: newContactsData });
		}) ;
	}

	function handleCloseModal() {
		changeContactReqSentTo(null) ;
	}

	return (
		<>
			<div className="page-contacts">
				<Modal show={contactReqSentTo} onHide={handleCloseModal}>
					<Modal.Header closeButton>
						<Modal.Title>Contact Request</Modal.Title>
					</Modal.Header>
					<Modal.Body>Contact Request was successfully sent to {contactReqSentTo}</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleCloseModal}>
							Close
						</Button>
					</Modal.Footer>
				</Modal>

				<h1>Contacts</h1>

				<Form id="form" className="d-flex p-3 justify-content-center" onSubmit={handleSendContactRequest}>
					<Form.Group controlId="add_contact_username">
						<Form.Control
						name="add_contact_username"
						value={addContactUserName}
						onChange={(e) => changeAddContactUserName(e.target.value)}
						placeholder="Contact Username" />
					</Form.Group>

					<Button variant="secondary" type="submit" disabled={!addContactUserName}>Add</Button>
				</Form>

				<div className="my-contacts">
				{
					contacts.map((contact) => 
						<ContactCard
							key={contact._id} data={contact} ///
							handleSendMessage={() => handleSendMessage(contact.userName)}
							handleRemoveContact={() => handleRemoveContact(contact.userName)}
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