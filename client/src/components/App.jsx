import React from 'react'
import SearchBar from './searchBar.jsx'
import Overview from './overview.jsx'
import Graph from './graph.jsx'
import Financials from './financials.jsx'
import Sidebar from './sidebar.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div>
        <Sidebar />
        <SearchBar />
        <Overview />
        <Graph />
        <Financials />
      </div>
    )
  }
}

export default App