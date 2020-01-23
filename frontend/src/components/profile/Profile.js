import React, {Component} from 'react'

class Profile extends Component {
	render(){
		return(
			<div>
				<p>logged in</p>
				<p>{this.props.username}</p>
				<p>{this.props.email}</p>
				<p>{this.props.rowid}</p>
			</div>
		)
	}
}

export default Profile