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

const ComparisonAnalysis = ({companies}) => {
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

  function populateRows() {
    rows.push(createData(companies.company1.overview.Symbol,
      discountedCashFlowCalc(companies.company1.cashFlowStatement.annualReports[0].operatingCashflow,
        companies.company1.cashFlowStatement.annualReports[0].capitalExpenditures,
        companies.company1.overview.SharesOutstanding,
        companies.company1.balanceSheet.annualReports[0].cash,
        companies.company1.balanceSheet.annualReports[0].totalLongTermDebt),
      (companies.company1.overview.MarketCapitalization / 1000000000).toFixed(2)+'B',
      1.1,
      0.35,
      2.5,
      1));
    if (companies.company2.overview !== undefined) {
      rows.push(createData(companies.company2.overview.Symbol,
        discountedCashFlowCalc(companies.company2.cashFlowStatement.annualReports[0].operatingCashflow,
          companies.company2.cashFlowStatement.annualReports[0].capitalExpenditures,
          companies.company2.overview.SharesOutstanding,
          companies.company2.balanceSheet.annualReports[0].cash,
          companies.company2.balanceSheet.annualReports[0].totalLongTermDebt),
        (companies.company2.overview.MarketCapitalization / 1000000000).toFixed(2)+'B',
        1.1,
        0.35,
        2.5,
        1));
    }
  }
  populateRows();

  console.log('companies', companies)
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
              <TableCell align="right">DCF (intrinsic value)</TableCell>
              <TableCell align="right">Mkt Cap</TableCell>
              <TableCell align="right">Current Ratio</TableCell>
              <TableCell align="right">Debt/Total Assets</TableCell>
              <TableCell align="right">Debt/Equity</TableCell>
              <TableCell align="right">EV/revenue</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              {rows.map((row) => (
                <TableRow key={row.ticker}>
                  <TableCell>{row.ticker}</TableCell>
                  <TableCell align="right">{row.dcf}</TableCell>
                  <TableCell align="right">{row.mktcap}</TableCell>
                  <TableCell align="right">{row.ca}</TableCell>
                  <TableCell align="right">{row.d_ta}</TableCell>
                  <TableCell align="right">{row.d_e}</TableCell>
                  <TableCell align="right">{row.ev_revenue}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell><SearchBar getTickerFinancials={companies.getTickerFinancials}/></TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ComparisonAnalysis