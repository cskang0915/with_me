import React, {Component} from 'react'

class EntryForm extends Component {
	state = {
		user_id: null,
		month: null,
		day: null,
		year: null,
		time: null,
		entry: '',
		error: null
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const date = new Date()
		this.state.month = date.getMonth() + 1
		this.state.day = date.getDate()
		this.state.year = date.getFullYear()
		this.state.time = date.toLocaleTimeString()

		const user = this.state
	
		fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => res.json())
		.catch(err => {
			this.setState({
				error: err
			})
		})
		window.location.reload(true)
	}

	render() {
		return(
			<div>
				<h1>Write Entry</h1>
				<form onSubmit = {this.handleSubmit}>
					<div className = "form-group-entry">
						<label>New Entry</label>
						<input type = "text" name = "entry" value = {this.state.entry} onChange = {this.handleChange} placeholder = "Create a new entry" required/>
					</div>
					<button type = "submit" className = "button-submit">Create entry</button>
				</form>
			</div>
		)
	}
}

export default EntryForm