import React, {Component} from 'react'
import SearchAllContainer from './SearchAllContainer'
import SearchCollectionContainer from './SearchCollectionContainer'
import SearchDateContainer from './SearchDateContainer'
import SearchMapContainer from './SearchMapContainer'

class SearchEntryContainer extends Component {
  render() {
    let searchContainer
// all, date, Collection, map
    if(this.props.search === 'all') {
      searchContainer = <SearchAllContainer/>
    } else if(this.props.search === 'collection') {
      searchContainer = <SearchCollectionContainer/>
    } else if(this.props.search === 'date') {
      searchContainer = <SearchDateContainer/>
    } else if(this.props.search === 'map') {
      searchContainer = <SearchMapContainer/>
    }

    return (
      <div>
        {searchContainer}
      </div>
    )
  }
}

export default SearchEntryContainer