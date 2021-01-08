const {MongoClient} = require('mongodb');

const client = new MongoClient(process.env.UriStore, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

let database;

async function connectDb() {
    await client.connect();
    database = await client.db('Account');
    console.log('Book db connected');
}

connectDb();
const db = () => database;
module.exports.db = db;