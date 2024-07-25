const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5005;

//middleware//
app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://<username>:<password>@cluster0.yme0t2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yme0t2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const spotsCollection = client.db('tourismDB').collection('spot');
        const countryCollection = client.db('tourismDB').collection('country');

        app.post('/addTouristsSpot', async (req, res) => {
            const spotDetails = req.body;
            const result = await spotsCollection.insertOne(spotDetails);
            res.send(result)
        })

        app.get('/addTouristsSpot', async (req, res) => {
            const result = await spotsCollection.find().toArray();
            res.send(result);
        })

        app.get('/myCart/:email', async (req, res) => {
            // console.log(req.params.email);
            const result = await spotsCollection.find({ userEmail: req.params.email }).toArray();
            res.send(result);
        });


        app.get('/addTouristsSpot/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) }
            const result = await spotsCollection.findOne(query);
            // console.log(result);
            res.send(result);
        })

        app.get('/allCountry', async (req, res) => {
            const result = await countryCollection.find().toArray();
            console.log(result);
            res.send(result)
        })
        app.get('/allCountry/:country', async (req, res) => {
            const result = await spotsCollection.find({ country: req.params.country }).toArray();
            //sending respond for individual country's all tourist spots
            res.send(result);
        })

        app.put('/addTouristsSpot/:id', async (req, res) => {
            const filter = { _id: new ObjectId(req.params.id) }

            const dataUpdate = {
                $set: {
                    photoUrl: req.body.photoUrl,
                    spotName: req.body.spotName,
                    country: req.body.country,
                    location: req.body.location,
                    short_description: req.body.short_description,
                    long_description: req.body.long_description,
                    cost: req.body.cost,
                    seasonality: req.body.seasonality,
                    travelTime: req.body.travelTime,
                    totalVisitorsPerYear: req.body.totalVisitorsPerYear,
                }
            }
            // console.log(dataUpdate);
            const result = await spotsCollection.updateOne(filter, dataUpdate);
            res.send(result);
        })

        app.delete('/addTouristsSpot/:id', async (req, res) => {
            const query = { _id: new ObjectId(req.params.id) }
            const result = await spotsCollection.deleteOne(query);
            // console.log(result);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', async (req, res) => {
    res.send('Tourism management server is running');
})

app.listen(port, () => {
    console.log(`Coffee server is running on port: http://localhost:${port}`);
})




