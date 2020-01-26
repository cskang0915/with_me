import React, {Component} from 'react'

class Entry extends Component {
	// state = {
	// 	month: {this.props.entry.month},
	// 	day: ,
	// 	rowid: ,
	// }

	deleteEntry = () => {
		let url = `http://localhost:9000/api/entry/delete/${this.props.entry.month}/${this.props.entry.day}/${this.props.entry.rowid}`

		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		console.log(this.props)
		// .catch(err => {
		// 	this.setState({
		// 		error: err
		// 	})
		// })
	}

	render() {
		return (
			<div>
				<ul>
					<li>{this.props.entry.month}/{this.props.entry.day}/{this.props.entry.year}</li>
					<li>{this.props.entry.time}</li>
					<li>{this.props.entry.entry}</li>
				</ul>
			</div>
		)
	}
}

export default Entry