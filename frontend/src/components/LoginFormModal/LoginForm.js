// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="loginModal">

      <form className='loginForm' onSubmit={handleSubmit}>

        <div>

          <h1>Sign in</h1>

          <label>

            <input className="inputField"
              type="text"
              placeholder="Username or Email"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />

          </label>

          <label>

            <input className="inputField"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </label>

        </div>


        <div>

          <div>
            {errors.map((error, idx) => (
              <div className="errors" key={idx}>{error}</div>
            ))}
          </div>

        </div>

        <div>
          <button className="LoginSubmitButton" type="submit">Continue</button>
        </div>

      </form>

    </div>
  );
}

export default LoginForm;
