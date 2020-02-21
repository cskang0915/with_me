import React, {Component} from 'react'
import pastEntryContainer from '../../containers/entry/pastEntryContainer'

class EntryList extends Component {
	state = {
		month: '',
		day: '',
		data: [],
		error: null,
		selectAll: true
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()

		const url = `${process.env.REACT_APP_API}/api/entry/get/${this.state.month}/${this.state.day}`

		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					data: data,
					selectAll: false
				})
			})
			.catch(err => {
				this.setState({
					error: err
				})
			})

	}

	getAllEntries = () => {
		fetch(`${process.env.REACT_APP_API}/api/entry/get/all`, {
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					data: data,
					selectAll: true
				})
			})
			.catch(err => {
				this.setState({
					error:err
				})
			})
	}

	updateDataInEntryList = () => {
		if(this.state.selectAll === true) {
			fetch(`${process.env.REACT_APP_API}/api/entry/get/all`, {
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${localStorage.uid}`
				}
			})
				.then(res => res.json())
				.then(data => {
					this.setState({
						data: data,
						selectAll: true
					})
				})
				.catch(err => {
					this.setState({
						error:err
					})
				})
		} else {
			const url = `${process.env.REACT_APP_API}/api/entry/get/${this.state.month}/${this.state.day}`

			fetch(url, {
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${localStorage.uid}`
				}
			})
				.then(res => res.json())
				.then(data => {
					this.setState({
						data: data,
						selectAll: false
					})
				})
				.catch(err => {
					this.setState({
						error: err
					})
				})
		}
	}

	render() {
	/* button to search by that day using new Date.now or toggle the visibility of a search bar */
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
				<button onClick = {this.getAllEntries}>See All Entries</button>
				<pastEntryContainer data = {this.state.data} updateDataInEntryList = {this.updateDataInEntryList}/>
			</div>
		)
	}
}

export default EntryList