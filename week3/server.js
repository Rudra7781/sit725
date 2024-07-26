const express = require('express');
const app = express();
app.use(express.static('public'))

const PORT = 6060;

app.get('/add', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a + b;
    res.json({statuscode:200, data:result})
})

app.get('/display', (req, res) => {
    const n1 = "<h3>DISKdhvgd</h3>";
    res.set('Content-Type','text/html');
    res.send(n1);
})

app.get('/about', function(req, res) {
    res.sendFile('public/about.html', {root: __dirname })
});

app.listen(PORT,() => {
    console.log(`listening at : http://localhost:${PORT}/`)
})