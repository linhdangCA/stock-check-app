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
      companies: [
        {
          overview: dummyDataOverview,
          incomeStatement: dummyDataIncome,
          balanceSheet: dummyDataBalance,
          cashFlowStatement: dummyDataCashFlow
        }
      ],
      display: '0'
    }
    this.getTickerFinancials = this.getTickerFinancials.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
  }

  componentDidMount() {
    this.setState({
      companies: [
        {
          overview: dummyDataOverview,
          incomeStatement: dummyDataIncome,
          balanceSheet: dummyDataBalance,
          cashFlowStatement: dummyDataCashFlow
        }
      ]
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
        if (this.state.companies[0].overview.Symbol === 'IBM - example') {
          this.setState({companies: [data]})
        } else {
          var updatedCompanies = Object.assign(this.state.companies);
          updatedCompanies.push(data);
          this.setState({companies: updatedCompanies});
        }
      })
      .catch((err) => console.log(err));
  }
  removeCompany(event, ticker) {
    console.log(ticker, this.state.companies.length, this.state.companies)
    if (this.state.companies.length > 1) {
      for (var i = 0; i < this.state.companies.length; i++) {
        if (ticker === this.state.companies[i].overview.Symbol) {
          var updatedCompanies = Object.assign(this.state.companies);
          updatedCompanies.splice(i, 1);
          console.log(updatedCompanies)
          this.setState({companies: updatedCompanies});
        }
      }
    }
  }

  render () {
    return (
      <div>
        <Sidebar />
        <Header data={this.state.companies[this.state.display].overview}/>
        <Graph />
        <Financials
          companies={this.state.companies}
          overviewData={this.state.companies[this.state.display].overview}
          incomeStatementData={this.state.companies[this.state.display].incomeStatement}
          balanceSheetData={this.state.companies[this.state.display].balanceSheet}
          cashFlowStatementData={this.state.companies[this.state.display].cashFlowStatement}
          getTickerFinancials={this.getTickerFinancials}
          removeCompany={this.removeCompany}
        />
      </div>
    )
  }
}

export default App