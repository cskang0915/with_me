import React, {Component} from 'react'
import EntryForm from '../../components/entry/EntryForm'

class EntryContainer extends Component {
	date = new Date()
	state = {
		month: this.date.getMonth() + 1,
		day: this.date.getDate(),
		year: this.date.getFullYear(),
		time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		entry: '',
		collection_id: null,
		picture: null,
		initial_date: `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.date.getDate()}`,
		initial_time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		test: "",
		error: null,
	}

	handleChange = (event) => {
		if(event.target.name === 'initial_date'){
			console.log('here')
			let date = (event.target.value).split('-')
			console.log(date)
			this.setState({
				month: parseInt(date[1]),
				day: parseInt(date[2]),
				year: parseInt(date[0])
			})
		}else if(event.target.name === 'initial_time'){
			console.log('there')
			this.setState({
				time: event.target.value
			})
		}

		this.setState({
			[event.target.name]: event.target.value
		})
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const entry = this.state
	
		fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
			method: "POST",
			body: JSON.stringify(entry),
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => console.log(res.json()))
		.catch(err => {
			this.setState({
				error: err
			})
		})
		window.location.reload(true)
	}
	render() {
		return(
			<EntryForm state = {this.state} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
		)
	}
}

export default EntryContainer