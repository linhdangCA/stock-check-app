import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 720,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <List className={classes.root} subheader={<li />}>
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
                    <ListItemText primary={ticker} onClick={() => {props.getTickerFinancials(ticker)}}/>
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