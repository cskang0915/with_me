import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavbarProfile extends Component{

	render() {
		return(
			<div className = "header-profile">
				<h1>Navigation Bar</h1>
				<nav className="header-profile-navbar">
					<div className = "header-profile-link"><Link to = '/profile/user'>User Profile</Link></div>
					<div className = "header-profile-link"><Link to = '/profile/entry/new'>New Entry</Link></div>
					<div className = "header-profile-link"><Link to = '/profile/entry/all'>View Entries</Link></div>
				</nav>
			</div>
		)
	}
}

export default NavbarProfile