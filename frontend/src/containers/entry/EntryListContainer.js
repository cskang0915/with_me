import React, {Component} from 'react'
import EntryList from '../../components/entry/EntryList'

class EntryListContainer extends Component {
  state = {

  }
  render() {
    return(
      <div>
        <EntryList search = {this.props.search}/>
      </div>
    )
  }
}

export default EntryListContainer