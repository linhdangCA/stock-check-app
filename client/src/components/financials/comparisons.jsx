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

  function createData(ticker, dcf, mktcap, ca, d_ta, d_e, ev_revenue) {
    return {ticker, dcf, mktcap, ca, d_ta, d_e, ev_revenue}
  }
  const rows = [];

  function populateRows() {
    rows.push(createData(companies.company1.overview.Symbol, 120, (companies.company1.overview.MarketCapitalization / 1000000000).toFixed(2)+'B', 1.1, 0.35, 2.5, 1));
    if (companies.company2.overview !== undefined) {
      rows.push(createData(companies.company2.overview.Symbol, 120, (companies.company2.overview.MarketCapitalization / 1000000000).toFixed(2)+'B', 1.1, 0.35, 2.5, 2));
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