import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    overflow: 'auto',
    maxHeight: 720,
    fontFamily: ["Roboto", "Helvetica", "Arial", "sans-serif"].join(','),
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  text: {
    cursor: 'pointer',
  }
}));
const today = new Date();
const todayFormatted = today.toLocaleDateString("en-US")

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.root} subheader={<li />}>
      <div>Top 100<br /> Most Active Stocks <br />{todayFormatted}</div>
      {['01-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100'].map((sectionId) => (
        <li key={`section-${sectionId}`} className={classes.listSection}>
          <ul className={classes.ul}>
            <ListSubheader>
              {`Tickers ${sectionId}`}
            </ListSubheader>
            {props.top100.map((ticker, index) => {
              var currentSection = Number(sectionId.substring(0, 2));
              if (index + 1 >= currentSection && index + 1 <= currentSection + 9) {
                return (
                  <ListItem key={ticker}>
                    <Link href="#" className={classes.text} onClick={() => {props.getTickerFinancials(ticker)}}>{ticker}</Link>
                  </ListItem>
                )
              }
            })}
          </ul>
        </li>
      ))}
    </List>
  )
}

export default Sidebar