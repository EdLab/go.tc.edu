const express = require('express')
const app = express()
global.Logger = require('./libs/Logger')(app)