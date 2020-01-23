import React, {Component} from 'react'

class EntryForm extends Component {
	date = new Date()
	state = {
		user_id: undefined,
		month: this.date.getMonth(),
		day: this.date.getDate(),
		year: this.date.getFullYear(),
		time: this.date.toLocaleTimeString(),
		entry: ''
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		this.state.month++
		const user = this.state
	
		fetch('http://localhost:9000/api/entry/new', {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => res.json())
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