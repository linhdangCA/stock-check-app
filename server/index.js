const express = require('express')
const parser = require('body-parser')
const axios = require('axios')
const key = require('../api/alphaVintage.js')
const cheerio = require('cheerio')

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + `/../client/dist`))
app.use(parser.json())

app.get('/top100', (req, res) => {
  function getTop100() {
    return axios.get('https://finance.yahoo.com/most-active?offset=0&count=100')
  }
  Promise.all([getTop100()])
    .then((results) => {
      const $ = cheerio.load(results[0].data);
      var top100 = [];
      $('div > div> table > tbody > tr > td > a').each((i, el) => {
        const ticker = $(el).text();
        top100.push(ticker)
      })
      res.send(top100)
    })
    .catch((err) => res.sendStatus(400))
})

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
  function getTimeSeriesMonthly() {
    return axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${req.query.ticker}&apikey=${key.api}`)
  }
  Promise.all([getOverview(), getIncome(), getBalance(), getCashflow(), getTimeSeriesMonthly()])
    .then(function(results) {
      var compiledData = [];
      compiledData.push(results[0].data);
      compiledData.push(results[1].data);
      compiledData.push(results[2].data);
      compiledData.push(results[3].data);
      compiledData.push(results[4].data);
      res.send(compiledData);
    })
    .catch((err) => res.sendStatus(400));
})

app.listen(3000, () => {
  console.log(`server is listening on port ${3000}`)
})