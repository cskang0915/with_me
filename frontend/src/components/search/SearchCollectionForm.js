import React, {Component} from 'react'

class SearchCollectionForm extends Component {
  render() {
    return (
      <div>
        <form onSubmit = {this.props.handleSubmit}>
          <label>Search by collection</label>
          <input type = "text" name = "collection_name" value = {this.props.state.collection_name} onChange = {this.props.handleChange}></input>
          <button type = "submit">Search</button>
        </form>
      </div>
    )
  }
}

export default SearchCollectionForm
