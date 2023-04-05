const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


require('dotenv').config();
;

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9wy3smt.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
      const eventsCollection = client.db('secquraise').collection('events');
    

 
    app.get('/events', async(req,res)=>{
        const query = {}
        const cursor = eventsCollection .find(query);
        const events = await (await cursor.toArray());
        res.send(events );
    })

    app.get('/events/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id:new ObjectId(id) };
        const events = await eventsCollection.findOne(query);
        res.send(events);
    })
    


}
finally{

}
}
run().catch(e=> console.log(e))



app.get('/', async (req, res) => {
res.send('Sequraise server is running');
})

app.listen(port, () => {console.log(`Sequraise running on ${port}`);
})
