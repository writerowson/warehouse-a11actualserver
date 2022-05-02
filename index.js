const express = require('express')
const app = express()
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.send('Running my Node curd')
})

app.listen(port, () => {
    console.log('Crud server is running')
})
