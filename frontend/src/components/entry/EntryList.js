import React, {Component} from 'react'

class EntryList extends Component {
	state = {
		month: '',
		day: '',
		data: []
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const url = `http://localhost:9000/api/entry/get/${this.state.month}/${this.state.day}`

		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data)
				// this.setState({
				// 	data: data
				// })
			})

	}

	render() {
	{/* button to search by that day using new Date.now or toggle the visibility of a search bar */}
		return(
			<div>
				<h1>Find Past Entries</h1>
				<form onSubmit = {this.handleSubmit}>
					<div className = "form-group-entry-list">
						<label>Enter month</label>
						<input type = "number" name = "month" value = {this.state.month} onChange = {this.handleChange}/>
					</div>
					<div className = "form-group-entry-list">
						<label>Enter day</label>
						<input type = "number" name = "day" value = {this.state.day} onChange = {this.handleChange}/>
					</div>
					<button type = "submit" className = "button-submit">Search Entries</button>
				</form>
			</div>
		)
	}
}

export default EntryList