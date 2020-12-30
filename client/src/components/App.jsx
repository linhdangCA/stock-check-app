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
      company1: {
        overview: dummyDataOverview,
        incomeStatement: dummyDataIncome,
        balanceSheet: dummyDataBalance,
        cashFlowStatement: dummyDataCashFlow
      },
      company2: {},
      company3: {},
      company4: {},
      company5: {},
      display: 'company1'
    }
    this.getTickerFinancials = this.getTickerFinancials.bind(this);
  }

  componentDidMount() {
    this.setState({
      company1: {
        overview: dummyDataOverview,
        incomeStatement: dummyDataIncome,
        balanceSheet: dummyDataBalance,
        cashFlowStatement: dummyDataCashFlow
      }
    })
  }

  getTickerFinancials(ticker) {
    axios.get('http://localhost:3000/ticker', {
      params: {
        ticker: ticker
      }
    })
      .then((res) => {
        var data = {
          overview: res.data[0],
          incomeStatement: res.data[1],
          balanceSheet: res.data[2],
          cashFlowStatement: res.data[3]
        }
        if (this.state.company1.overview.Symbol === 'IBM - example') {
          this.setState({company1: data})
        } else if (this.state.company2.overview === undefined) {
          this.setState({company2: data})
        } else if (this.state.company3.overview === undefined) {
          this.setState({company3: data})
        } else if (this.state.company4.overview === undefined) {
          this.setState({company4: data})
        } else if (this.state.company5.overview === undefined) {
          this.setState({company5: data})
        }
      })
      .catch((err) => console.log(err));
  }

  render () {
    return (
      <div>
        <Sidebar />
        <Header data={this.state.company1.overview}/>
        <Graph />
        <Financials
          company1={this.state.company1}
          company2={this.state.company2}
          company3={this.state.company3}
          company4={this.state.company4}
          company5={this.state.company5}
          overviewData={this.state.[this.state.display].overview}
          incomeStatementData={this.state.[this.state.display].incomeStatement}
          balanceSheetData={this.state.[this.state.display].balanceSheet}
          cashFlowStatementData={this.state.[this.state.display].cashFlowStatement}
          getTickerFinancials={this.getTickerFinancials}
        />
      </div>
    )
  }
}

export default App