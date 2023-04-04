import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './css/createMessageModal.scss';
import Select from './Select';

export default function CreateMessageModal({ contacts, writingMessageTo, inputsDisabled, handleClose, handleSubmit }) {

	const [formValues, changeFormValues] = useState({
		messageRecipient: writingMessageTo ?? "",
		messageSubject: "",
		messageContent: ""
	}) ;

	useEffect(() => {
		changeFormValues(state => ({...state, messageRecipient: writingMessageTo ?? ""})) ;
		return () => changeFormValues({messageRecipient: "", messageSubject: "", messageContent: ""}) ;
	}, [writingMessageTo]) ;

	// Handle form field user-input
  const handleChange = (changeData) => {
		let fieldName, newValue ;
		
		if (Array.isArray(changeData)) {
			[fieldName, newValue] = changeData ;
		} else {
			fieldName = changeData.target.id ;
			newValue = changeData.target.value;
		}

		const newFormValues = {...formValues} ;
		newFormValues[fieldName] = newValue;
		changeFormValues(newFormValues);
  }

	function handleSubmitInternal() {
		handleSubmit({...formValues}) ;	
	}
	
	let recipientOpts ;
	if (writingMessageTo) recipientOpts = [writingMessageTo] ;
	else recipientOpts = [{value: "", displayName: "- Select -"}, ...contacts.map((contact) => contact.userName)] ;

	return (
		<Modal className='component-create-message' show={writingMessageTo !== null} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Send message</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Select
						id="messageRecipient"
						value={formValues.messageRecipient}
						onChange={handleChange}
						disabled={inputsDisabled}
						opts={recipientOpts}
					/>

					<Form.Group controlId="messageSubject">
						<Form.Control
							placeholder="Subject"
							value={formValues.messageSubject}
							onChange={handleChange}
							disabled={inputsDisabled}
						/>
					</Form.Group>

					<Form.Group controlId="messageContent">
						<Form.Control as="textarea" rows={4}
							placeholder="Message"
							value={formValues.messageContent}
							onChange={handleChange}
							disabled={inputsDisabled}
						/>
					</Form.Group>

				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button
					variant="primary"
					onClick={handleSubmitInternal} 
					disabled={inputsDisabled || !formValues.messageRecipient || !formValues.messageSubject || !formValues.messageContent}>
					Send
				</Button>
				<Button variant="secondary" onClick={handleClose} disabled={inputsDisabled}>Cancel</Button>
			</Modal.Footer>

		</Modal>
	)
}