import React, {Component} from 'react'
import Entry from '../../components/entry/Entry'

class SearchAll extends Component {
  render() {
    let entry = this.props.data.map((entry) => {
      return <Entry updateAllEntry = {this.props.updateAllEntry} entry = {entry} month = {entry.month} day = {entry.day} rowid = {entry.rowid}/>
    })
    return (
      <div>
        {entry}
      </div>
    )
  }
}

export default SearchAll
