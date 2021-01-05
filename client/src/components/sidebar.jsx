import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

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
    justifyContent: 'flex-end',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
  text: {
    cursor: 'pointer',
  },
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    '.MuiListItem-root': {
      justifyContent: 'flex-start',
    },
  },
}));

const Sidebar = (props) => {
  const classes = useStyles();
  return (
    <Hidden mdDown>
      <List className={classes.root} subheader={<li />} dense align="center">
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
                      <span>{index + 1}. &nbsp; </span><Link href="javascript:void()" className={classes.text} onClick={() => {props.getTickerFinancials(ticker)}}>{ticker}</Link>
                    </ListItem>
                  )
                }
              })}
            </ul>
          </li>
        ))}
      </List>
    </Hidden>

  )
}

export default Sidebar