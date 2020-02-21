import React, {Component} from 'react'

class EntryForm extends Component {
	date = new Date()
	state = {
		user_id: null,
		month: this.date.getMonth() + 1,
		day: this.date.getDate(),
		year: this.date.getFullYear(),
		time: `${this.date.getHours()}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		entry: '',
		collection_id: null,
		picture: null,
		initial_date: `${this.date.getFullYear()}-${(this.date.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}-${this.date.getDate()}`,
		initial_time: `${(this.date.getHours()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}:${(this.date.getMinutes()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})}`,
		test: "",
		error: null,
	}

	componentDidMount() {
		this.getAllCollection()
	}

	getAllCollection = () => {
		let test = () => {
			fetch(`${process.env.REACT_APP_API}/api/collection/all`, {
				headers: {
					"Content-Type": "application/json",
					"authorization": `Bearer ${localStorage.uid}`
				}
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data)
					let findCollection = data.map((collection) => {
						if(collection.name === this.state.test){
							this.setState({
								collection_id: data.rowid
							})
						}else{
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
								.then(() => {
									test()
								})
						}
					})
				})
			}
			test()
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
		}else{
			this.setState({
				[event.target.name]: event.target.value
			})
		}
	}

	handleSubmit = (event) => {
		event.preventDefault()
		const user = this.state
	

	render() {
		return(
			<div>
				<h1>Write Entry</h1>
				<form onSubmit = {this.props.handleSubmit}>
					<div className = "form-group-entry">
						<label>New Entry</label> <br />
						<input type = "date" name = "initial_date" value = {this.props.state.initial_date} onChange = {this.props.handleChange}/> <br/>
						<input type = "time" name = "initial_time" value = {this.props.state.initial_time} onChange = {this.props.handleChange}/> <br/>
						<input type = "text" name = "entry" value = {this.props.state.entry} onChange = {this.props.handleChange} placeholder = "Create a new entry" required/> <br/>
						<label>Add to:</label><input type = "text" name = "test" value = {this.props.state.test} onChange = {this.props.handleChange} placeholder= "Select a collection"/>
					</div>
					<button type = "submit" className = "button-submit">Create entry</button>
				</form>
			</div>
		)
	}
}

export default EntryForm