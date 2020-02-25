import React, {Component} from 'react'
import SearchAllContainer from './SearchAllContainer'
import SearchCategoryContainer from './SearchCategoryContainer'
import SearchDateContainer from './SearchDateContainer'
import SearchMapContainer from './SearchMapContainer'

class SearchEntryContainer extends Component {
  render() {
    let searchContainer
// all, date, category, map
    if(this.props.search === 'all') {
      searchContainer = <SearchAllContainer/>
    } else if(this.props.search === 'category') {
      searchContainer = <SearchCategoryContainer/>
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