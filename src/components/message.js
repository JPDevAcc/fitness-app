import './css/message.css' ;
import React from "react" ;
import { Alert } from 'react-bootstrap';

export default function Message({msgData, setMsgData}) {
	return (
		<>
		{(msgData.msg) &&
			<Alert className="py-0 my-message" variant={msgData.type === 'msg' ? 'success' : 'danger'} onClose={() => setMsgData({msg: null})} dismissible>
				<Alert.Heading>{msgData.type === 'msg' ? 'Success' : 'Error'}</Alert.Heading>
				<p>{msgData.msg}</p>
			</Alert>
			}
		</>
	) ;
}