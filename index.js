const express = require('express')
const app = express()
const cors = require('cors')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const res = require('express/lib/response');


const port = process.env.PORT || 5001;

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
        const productCollection = client.db("purePerfume").collection("inventory");
        // to load all data
        app.get('/inventory', async (req, res) => {
            const query = {}
            // cursor for multiple item
            const cursor = productCollection.find(query)
            const inventories = await cursor.toArray()
            res.send(inventories)
            console.log(inventories);
        })
        //  to load single data
        app.get('/inventory/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) };
            // to find one we use findONE
            const inventory = await productCollection.findOne(query)
            res.send(inventory)
        })
        // to update data
        app.put('inventory/:id', async (req, res) => {
            const id = req.params.id;
            const updatedInventory = req.body;
            const query = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: updatedInventory
            };
            const result = await productCollection.updateOne(query, updateDoc, options);
            res.send(result);
        })

        // for page count
        app.get('/inventoryCount', async (req, res) => {
            const query = {}
            const cursor = productCollection.find(query);
            const count = await cursor.count()
            res.send({ count })
        })
    }
    finally {

    }
}
app.post('/login', (req, res) => {
    const user = req.body;
    console.log(user);
    res.send({ success: true })
    if (user.email === 'user@gmail.com' && user.password === '123456') {
        const accessToken = jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
        req.send({
            success: true,
            accessToken: accessToken
        })
    }
    else {
        res.send({ success: false })
    }
})

run().catch(console.dir)
app.get('/', (req, res) => {
    res.send('Running my Node curd')
})

app.listen(port, () => {
    console.log('Crud server is running')
})
