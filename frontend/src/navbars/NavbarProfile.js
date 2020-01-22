import React from 'react'
import {Link} from 'react-router-dom'

const NavbarProfile = () => {
	return(
		<div className = "header-profile">
			<h1>test</h1>
			<nav className="header-profile-navbar">
				<div className = "header-profile-link"><Link to = '/profile'>User Profile</Link></div>
				<div className = "header-profile-link"><Link to = '/newentry'>New Entry</Link></div>
				<div className = "header-profile-link"><Link to = '/listentry'>All Entries</Link></div>
			</nav>
		</div>
	)
}

export default NavbarProfile