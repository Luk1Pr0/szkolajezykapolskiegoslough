import { useState, useContext } from 'react';

// CONTEXT
import { AuthContext } from '../context/AuthContext/AuthContext';
import actions from '../context/actions';

export default function LoginForm() {

	// LOGIN DATA
	const [credentials, setCredentials] = useState({
		email: '',
		password: ''
	});

	// AUTHCONTEXT
	const { account, dispatchAuthEvent } = useContext(AuthContext);

	// HANDLE FORM SUBMIT
	const handleSubmit = async (e) => {
		e.preventDefault();

		// TRY SENDING DATA
		try {
			// POST FORM DATA
			const response = await fetch('http://localhost:5000/login', {
				method: 'POST',
				mode: 'cors',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(credentials)
			});

			console.log(response);

			// DISPATCH THE RESPONSE TO THE CONTEXT FOR AUTHORISATION OF ADMIN
			response.ok ? dispatchAuthEvent(actions.SIGN_IN, true) : dispatchAuthEvent(actions.SIGN_IN, false);

		} catch (error) {
			// CONSOLE LOG ERROR WHENS SENDING FAILS
			console.log('Error connecting to the server', error);
		}
	}

	// HANDLE CHANGE OF FORM INPUTS
	const handleChange = (e) => {
		setCredentials({ ...credentials, [e.target.name]: e.target.value });
	}

	return (
		<div className="form-wrapper">

			<form id='form' className="form form--login" onSubmit={handleSubmit}>

				<label htmlFor="email" className='label'>
					Email *
					<input id='email' name='email' type="email" className='input' placeholder='Adres email' required onChange={handleChange} />
				</label>

				<label htmlFor="password" className='label'>
					Hasło *
					<input id='password' name='password' type="password" className='input' placeholder='Hasło' required onChange={handleChange} />
				</label>

				<div className="btn-container">

					<button type="submit">Wyślij</button>

					<button type="reset">Anuluj</button>

				</div>

			</form>

		</div>
	)
}