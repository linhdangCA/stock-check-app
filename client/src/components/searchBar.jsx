import React from 'react'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }
  }

  render () {
    return (
      <input placeholder="Search.."></input>
    )
  }
}

export default SearchBar