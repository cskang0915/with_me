import React from 'react'
import {Switch, Route, withRouter, Redirect} from 'react-router-dom'
import Home from '../components/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import ProfileContainer from '../containers/ProfileContainer'

export default withRouter(({setCurrentUser, currentUser, logout, history}) => {
	const PrivateRoute = ({component: Component, ...rest}) => {
		return <Route {...rest} render = {(props) => (
			currentUser
				? <Component {...props} logout = {logout}/>
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
				<PrivateRoute path = '/profile' component = {ProfileContainer} logout = {logout}/>
			</Switch>
		</div>
	)
})