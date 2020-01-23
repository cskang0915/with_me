import React, {Component} from 'react'

class Entry extends Component {
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