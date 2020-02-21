import React, {Component} from 'react'
import Entry from '../../components/entry/Entry'

class EntryContainer extends Component {
	render() {
		let entry
		if(typeof(this.props.data) === 'string') {
			entry = <div>There are no entries on this date.</div>
		}else {
			entry = this.props.data.map((entry) => {
				console.log(entry)
				return <Entry updateDataInEntryList = {this.props.updateDataInEntryList} entry = {entry} month = {entry.month} day = {entry.day} rowid = {entry.rowid}/>
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