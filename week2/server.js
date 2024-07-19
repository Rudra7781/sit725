const express = require('express');
const app = express();
app.use(express.static('public'))

const PORT = 6060;

app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(req);
    const result = a + b;
    res.json({statuscode:200, result:result})
})

app.get('/display', (req, res) => {
    const n1 = "<h3>DISKdhvgd</h3>";
    res.set('Content-Type','text/html');
    res.send(n1);
})


app.listen(PORT,() => {
    console.log(`listening at : http://localhost:${PORT}/`)
})