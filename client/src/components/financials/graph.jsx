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
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label } from 'recharts';
import Box from '@material-ui/core/Box';

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

function graphData(company) {
  var data = [];
  if (company.annualReports.length < 5) {
    return
  }
  for (var i = 0; i < company.annualReports.length; i++) {
    var metric = {};
    metric.name = (company.annualReports[i].fiscalDateEnding).substring(0, 4);
    metric.[company.symbol] = (Number(company.annualReports[i].totalRevenue) / 1000000000).toFixed(2);
    data.push(metric)
  }
  var formattedData = reverseOrder(data);
  return formattedData;
}

const Graph = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const data = graphData(props.incomeStatementData);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell width="100%">Graph</TableCell>
              <TableCell>
                <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <LineChart width={700} height={300} data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" ><Label value="Fiscal Year End" offset={-20} position="insideBottom" /></XAxis>
          <YAxis type="number" domain={[0, 'dataMax + 20']} label={{ value: 'Total Revenue ($B)', angle: -90, position: 'insideBottomLeft' }}/>
          <Tooltip />
          <Legend align="right" />
          <Line type="monotone" dataKey={props.incomeStatementData.symbol} stroke="#8884d8" />
        </LineChart>
      </Collapse>
    </Box>
  )
}

export default Graph