const express = require('express');
const projectRouter = require('./projects/projectRouter');
const actionRouter = require('./actions/actionRouter')

const server = express()

server.use(express.json())
server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.get('/', (req,res)=>{
    res.send(`<h2>Node sprint challenge<h2>`)
})

module.exports = server;