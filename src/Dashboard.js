import React from 'react'
import { Button } from 'react-bootstrap'
import UnsplashAPIClient from './services/UnsplashAPIClient'

export default function Dashboard(props) {
    const unsplashAPIClient = new UnsplashAPIClient(props.viewCommon.net);


    return (
        <div>
            <Button onClick={() => unsplashAPIClient.getPics()}>click me</Button>
        </div>
    )
}