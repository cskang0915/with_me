import React, {Component} from 'react'
import EntryListContainer from '../entry/EntryListContainer'

class SearchAllContainer extends Component {
  state = {
    data: []
  }

  componentDidMount(){
    this.getAllEntry()
  }

  getAllEntry = () => {
    fetch(`${process.env.REACT_APP_API}/api/entry/get/all`, {
      headers: {
				"authorization": `Bearer ${localStorage.uid}`
			}
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      this.setState({
        data: data
      })
    })
  }

  updateAllEntry = () => {
    this.getAllEntry()
  }

  render() {
    return (
      <div>
        <EntryListContainer data = {this.state.data} updateAllEntry = {this.updateAllEntry}/>
      </div>
    )
  }
}

export default SearchAllContainer
