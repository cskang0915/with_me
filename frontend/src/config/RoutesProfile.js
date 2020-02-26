import React, {Component} from 'react'
import NavbarProfile from '../navbars/NavbarProfile'
import Profile from '../components/profile/Profile'
import EntryFormContainer from '../containers/entry/EntryFormContainer'
import SearchEntryContainer from '../containers/search/SearchEntryContainer'
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

class RoutesProfile extends Component {
	render() {
		return(
			<BrowserRouter>
				<NavbarProfile rowid = {this.props.rowid} logout = {this.props.logout}/>
				<Switch>
					<Route exact path = '/profile' render = {() => <Redirect to ='/profile/entry/new'/>}/>
					<Route exact path = '/profile/user' render = {() => {
						return <Profile username = {this.props.username} email = {this.props.email} rowid = {this.props.rowid}/>
					}}/>
					<Route exact path = '/profile/entry' render = {() => <Redirect to = '/profile/entry/new'/>}/>
					<Route exact path = '/profile/entry/new' component = {EntryFormContainer}/>
					<Route exact path = '/profile/view/:search' render = {(props) => {
						return <SearchEntryContainer search = {props.match.params.search}/>
					}}/>
				</Switch>
			</BrowserRouter>
		)
	}
}

export default RoutesProfile