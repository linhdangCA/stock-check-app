import React from 'react'
import axios from 'axios'

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: ''
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    this.props.getTickerFinancials(this.state.ticker);
    this.setState({ticker: ''})
  }
  handleOnChange(event) {
    this.setState({ticker: event.target.value})
  }

  render () {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <input placeholder="Add ticker.." value={this.state.ticker} onChange={(e) => {this.handleOnChange(e)}} ></input>
      </form>
    )
  }
}

export default SearchBar