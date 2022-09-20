import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import * as sessionActions from "../../store/session"
import './LoginDemoUser.css'

function LoginDemo() {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        return dispatch(sessionActions.login({credential: 'Demo-lition', password: 'password'}))
    }
    return (
        <div>
            <button className="LoginDemo" onClick={handleSubmit}>Demo User</button>
        </div>
    )
}

export default LoginDemo
