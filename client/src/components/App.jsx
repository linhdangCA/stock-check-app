import React from 'react'
import SearchBar from './searchBar.jsx'
import Header from './header.jsx'
import Graph from './graph.jsx'
import Financials from './financials/financials.jsx'
import Sidebar from './sidebar.jsx'
import dummyDataOverview from '../dummyData/dummyDataOverview.js'
import dummyDataIncome from '../dummyData/dummyDataIncome.js'
import dummyDataBalance from '../dummyData/dummyDataBalance.js'
import dummyDataCashFlow from '../dummyData/dummyDataCashFlow.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: [],
      overview: [],
      incomeStatement: [],
      balanceSheet: [],
      cashFlowStatement: [],
      financialTab: 'overview'
    }
  }

  componentDidMount() {
    this.setState({
      overview: dummyDataOverview,
      incomeStatement: dummyDataIncome,
      balanceSheet: dummyDataBalance,
      cashFlowStatement: dummyDataCashFlow
    })
  }

  render () {
    return (
      <div>
        <Sidebar />
        <SearchBar />
        <Header data={this.state.overview}/>
        <Graph />
        <Financials
          overviewData={this.state.overview}
          incomeStatementData={this.state.incomeStatement}
        />
      </div>
    )
  }
}

export default App