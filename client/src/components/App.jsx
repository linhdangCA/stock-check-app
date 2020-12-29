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
import Button from '@material-ui/core/Button'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebar: [],
      overview: dummyDataOverview,
      incomeStatement: dummyDataIncome,
      balanceSheet: dummyDataBalance,
      cashFlowStatement: dummyDataCashFlow,
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
        <Button>Hello World</Button>
        <Sidebar />
        <SearchBar />
        <Header data={this.state.overview}/>
        <Graph />
        <Financials
          overviewData={this.state.overview}
          incomeStatementData={this.state.incomeStatement}
          balanceSheetData={this.state.balanceSheet}
          cashFlowStatementData={this.state.cashFlowStatement}
        />
      </div>
    )
  }
}

export default App