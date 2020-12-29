import React from 'react'
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

function reverseOrder(reports) {
  var reversed = [];
  for (var i = 0; i < reports.length; i++) {
    reversed.push(reports[(reports.length - 1) - i]);
  }
  return reversed;
}

const CashFlowStatement = ({cashFlowStatementData}) => {
  const classes = useStyles();
  const reversedAnnualReports = reverseOrder(cashFlowStatementData.annualReports);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell width="300">Cash Flow Statement Items ($ billion)</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.fiscalDateEnding} align="right">{report.fiscalDateEnding}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Cash Flow From Operations</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.operatingCashflow} align="right">{(report.operatingCashflow/1000000000).toFixed(2)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
            <TableCell>Cash Flow From Investing</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.cashflowFromInvestment} align="right">{(report.cashflowFromInvestment/1000000000).toFixed(2)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
            <TableCell>Cash Flow From Financing</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.cashflowFromFinancing} align="right">{(report.cashflowFromFinancing/1000000000).toFixed(2)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
            <TableCell>Capital Expenditures</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.capitalExpenditures} align="right">{(report.capitalExpenditures/1000000000).toFixed(2)}</TableCell>
              ))}
            </TableRow>
            <TableRow>
            <TableCell>Free Cash Flow</TableCell>
              {reversedAnnualReports.map((report) => (
                <TableCell key={report.operatingCashflow/1000000000 - report.capitalExpenditures/1000000000} align="right">{(report.operatingCashflow/1000000000 - report.capitalExpenditures/1000000000).toFixed(2)}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default CashFlowStatement