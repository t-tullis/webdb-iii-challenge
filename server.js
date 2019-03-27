const express = require('express')

const server = express();

//Routers
const cohortRouter = require('./routers/cohortsRouter.js')

//middleware
server.use(express.json());
server.use('/api/cohorts', cohortRouter)

server.get('/', (req,res) => {
    res.send(`Web DB III Challenge `)
})

module.exports = server;