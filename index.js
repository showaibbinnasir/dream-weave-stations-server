const express = require("express")
const app = express();

const port = process.env.PORT || 5000;
const cors = require('cors')
app.use(cors())
app.use(express.json())

// mAWU3y9N3iravi5g
// dreamweave
const { query } = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = "mongodb+srv://dreamweave:mAWU3y9N3iravi5g@myfirstdb.w4kvmll.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

async function run(){
    try{
        const alltaskcollection = client.db('dreamweave').collection('orders');
        const allreviewcollection = client.db('dreamweave').collection('reviews');
        const allblogcollection = client.db('dreamweave').collection('blogs');
        app.get('/allorders', async(req,res)=>{
            const query = {}
            const result = await alltaskcollection.find(query).toArray();
            res.send(result);
        })

        app.post('/addorders', async(req,res)=> {
            const order = req.body;
            const result = await alltaskcollection.insertOne(order);
            res.send(result);
        })
        app.delete('/deleteorders', async (req, res) => {
            const id = req.query.id;
            const query = { _id: new ObjectId(id) };
            const result = await alltaskcollection.deleteOne(query);
            res.send(result)
        })
        app.get("/allreviews", async(req,res)=> {
            const query = {};
            const result = await allreviewcollection.find(query).sort({_id:-1}).toArray();
            res.send(result);
        })
        app.post('/addreview', async(req,res)=>{
            const review = req.body;
            const result = await allreviewcollection.insertOne(review);
            res.send(result);
        })
        app.get("/allblogs", async(req,res)=> {
            const query = {};
            const result = await allblogcollection.find(query).sort({_id:-1}).toArray();
            res.send(result);
        })
        app.get('/blog', async (req, res) => {
            const id = req.query.id;
            let query = {}
            if (id) {
                query = {_id: new ObjectId(id) }
            }
            const result = await allblogcollection.find(query).toArray()
            res.send(result)
        })
    }catch{
        console.log("database not connected");
    }

}

run().catch(console.log)





app.get('/', (req, res) => {
    res.send('api is running')
})


app.listen(port, () => {
    console.log(`api is running on port ${port}`)
})