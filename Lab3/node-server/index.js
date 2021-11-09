const app = require('express')()
const cors = require('cors')
const MongoClient = require("mongodb").MongoClient;

app.use(cors())

let client = null;

app.get('/orders/random', async (req, res) => {
    const db = client.db('lab3')
    const collection = db.collection('orders')
    const order = await collection.find({}).limit(1).toArray()
    console.log('order', order)
    return res.status(200).json({ order })
})

app.get('/postcodes/borders', async (req, res) => {
    const db = client.db('lab3')
    const collection = db.collection('postcodes')
    const postcodeWithMaxLong = (await collection.find({}).sort({ Longitude: 1 }).limit(1).toArray())[0].Longitude
    const postcodeWithMinLong = (await collection.find({}).sort({ Longitude: -1 }).limit(1).toArray())[0].Longitude
    const postcodeWithMaxLat = (await collection.find({}).sort({ Latitude: 1 }).limit(1).toArray())[0].Latitude
    const postcodeWithMinLat = (await collection.find({}).sort({ Latitude: -1 }).limit(1).toArray())[0].Latitude

    return res.status(200).json({ 
        maxX: postcodeWithMaxLong,
        minX: postcodeWithMinLong,
        maxY: postcodeWithMaxLat,
        minY: postcodeWithMinLat
     })
})

app.listen(3000, async () => {
    console.log('Started 3000')
    const url = "mongodb://localhost:27017";
    const mongoClient = new MongoClient(url);
    client = await mongoClient.connect()
})
