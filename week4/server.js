const express = require('express');
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db
const { MongoClient, ServerApiVersion } = require('mongodb');
const URL = 'mongodb+srv://s224508267:BF2pAic3NoSwwHFf@cluster0.2dieii3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const PORT = 6060;

var collection;

const client = new MongoClient(URL, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});


async function runDBConnection() {
    try {
        await client.connect();
        collection = client.db("toDo").collection('List');
        //console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}


app.post('/api/todo', (req, res) => {
    let myobj = req.body;
    collection.insertOne(myobj).then((result) => {
        res.json({ statusCode: 201, data: result, message: 'success' });
    }).catch((err) => {
        res.json({ statusCode: 500, data: err, message: 'error' });
    });
})


app.get('/api/todo', (req, res) => {
    const data = collection.find({}).toArray().then((result) => {
        res.json({statusCode:200, data:result, message:'get all cats successful'});
    }).catch((err) => {
        console.log(err)
    });

})

app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a + b;
    res.json({ statuscode: 200, data: result })
})

app.get('/display', (req, res) => {
    const n1 = "<h3>DISKdhvgd</h3>";
    res.set('Content-Type', 'text/html');
    res.send(n1);
})

app.get('/about', function (req, res) {
    res.sendFile('public/about.html', {root: __dirname })
});
app.get('/home', function (req, res) {
    res.sendFile('public/index.html', { root: __dirname })
});

app.listen(PORT, () => {
    console.log(`listening at : http://localhost:${PORT}/`);
    runDBConnection();
})