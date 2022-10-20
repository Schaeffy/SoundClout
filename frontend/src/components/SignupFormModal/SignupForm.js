import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [displayErrors, setDisplayErrors] = useState(false);


  const validate = () => {
    let validationErrors = [];
    const reg = RegExp(/^[a-z\d ]+$/i)

    if (reg.test(firstName) === false) {
      validationErrors.push('First name must only contain letters')
    }

    if (reg.test(lastName) === false) {
      validationErrors.push('Last name must only contain letters')
    }

    if (password !== confirmPassword) {
      validationErrors.push('Passwords must match')
    }

    if (username.length < 4) {
      validationErrors.push('Username must be at least 4 characters')
    }

    if (password.length < 6) {
      validationErrors.push('Password must be at least 6 characters')
    }

    if (email.length < 3 || email.length > 256)
      validationErrors.push("Email must be between 3 and 256 characters");

    setErrors(validationErrors);

    if (validationErrors.length) setDisplayErrors(true)

    return validationErrors

  }

  useEffect(() => {
    if (displayErrors) validate()
  }, [firstName, lastName, password, confirmPassword, email, username])

  if (sessionUser && Object.keys(sessionUser).length) return <Redirect to="/" />;


  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    setDisplayErrors(false)
    let validationErrors = validate()

    if (validationErrors.length) return
    if (!errors.length) {
      return dispatch(sessionActions.signup({ email, firstName, lastName, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return errors;
  };

  return (
    // <div className="formContainer">

    <form className="signupForm" onSubmit={handleSubmit}>

      <div>
        <h1>
          Create an account
        </h1>
      </div>

      <div className="signUpLabels">
        <label>
          <input className="inputField"
            placeholder="Enter your first name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          <input className="inputField"
            placeholder="Enter your last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          <input className="inputField"
            placeholder="Enter your email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          <input className="inputField"
            placeholder="Enter your username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>

        <label>
          <input className="inputField"
            placeholder="Enter Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <label>
          <input className="inputField"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
      </div>

      <div className="signUpErrors">
        <ul>
          {errors && errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
      </div>


      <button className="submitButton" type="submit">Continue</button>

    </form>

    // </div>
  );
}

export default SignupForm;
