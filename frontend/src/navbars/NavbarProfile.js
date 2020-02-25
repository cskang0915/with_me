import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class NavbarProfile extends Component{

	render() {
		return(
			<div className = "header-profile">
				<h1>Navigation Bar</h1>
				<nav className="header-profile-navbar">
					<div className = "header-profile-link"><Link to = '/profile/user'><button>User Profile</button></Link></div>
					<div className = "header-profile-link"><Link to = '/profile/entry/new'><button>New Entry</button></Link></div>
					<div className = "header-profile-link"><Link to = '/profile/view/all'><button>View All Entries</button></Link></div>
					<div className = "header-profile-link"><Link to = '/profile/view/date'><button>Search By Date</button></Link></div>
					<div className = "header-profile-link"><Link to = '/profile/view/category'><button>Browse By Category</button></Link></div>
					<div className = "header-profile-link"><Link to = '/profile/view/map'><button>View Map</button></Link></div>
					<div className = "header-profile-link"><button onClick = {this.props.logout}>Log out</button></div>
				</nav>
			</div>
		)
	}
}

export default NavbarProfile