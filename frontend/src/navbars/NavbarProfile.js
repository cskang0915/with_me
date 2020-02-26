import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavbarProfile extends Component{

	render() {
		return(
			<div className = "header-profile">
				<h1>Navigation Bar</h1>
				<nav className="header-profile-navbar">
					<div><Link to = '/profile/user'>User Profile</Link></div>
					<div><Link to = '/profile/entry/new'>New Entry</Link></div>
					<div><Link to = '/profile/view/all'>View All Entries</Link></div>
					<div><Link to = '/profile/view/collection'>Browse By collection</Link></div>
					<div><Link to = '/profile/view/date'>Search By Date</Link></div>
					<div><Link to = '/profile/view/map'>View Map</Link></div>
					<div><Link to = '/' onClick = {this.props.logout}>Log out</Link></div>
				</nav>
			</div>
		)
	}
}

export default NavbarProfile