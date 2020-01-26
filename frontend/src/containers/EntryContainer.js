import React, {Component} from 'react'
import Entry from '../components/entry/Entry'

class EntryContainer extends Component {
	render() {
		let entry
		if(typeof(this.props.data) === 'string') {
			entry = <div>There is no entries on this date.</div>
		}else {
			entry = this.props.data.map((entry) => {
				return <Entry entry = {entry}/>
			})
		}
		return(
			<div>
				{entry}
			</div>
		)
	}
}

export default EntryContainer