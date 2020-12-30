import React from 'react'
import SearchBar from '../searchBar.jsx'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
})

const ComparisonAnalysis = ({companies, getTickerFinancials, removeCompany}) => {
  console.log('companies', companies)
  const classes = useStyles();
  const rows = [];

  function createData(ticker, dcf, mktcap, ca, d_ta, d_e, ev_revenue) {
    return {ticker, dcf, mktcap, ca, d_ta, d_e, ev_revenue}
  }
  function discountedCashFlowCalc(operatingCash, capEx, sharesOutstanding, cash, longTermDebt) {
    var fcf = Number(operatingCash) - Number(capEx);
    var roi = 0.1;
    var growth = 0.03;
    var terminal = (fcf * 1.03)/(roi - growth);
    var balance = terminal  + Number(cash) - Number(longTermDebt);
    var dcf = balance / Number(sharesOutstanding);
    return dcf.toFixed(2);
  }
  function currentRatio(currentAssets, currentLiabilities) {
    return (Number(currentAssets)/Number(currentLiabilities)).toFixed(2);
  }
  function debtToTotalAssets(longTermDebt, totalAssets) {
    return (Number(longTermDebt)/Number(totalAssets)).toFixed(2);
  }
  function debtToEquity(longTermDebt, equity) {
    return (Number(longTermDebt)/Number(equity)).toFixed(2);
  }
  function evToRevenue(longTermDebt, equity, revenue) {
    return ((Number(longTermDebt) + Number(equity))/Number(revenue)).toFixed(2);
  }
  function populateRow(company) {
    rows.push(createData(companies[company].overview.Symbol,
      discountedCashFlowCalc(companies[company].cashFlowStatement.annualReports[0].operatingCashflow,
        companies[company].cashFlowStatement.annualReports[0].capitalExpenditures,
        companies[company].overview.SharesOutstanding,
        companies[company].balanceSheet.annualReports[0].cash,
        companies[company].balanceSheet.annualReports[0].totalLongTermDebt),
      (companies[company].overview.MarketCapitalization / 1000000000).toFixed(2)+'B',
      currentRatio(companies[company].balanceSheet.annualReports[0].totalCurrentAssets, companies[company].balanceSheet.annualReports[0].totalCurrentLiabilities),
      debtToTotalAssets(companies[company].balanceSheet.annualReports[0].totalLongTermDebt, companies[company].balanceSheet.annualReports[0].totalAssets),
      debtToEquity(companies[company].balanceSheet.annualReports[0].totalLongTermDebt, companies[company].balanceSheet.annualReports[0].totalShareholderEquity),
      evToRevenue(companies[company].balanceSheet.annualReports[0].totalLongTermDebt,
        companies[company].balanceSheet.annualReports[0].totalShareholderEquity,
        companies[company].incomeStatement.annualReports[0].totalRevenue,
        companies[company].overview.SharesOutstanding
      )
    ));
  }
  function populateRows() {
    for (var i = 0; i < companies.length; i++) {
      if (companies[i].overview !== undefined) {
        populateRow(i);
      }
    }
  }
  populateRows();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="300">Comparison Analysis (most recent 10k)</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Company</TableCell>
              <TableCell align="center">Remove</TableCell>
              <TableCell align="center">DCF (intrinsic value)</TableCell>
              <TableCell align="center">Mkt Cap</TableCell>
              <TableCell align="center">Current Ratio</TableCell>
              <TableCell align="center">Debt/Total Assets</TableCell>
              <TableCell align="center">Debt/Equity</TableCell>
              <TableCell align="center">EV/revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ticker}>
                  <TableCell>{row.ticker}</TableCell>
                  <TableCell align="center" onClick={(e)=>{removeCompany(e, row.ticker)}}>{companies.length > 1 ? 'X' : ''}</TableCell>
                  <TableCell align="center">{row.dcf}</TableCell>
                  <TableCell align="center">{row.mktcap}</TableCell>
                  <TableCell align="center">{row.ca}</TableCell>
                  <TableCell align="center">{row.d_ta}</TableCell>
                  <TableCell align="center">{row.d_e}</TableCell>
                  <TableCell align="center">{row.ev_revenue}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><SearchBar getTickerFinancials={getTickerFinancials}/></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ComparisonAnalysis