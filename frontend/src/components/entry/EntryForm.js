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

	// getDate() {
	// 	let date = new Date()
	// 	let month = date.getMonth()
	// 	let day = date.getDate()
	// 	let year = date.getFullYear()
	// 	let time = date.toLocaleTimeString()
	// 	console.log('.....')
	// 	this.setState({
	// 		month: month,
	// 		day: day,
	// 		year: year,
	// 		time: time
	// 	})

	// 	console.log(this.state)
	// 	console.log('assa')
	// }

	handleSubmit = (event) => {
		event.preventDefault()

		// this.getDate()

		const user = this.state
		// console.log(user)
		// console.log('!!!')
		// console.log(this.state)
		// debugger

		fetch('http://localhost:9000/api/entry/new', {
			method: "POST",
			body: JSON.stringify(user),
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => res.json())

		this.props.history.push('/profile')
	}

	render() {
		return(
			<div>
				<h1>entry form</h1>
				<form onSubmit = {this.handleSubmit}>
					<div className = "form-group-entry">
						<label>New Entry</label>
						<input type = "text" name = "entry" value = {this.state.entry} onChange = {this.handleChange} placeholder = "Create a new entry"/>
					</div>
					<button type = "submit" className = "button-submit">Create entry</button>
				</form>
			</div>
		)
	}
}

export default EntryForm