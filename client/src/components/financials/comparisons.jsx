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
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  pointerCursor: "pointer",
}))
const ComparisonAnalysis = ({companies, getTickerFinancials, removeCompany, changeCurrentTickerDisplay, handleTickerFormSubmit, handleTickerOnChange, ticker}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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
        <Table className={classes.table} size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow width="100%">
              <TableCell width="100%">Comparison Analysis (most recent 10k)</TableCell>
              <TableCell>
              <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Table size="small">
                    <TableBody>
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
                      {rows.map((row, index) => (
                        <TableRow key={row.ticker}>
                          <TableCell>
                            <Typography>
                              <Link href="#" onClick={(e) => {changeCurrentTickerDisplay(e, index)}} className={classes.pointerCursor}>
                                {row.ticker}
                              </Link>
                            </Typography>
                          </TableCell>
                          <TableCell align="center" onClick={(e)=>{removeCompany(e, row.ticker)}}>
                            {companies.length > 1 ?
                              <IconButton aria-label="delete">
                                <DeleteForeverOutlinedIcon className={classes.pointerCursor} />
                              </IconButton>
                              : ''
                            }
                          </TableCell>
                          <TableCell align="center">{row.dcf}</TableCell>
                          <TableCell align="center">{row.mktcap}</TableCell>
                          <TableCell align="center">{row.ca}</TableCell>
                          <TableCell align="center">{row.d_ta}</TableCell>
                          <TableCell align="center">{row.d_e}</TableCell>
                          <TableCell align="center">{row.ev_revenue}</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell>
                          <SearchBar
                            handleTickerFormSubmit={handleTickerFormSubmit}
                            handleTickerOnChange={handleTickerOnChange}
                            getTickerFinancials={getTickerFinancials}
                            ticker={ticker}
                          />
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Collapse>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ComparisonAnalysis