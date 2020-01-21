import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ProfileContainer from '../containers/ProfileContainer'

export default withRouter(({setCurrentUser, currentUser, history}) => {
	const PrivateRoute = ({component: Component, ...rest}) => (
		<Route {...rest} render = {(props) => (
			currentUser
				? <Component {...props}/>
				: <Redirect to = '/login'/>
		)} />
	)

	return(
		<Switch>
			<Route exact path = '/' render = {() => <Login history = {history} setCurrentUser = {setCurrentUser}/>}/>
			<Route path = '/login' render = {() => <Login history = {history} setCurrentUser = {setCurrentUser}/>}/>
			<Route path = '/register' component = {Register}/>
			<PrivateRoute path = '/profile' component = {ProfileContainer}/>
		</Switch>
	)
})