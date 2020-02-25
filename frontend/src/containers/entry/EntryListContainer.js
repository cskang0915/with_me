import React, {Component} from 'react'
import SearchEntryContainer from '../search/SearchEntryContainer'

class EntryListContainer extends Component {
  render() {
    return(
      <div>
        <SearchEntryContainer search = {this.props.search}/>
      </div>
    )
  }
}

export default EntryListContainer