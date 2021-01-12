import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  }
})

function reverseOrder(reports) {
  var reversed = [];
  for (var i = 0; i < reports.length; i++) {
    reversed.push(reports[(reports.length - 1) - i]);
  }
  return reversed;
}

const BalanceSheet = ({balanceSheetData}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const reversedAnnualReports = reverseOrder(balanceSheetData.annualReports);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell width="100%">Balance Sheet ($ billion)</TableCell>
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
                        <TableCell width="300">Items</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{report.fiscalDateEnding}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                        <TableCell>Total Current Assets</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.totalCurrentAssets/1000000000).toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                      <TableCell>Total Assets</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.totalAssets/1000000000).toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                      <TableCell>Total Current Liabilities</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.totalCurrentLiabilities/1000000000).toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                      <TableCell>Total Liabilities</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.totalLiabilities/1000000000).toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                      <TableCell>Long Term Debt</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.longTermDebt/1000000000).toFixed(2)}</TableCell>
                        ))}
                      </TableRow>
                      <TableRow>
                      <TableCell>Total Equity</TableCell>
                        {reversedAnnualReports.map((report) => (
                          <TableCell key={report.fiscalDateEnding} align="right">{(report.totalShareholderEquity/1000000000).toFixed(2)}</TableCell>
                        ))}
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

export default BalanceSheet