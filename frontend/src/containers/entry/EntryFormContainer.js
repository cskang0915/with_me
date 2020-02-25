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
			this.setState({
				month: parseInt(date[1]),
				day: parseInt(date[2]),
				year: parseInt(date[0])
			})
		}else if(event.target.name === 'initial_time'){
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
		fetch(`${process.env.REACT_APP_API}/api/collection/all`, {
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
			.then((res) => res.json())
			.then((data) => {
				let findCollection = data.find((collection) => collection.collection_name === this.state.test)
				if (findCollection) {
					this.setState({
						collection_id: findCollection.rowid
					})
					let test = this.state
						console.log('here')
						console.log(test)
						fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
							method: "POST",
							body: JSON.stringify(test),
							headers: {
								"Content-Type" : "application/json",
								"authorization": `Bearer ${localStorage.uid}`
							}
						})
							.then(() => {
								window.location.reload(true)
							})
							.catch((err) => console.log(err))
				} else {
					let newCollection = this.state
					fetch(`${process.env.REACT_APP_API}/api/collection/new`, {
						method: "POST",
						body: JSON.stringify(newCollection),
						headers: {
							"Content-Type" : "application/json",
							"authorization": `Bearer ${localStorage.uid}`
						}
					})
						.then((res) => res.json())
						.then((data) => {
							let findCollection = data.find((collection) => collection.collection_name === this.state.test)
							if(findCollection) {
								this.setState({
									collection_id: findCollection.rowid
								})
							}
						})
						.then(() => {
							let test = this.state
							fetch(`${process.env.REACT_APP_API}/api/entry/new`, {
								method: "POST",
								body: JSON.stringify(test),
								headers: {
									"Content-Type" : "application/json",
									"authorization": `Bearer ${localStorage.uid}`
								}
							})
								.then(() => {
									window.location.reload(true)
								})
								.catch((err) => console.log(err))
						})
					}
				})
	}

	render() {
		return(
			<EntryForm state = {this.state} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
		)
	}
}

export default EntryContainer