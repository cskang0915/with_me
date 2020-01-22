import React, {Component} from 'react'
import NavbarProfile from '../navbars/NavbarProfile'
import RoutesProfile from '../config/RoutesProfile'
import {Switch} from 'react-router-dom'
import Profile from '../components/profile/Profile'
import EntryForm from '../components/entry/EntryForm'
import EntryList from '../components/entry/EntryList'

class ProfileContainer extends Component {
	state = {
		rowid: '',
		username: '',
		email: ''
	}

	componentDidMount() {
		this.getUserInfo()
	}

	getUserInfo = () => {
		fetch('http://localhost:9000/api/user/info', {
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
			console.log(err)
		})
	}

	logout = () => {
  		this.setState({
  			currentUser: null
  		})

  		localStorage.removeItem('uid')

  		alert('Logged out')

	  	this.props.history.push('/login')
  	}

	render() {
		return(
			<div>
				<RoutesProfile rowid = {this.state.rowid} username = {this.state.username} email = {this.state.email} logout = {this.logout}/>
			</div>
		)
	}
}

export default ProfileContainer