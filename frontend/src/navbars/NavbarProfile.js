import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavbarProfile extends Component{

	render() {
		return(
			<div className = "header-profile">
				<h1>Navigation Bar</h1>
				<nav className="header-profile-navbar">
					<Link to = '/profile/user'>User Profile</Link>
					<Link to = '/profile/entry/new'>New Entry</Link>
					<Link to = '/profile/view/all'>View All Entries</Link>
					<Link to = '/profile/view/category'>Browse By Category</Link>
					<Link to = '/profile/view/date'>Search By Date</Link>
					<Link to = '/profile/view/map'>View Map</Link>
					<Link onClick = {this.props.logout}>Log out</Link>
				</nav>
			</div>
		)
	}
}

export default NavbarProfile