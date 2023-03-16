import React from 'react'
import { Button } from 'react-bootstrap'

export default function Dashboard(props) {



    return (
        <div>
            <Button onClick={props.client.getPics.bind(props.client)}>click me</Button>
        </div>
    )
}
