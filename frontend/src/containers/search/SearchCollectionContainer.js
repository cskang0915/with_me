import React, {Component} from 'react'
import SearchCollectionForm from '../../components/search/SearchCollectionForm'
import EntryListContainer from '../entry/EntryListContainer' 

class SearchCollectionContainer extends Component {
  state = {
    collection_name: '',
    collection_id: null,
    data: [],
    message: '',
    error: null
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch(`${process.env.REACT_APP_API}/api/collection/all`, {
      headers: {
        "authorization": `Bearer ${localStorage.uid}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let findCollection = data.find((collection) => collection.collection_name === this.state.collection_name)
      if(findCollection) {
        fetch(`${process.env.REACT_APP_API}/api/entry/get/collection/${findCollection.rowid}`, {
          headers: {
            "authorization": `Bearer ${localStorage.uid}`
          }
        })
        .then((res => res.json()))
        .then((data) => {
          this.setState({
            collection_name: '',
            collection_id: null,
            data: data
          })
        })
      }else{
        this.setState({
          message: 'no collection'
        })
      }
    })
  }

  updateAllEntry = () => {
    fetch(`${process.env.REACT_APP_API}/api/collection/all`, {
      headers: {
        "authorization": `Bearer ${localStorage.uid}`
      }
    })
    .then((res) => res.json())
    .then((data) => {
      let findCollection = data.find((collection) => collection.collection_name === this.state.collection_name)
      if(findCollection) {
        fetch(`${process.env.REACT_APP_API}/api/entry/get/collection/${findCollection.rowid}`, {
          headers: {
            "authorization": `Bearer ${localStorage.uid}`
          }
        })
        .then((res => res.json()))
        .then((data) => {
          this.setState({
            collection_name: '',
            collection_id: null,
            data: data
          })
        })
      }
    })
  }

  render() {
    let searchCollection = (
      this.state.data.length
        ? <EntryListContainer data = {this.state.data} updateAllEntry = {this.updateAllEntry}/>
        : <h1>{this.state.message}</h1>
      )
    return (
      <div>
        <SearchCollectionForm state = {this.state} handleChange = {this.handleChange} handleSubmit = {this.handleSubmit}/>
        {searchCollection}
      </div>
    )
  }
}

export default SearchCollectionContainer
