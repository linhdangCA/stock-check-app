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
  },
})

const Overview = (props) => {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell width="100%">Overview</TableCell>
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
                        <TableCell>{isNaN(props.overviewData.DividendPerShare) ? 'None' : props.overviewData.DividendPerShare / 4}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="300">Earnings Per Share:</TableCell>
                        <TableCell>{props.overviewData.EPS}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="300">Shares Outstanding:</TableCell>
                        <TableCell>{(props.overviewData.SharesOutstanding / 1000000000).toFixed(2)}B</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="300">Shares Float:</TableCell>
                        <TableCell>{(props.overviewData.SharesFloat / 1000000000).toFixed(2)}B</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell width="300">Shares Short:</TableCell>
                        <TableCell>{(props.overviewData.SharesShort / 1000000000).toFixed(2)}B</TableCell>
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

export default Overview