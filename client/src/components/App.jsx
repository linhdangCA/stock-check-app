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
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      overview: dummyDataOverview,
      incomeStatement: dummyDataIncome,
      balanceSheet: dummyDataBalance,
      cashFlowStatement: dummyDataCashFlow,
    }
    this.getTickerFinancials = this.getTickerFinancials.bind(this);
  }

  componentDidMount() {
    this.setState({
      overview: dummyDataOverview,
      incomeStatement: dummyDataIncome,
      balanceSheet: dummyDataBalance,
      cashFlowStatement: dummyDataCashFlow
    })
  }

  getTickerFinancials(ticker) {
    axios.get('http://localhost:3000/ticker', {
      params: {
        ticker: ticker
      }
    })
      .then((res) => {this.setState(
        {
          overview: res.data[0],
          incomeStatement: res.data[1],
          balanceSheet: res.data[2],
          cashFlowStatement: res.data[3]
        }
      )})
      .catch((err) => console.log(err));
  }

  render () {
    return (
      <div>
        <Button>Hello World</Button>
        <Sidebar />
        <SearchBar getTickerFinancials={this.getTickerFinancials}/>
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