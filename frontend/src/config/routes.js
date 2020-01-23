import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import NavbarProfile from '../navbars/NavbarProfile'
import Home from '../components/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import EntryForm from '../components/entry/EntryForm'
import EntryList from '../components/entry/EntryList'
import ProfileContainer from '../containers/ProfileContainer'

export default withRouter(({setCurrentUser, currentUser, history}) => {
	const PrivateRoute = ({component: Component, ...rest}) => {
		return <Route {...rest} render = {(props) => (
			currentUser
				? <Component {...props}/>
				: <Redirect to = '/login'/>
		)} />
	}

	return(
		<div>
			<Switch>
				<Route exact path = '/' render = {() => <Login history = {history} setCurrentUser = {setCurrentUser}/>}/>
				<Route exact path ='/home' component = {Home}/>
				<Route path = '/login' render = {() => <Login history = {history} setCurrentUser = {setCurrentUser}/>}/>
				<Route path = '/register' component = {Register}/>
				<PrivateRoute path = '/profile' component = {ProfileContainer}/>
			</Switch>
		</div>
	)
})