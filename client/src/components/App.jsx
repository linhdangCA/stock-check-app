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
import Box from '@material-ui/core/Box';

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
      display: '0',
      ticker: '',
      top100: ['AAPL', 'NIO', 'TESLA', 'MSFT'],
    }
    this.getTickerFinancials = this.getTickerFinancials.bind(this);
    this.removeCompany = this.removeCompany.bind(this);
    this.handleTickerFinancialDisplayClick = this.handleTickerFinancialDisplayClick.bind(this);
    this.handleClearTickers = this.handleClearTickers.bind(this);
    this.handleTickerFormSubmit = this.handleTickerFormSubmit.bind(this);
    this.handleTickerOnChange = this.handleTickerOnChange.bind(this);
    this.getTop100Tickers = this.getTop100Tickers.bind(this);
  }

  componentDidMount() {
    this.getTop100Tickers();
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

  handleTickerFormSubmit(event) {
    event.preventDefault();
    this.getTickerFinancials(this.state.ticker);
    this.setState({ticker: ''})
  }
  handleTickerOnChange(event) {
    this.setState({ticker: event.target.value})
  }
  getTop100Tickers() {
    axios.get('http://localhost:3000/top100')
      .then((res) => {
        this.setState({top100: res.data})
      })
      .catch((err) => console.log(err))
  }
  getTickerFinancials(ticker) {
    for (var i = 0; i < this.state.companies.length; i++) {
      if (ticker === this.state.companies[i].overview.Symbol) {
        return;
      }
    }
    axios.get('http://localhost:3000/ticker', {
      params: {
        ticker: ticker
      }
    })
      .then((res) => {
        if (res.data[0].Symbol !== undefined) {
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
            this.setState({companies: updatedCompanies, display: this.state.companies.length - 1});
          }
        }
      })
      .catch((err) => console.log(err));
  }
  removeCompany(event, ticker) {
    if (this.state.companies.length > 1) {
      for (var i = 0; i < this.state.companies.length; i++) {
        if (ticker === this.state.companies[i].overview.Symbol) {
          var updatedCompanies = Object.assign(this.state.companies);
          updatedCompanies.splice(i, 1);
          if (this.state.companies.length === 1) {
            this.setState({companies: updatedCompanies, display: '0'});
          } else if (this.state.companies[i] !== this.state.companies.length - 1) {
            this.setState({companies: updatedCompanies});
          } else {
            this.setState({companies: updatedCompanies, display: i - 1});
          }
        }
      }
    }
  }
  handleTickerFinancialDisplayClick(event, index) {
    this.setState({display: index})
  }
  handleClearTickers(event) {
    event.preventDefault();
    this.setState({companies: [
      {
        overview: dummyDataOverview,
        incomeStatement: dummyDataIncome,
        balanceSheet: dummyDataBalance,
        cashFlowStatement: dummyDataCashFlow
      }
    ], display: '0'})
  }

  render () {
    return (
      <div>
        <Header data={this.state.companies[this.state.display].overview} clearTickers={this.handleClearTickers}/>
        <div style={{ width: '100%' }}>
          <Box display="flex" flexDirection="row" p={1} m={1} bgcolor="background.paper">
            <Box p={1} width="10%">
              <Sidebar top100={this.state.top100} getTickerFinancials={this.getTickerFinancials}/>
            </Box>
            <Box p={1}>
              <Box>
                <Graph />
              </Box>
              <Box p={1}>
                <Financials
                  companies={this.state.companies}
                  overviewData={this.state.companies[this.state.display].overview}
                  incomeStatementData={this.state.companies[this.state.display].incomeStatement}
                  balanceSheetData={this.state.companies[this.state.display].balanceSheet}
                  cashFlowStatementData={this.state.companies[this.state.display].cashFlowStatement}
                  getTickerFinancials={this.getTickerFinancials}
                  removeCompany={this.removeCompany}
                  changeCurrentTickerDisplay={this.handleTickerFinancialDisplayClick}
                  handleTickerFormSubmit={this.handleTickerFormSubmit}
                  handleTickerOnChange={this.handleTickerOnChange}
                  ticker={this.state.ticker}
                />
              </Box>
            </Box>
          </Box>
          </div>
      </div>
    )
  }
}

export default App