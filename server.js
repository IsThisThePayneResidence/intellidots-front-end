'use strict'

const
  express = require('express'),
  path = require('path'),
  app = express(),
  port = process.env.PORT || 3000

let appPath = path.resolve(__dirname, 'dist')

app.use(express.static(path.resolve(appPath, 'public')))

app.get('*', (req, res) =>
  res.sendFile(path.resolve(appPath, 'public', 'index.html')))



let server = app.listen(port, () =>
  console.log('Application listening at', server.address()))