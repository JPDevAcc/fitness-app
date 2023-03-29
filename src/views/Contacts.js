// CSS
import "./css/Contacts.scss"

// React and other packages
import React, { useEffect } from "react";

// Network services
import ContactService from "../services/contactService";

// Our components
import ContactCard from "../components/contactCard" ;

// Contexts (global data)
import { UserContext } from "../contexts/User"

// ==============================================================================

export default function Contacts({viewCommon}) {
	const contactService = new ContactService (viewCommon.net);

	const [ userDataState, userDataDispatch ] = React.useContext(UserContext) ;
	const contacts = userDataState.contacts ;

	useEffect(() => {
		contactService.retrieveContacts().then(({data: contacts}) => {
			userDataDispatch({ type: "setContacts", data: contacts});
		})
	}, []) ;

	function handleSendMessage() {
		alert("sendMessageHandler") ;
	}

	function handleRemoveContact(userName) {
		contactService.removeContact(userName).then(() => {
			const newContactsData = contacts.filter((contact) => contact.userName !== userName) ;
			userDataDispatch({ type: "setContacts", data: newContactsData });
		}) ;
	}

	return (
		<>
			<div className="page-contacts">
				<h1>Contacts</h1>
				<div className="my-contacts">
				{
					contacts.map((contact) => 
						<ContactCard
							key={contact._id} data={contact}
							handleSendMessage={() => handleSendMessage(contact.userName)}
							handleRemoveContact={() => handleRemoveContact(contact.userName)}
					/>)
				}
				</div> 
			</div>
		</>
  )
}