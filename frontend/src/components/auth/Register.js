import React, {Component} from 'react'

class Register extends Component {
	state = {
		username: '',
		email: '',
		password: '',
		password2: '',
		error: null
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		
		const newUser = this.state

		fetch('http://localhost:9000/api/user/register', {
			method: "POST",
			body: JSON.stringify(newUser),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(res => res.json())
		.then(data => {
			if(data.status === 201){
				this.props.history.push('/')
			}else{
				alert('Username or email is already taken')
			}
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
			<div className = "form-register">
				<form onSubmit = {this.handleSubmit}>
					<div className = "form-group-register">
						<label>Username</label>
						<input type = "username" name = "username" value = {this.state.username} onChange = {this.handleChange} placeholder = "Enter Username"/>
					</div>
					<div className = "form-group-register">
						<label>Email</label>
						<input type = "email" name = "email" value = {this.state.email} onChange = {this.handleChange} placeholder = "Enter Email"/>
					</div>
					<div className = "form-group-register">
						<label>Password</label>
						<input type = "password" name = "password" value = {this.state.password} onChange = {this.handleChange} placeholder = "Enter Password"/>
					</div>
					<div className = "form-group-register">
						<label>Re-enter Password</label>
						<input type = "password" name = "password2" value = {this.state.password2} onChange = {this.handleChange} placeholder = "Re-enter Password"/>
					</div>
					<button type = "submit" className = "button-submit">Register</button>
				</form>
			</div>
		)
	}
}

export default Register