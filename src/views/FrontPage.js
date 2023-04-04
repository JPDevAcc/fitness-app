import './css/frontPage.scss'
import { Link } from 'react-router-dom'


function FrontPage() {
    return (
        <>
            <div className='front-wrapper'>
                <div className='front-title'>

                    <h1 >Welcome to Vitality Network</h1>
                </div>
                <img src='https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHZpdGFsaXR5fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60'></img>
                <Link className='login-link' to={'/login'}>Login</Link>
                {/* <p className='slash'> / </p> */}
                <Link className='register-link' to={'/register'}>Register</Link>
                <div className='bottom-slogan'>
                    <h1>Create healthy connections</h1>
                </div>
            </div>

        </>
    )
}

export default FrontPage