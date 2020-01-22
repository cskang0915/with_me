import React, {Component} from 'react'
import NavbarProfile from '../navbars/NavbarProfile'
import Profile from '../components/profile/Profile'
import EntryForm from '../components/entry/EntryForm'
import EntryList from '../components/entry/EntryList'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

class RoutesProfile extends Component{
	render() {
		return(
			<BrowserRouter>
				<NavbarProfile rowid = {this.props.rowid}/>
				<Switch>
					<Route exact path = '/profile/user' render = {() => {
						return <Profile username = {this.props.username} email = {this.props.email} rowid = {this.props.rowid} logout = {this.props.logout}/>
					}}/>
					<Route exact path = '/profile/entry' render = {() => <Redirect to = '/profile/entry/new'/>}/>
					<Route path = '/profile/entry/new' component = {EntryForm}/>
					<Route path = '/profile/entry/all' component = {EntryList}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default RoutesProfile