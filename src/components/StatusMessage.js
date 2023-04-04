import './css/statusMessage.scss' ;
import React from "react" ;
import { Alert } from 'react-bootstrap';

export default function StatusMessage({msgData, setMsgData}) {
	return (
		<>
		{(msgData.msg) &&
			<Alert className="py-0 component-message" variant={msgData.type === 'msg' ? 'success' : 'danger'} onClose={() => setMsgData({msg: null})} dismissible>
				<Alert.Heading>{msgData.type === 'msg' ? 'Success' : 'Error'}</Alert.Heading>
				<p>{msgData.msg}</p>
			</Alert>
			}
		</>
	) ;
}