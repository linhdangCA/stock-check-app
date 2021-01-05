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

const IncomeStatement = ({incomeStatementData}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const reversedAnnualReports = reverseOrder(incomeStatementData.annualReports);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="100%">Income Statement ($ billion)</TableCell>
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
                      <TableCell>Total Revenue</TableCell>
                      {reversedAnnualReports.map((report) => (
                        <TableCell key={report.fiscalDateEnding} align="right">{(report.totalRevenue/1000000000).toFixed(2)}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                    <TableCell>Net Income</TableCell>
                      {reversedAnnualReports.map((report) => (
                        <TableCell key={report.netIncome} align="right">{(report.netIncome/1000000000).toFixed(2)}</TableCell>
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
  )
}

export default IncomeStatement