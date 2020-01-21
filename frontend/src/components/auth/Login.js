import React, {Component} from 'react'

class Login extends Component {
	state = {
		username: '',
		password: '',
		error: null,
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const user = this.state

		fetch('http://localhost:9000/api/user/login', {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			this.props.setCurrentUser(data.signedJwt)
			this.props.history.push('/profile')
		})
		.catch(err => {
			console.log(err)
			this.setState({
				error: err
			})
		})
	}

	render() {
		return(
			<div className = "form-login">
				<form onSubmit = {this.handleSubmit}>
					<div className = "form-group-login">
						<label>Username</label>
						<input type = "username" name = "username" value = {this.state.username} onChange = {this.handleChange} placeholder = "Enter Username"/>
					</div>
					<div className = "form-group-login">
						<label>Password</label>
						<input type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange} placeholder = "Enter Password"/>
					</div>
					<button type = "submit" className = "button-submit">Log In</button>
				</form>
			</div>
		)
	}
}

export default Login