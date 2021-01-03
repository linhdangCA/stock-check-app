import React from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const SearchBar = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) =>{props.handleTickerFormSubmit(e)}}>
      <TextField id="outlined-basic" label="Add ticker" variant="outlined" value={props.ticker} onChange={(e) => {props.handleTickerOnChange(e)}} ></TextField>
    </form>
  )
}

export default SearchBar