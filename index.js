const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5005;

//middleware
app.use(cors());
app.use(express.json());

// username: europeTourism
// pw: HmrYAOgtVJutBRXo

console.log(process.env.DB_USER);
console.log(process.env.DB_PW);
// const uri = "mongodb+srv://<username>:<password>@cluster0.yme0t2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0.yme0t2s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;




app.get('/', async (req, res) => {
    res.send('Tourism management server is running');
})

app.listen(port, () => {
    console.log(`Coffee server is running on port: ${port}`);
})




