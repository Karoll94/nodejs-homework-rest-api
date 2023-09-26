const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const connection = require("./db/connection");



const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)


app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

connection.
then(result =>{
      app.listen(process.env.PORT || 8081); 
      console.log("Database connection successful")
  }).catch((error) => {
    console.log(`Server not running. 
Error message: ${error.message}`);
    process.exit(1);
  });

module.exports = app
