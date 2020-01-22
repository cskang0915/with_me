import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Login extends Component {
	state = {
		username: '',
		password: '',
		rowid: '',
		error: null,
	}

	componentDidMount(){
		if(localStorage.getItem('uid')){
			this.props.history.push('/profile')
		}
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
			if(data.status === 200){
				this.props.setCurrentUser(data.signedJwt)
				this.setState({
					rowid: data.id.id
				})
				this.props.history.push(`/profile`)
			}else{
				alert('Incorrect username or password')
			}
		})
		.catch(err => {
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
				<Link to='/register'><button>Register</button></Link>
			</div>
		)
	}
}

export default Login