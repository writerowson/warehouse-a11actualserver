const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000

// use middleware
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ofq71.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        // to connect client
        await client.connect();
        console.log('all connected');
        const userCollection = client.db("purePerfume").collection("devices");
    }
    finally {

    }
}
run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running my Node curd')
})

app.listen(port, () => {
    console.log('Crud server is running')
})
