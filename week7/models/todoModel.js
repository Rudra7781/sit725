const { MongoClient, ServerApiVersion } = require('mongodb');

const URL = 'mongodb+srv://s224508267:BF2pAic3NoSwwHFf@cluster0.2dieii3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

let collection;

async function connectDB() {
    try {
        await client.connect();
        collection = client.db("toDo").collection('List');
    } catch (ex) {
        console.error(ex);
    }
}

async function addTodo(todo) {
    return collection.insertOne(todo);
}

async function getTodos() {
    return collection.find({}).toArray();
}

module.exports = {
    connectDB,
    addTodo,
    getTodos
};
