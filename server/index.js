const express = require('express')
const parser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + `/../client/dist`))
app.use(parser.json())


app.listen(3000, () => {
  console.log(`server is listening on port ${3000}`)
})