import React, {Component} from 'react'
import RoutesProfile from '../config/RoutesProfile'

class ProfileContainer extends Component {
	state = {
		rowid: '',
		username: '',
		email: '',
		error: null
	}

	componentDidMount() {
		this.getUserInfo()
	}

	getUserInfo = () => {
		fetch(`${process.env.REACT_APP_API}/api/user/info`, {
			headers: {
				"authorization": `Bearer ${localStorage.uid}`
			}
		})
		.then(res => res.json())
		.then(data => {
			this.setState({
				rowid: data.rowid,
				username: data.user[0].username,
				email: data.user[0].email
			})
		})
		.catch(err => {
			this.setState({
				error: err
			})
		})
	}
	render() {
		return(
			<div>
				<RoutesProfile rowid = {this.state.rowid} username = {this.state.username} email = {this.state.email} logout = {this.props.logout}/>
			</div>
		)
	}
}

export default ProfileContainer