import React, {Component} from 'react'

class Profile extends Component {
	state = {
		username: this.props.username,
		email: this.props.email,
		rowid: this.props.rowid
	}

	render(){
		return(
			<div>
				<p>{this.state.username}</p>
				<p>{this.state.email}</p>
				<p>{this.state.rowid}</p>
			</div>
		)
	}
}

export default Profile