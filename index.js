const express = require('express')
const cluster = require('cluster')
const os = require('os')

const app = express()

const numCpu = os.cpus().length

// comment out console logs since it will take 20% longer with them

app.get('/', (req, res) => {
    for (let i = 0; i < 1e8; i++) {

    }
    res.send(`Ok... ${process.pid}`)
    cluster.worker.kill()
})

if (cluster.isMaster) {
    for (let i = 0; i < numCpu; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        // console.log(`${worker.process.pid} died`)
        cluster.fork()
    })
} else {
    app.listen(3000)
}

// app.listen(3000, () => console.log(`server started on http://localhost:3000`))