import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Routes from './config/routes'
import './App.css'

class App extends Component {
  state = {
  	currentUser: this.checkUserValid()
  }

  checkUserValid() {
    let token = localStorage.getItem('uid');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('uid');
        token = null;
      }
    }
    return token;
  }

  setCurrentUser = (token) => {
  	this.setState({
  		currentUser: token
  	})

  	localStorage.setItem('uid', token)
  }

  render() {
  	return (
  		<div>
  			<Routes currentUser = {this.state.currentUser} setCurrentUser = {this.setCurrentUser}/>
  		</div>
  	)
  }
}

export default withRouter(App)