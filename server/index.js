const express = require('express')
const parser = require('body-parser')
const axios = require('axios')
const key = require('../alphaVintage/alphaVintage.js')

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + `/../client/dist`))
app.use(parser.json())

app.get('/ticker', (req, res) => {
  function getOverview() {
    return axios.get(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${req.query.ticker}&apikey=${key.api}`)
  }
  function getIncome() {
    return axios.get(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${req.query.ticker}&apikey=${key.api}`)
  }
  function getBalance() {
    return axios.get(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${req.query.ticker}&apikey=${key.api}`)
  }
  function getCashflow() {
    return axios.get(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${req.query.ticker}&apikey=${key.api}`)
  }
  Promise.all([getOverview(), getIncome(), getBalance(), getCashflow()])
  .then(function(results) {
    var compiledData = [];
    compiledData.push(results[0].data);
    compiledData.push(results[1].data);
    compiledData.push(results[2].data);
    compiledData.push(results[3].data);
    res.send(compiledData);
  })
  .catch((err) => console.log(err));
})

app.listen(3000, () => {
  console.log(`server is listening on port ${3000}`)
})