const path = require('path');

function serveAboutPage(req, res) {
    res.sendFile(path.join(__dirname, '../public/about.html'));
}

function serveHomePage(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
}

function addNumbers(req, res) {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const result = a + b;
    res.json({ statuscode: 200, data: result });
}

function displayContent(req, res) {
    const n1 = "<h3>Display</h3>";
    res.set('Content-Type', 'text/html');
    res.send(n1);
}

module.exports = {
    serveAboutPage,
    serveHomePage,
    addNumbers,
    displayContent
};
