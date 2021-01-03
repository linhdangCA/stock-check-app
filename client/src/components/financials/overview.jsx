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

const Overview = (props) => {
  const classes = useStyles();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="300">Overview</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell width="300">Company Name</TableCell>
              <TableCell>{props.overviewData.Name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Company Ticker</TableCell>
              <TableCell>{props.overviewData.Symbol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Annual Dividend Per Share:</TableCell>
              <TableCell>{props.overviewData.DividendPerShare}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Quarterly Dividend Per Share:</TableCell>
              <TableCell>{props.overviewData.DividendPerShare / 4}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Earnings Per Share:</TableCell>
              <TableCell>{props.overviewData.EPS}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Shares Outstanding:</TableCell>
              <TableCell>{(props.overviewData.SharesOutstanding / 1000000).toFixed(2)}M</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Shares Float:</TableCell>
              <TableCell>{(props.overviewData.SharesFloat / 1000000).toFixed(2)}M</TableCell>
            </TableRow>
            <TableRow>
              <TableCell width="300">Shares Short:</TableCell>
              <TableCell>{(props.overviewData.SharesShort / 1000000).toFixed(2)}M</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      {/* <div>
        Anuual Dividend Per Share: {props.overviewData.DividendPerShare}
      </div>
      <div>
        Quarterly Dividend Per Share: {props.overviewData.DividendPerShare / 4}
      </div>
      <div>
        Earnings Per Share: {props.overviewData.EPS}
      </div>
      <div>
        Shares Outstanding: {(props.overviewData.SharesOutstanding / 1000000).toFixed(2)}M
      </div>
      <div>
        Shares Float: {(props.overviewData.SharesFloat / 1000000).toFixed(2)}M
      </div>
      <div>
        Shares Short: {(props.overviewData.SharesShort / 1000000).toFixed(2)}M
      </div> */}
    </div>
  )
}

export default Overview