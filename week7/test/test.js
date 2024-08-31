
const chai = require('chai');
const expect = require('chai').expect;
const request = require('request');
var { server, startServer } = require('../server');
const chaiHttp = require('chai-http');
const io = require('socket.io-client');


// Integrate chai-http with chai
chai.use(chaiHttp)

let socket;
// Before running tests, start the server
before(async function () {
    this.timeout(5000); // Adjust timeout if needed
    server = await startServer();
    socket = io.connect('http://localhost:6060', {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
    });
});

describe("Socket.IO Tests", function () {

    it('should receive all tasks via socket', function (done) {

        // Listen for 'new-task' event on the socket
        socket.on('tasks', (task) => {
            expect(task).to.have.property('statusCode', 200);
        });
        done();
    });
    
    it('should receive added task via socket', function (done) {

        // Listen for 'new-task' event on the socket
        socket.on('Task Added', (task) => {
            expect(task).to.have.property('statusCode', 201);
        });
        done();
    });
});

describe("View Routes", function () {

    describe('GET /home', () => {
        it('should return status 200', (done) => {
            chai.request(server)
                .get('/home')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should return HTML content', (done) => {
            chai.request(server)
                .get('/home')
                .end((err, res) => {
                    expect(res).to.be.html;
                    done();
                });
        });

        it('should contain the correct title', (done) => {
            chai.request(server)
                .get('/home')
                .end((err, res) => {
                    expect(res.text).to.include('<title>SIT725</title>'); // Modify based on your HTML content
                    done();
                });
        });
    });

    describe('GET /', () => {
        it('should return status 200', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should return HTML content', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.be.html;
                    done();
                });
        });

        it('should contain the correct title', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res.text).to.include('<title>SIT725</title>'); // Modify based on your HTML content
                    done();
                });
        });
    });

    describe('GET /add', () => {
        it('should return status 200', (done) => {
            chai.request(server)
                .get('/add?a=5&b=10')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should return an object', (done) => {
            chai.request(server)
                .get('/add?a=5&b=10')
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it('should return statusCode 200 in the response body', (done) => {
            chai.request(server)
                .get('/add?a=5&b=10')
                .end((err, res) => {
                    expect(res.body).to.have.property('statusCode', 200);
                    done();
                });
        });

        it('should return the sum of a and b as 15', (done) => {
            chai.request(server)
                .get('/add?a=5&b=10')
                .end((err, res) => {
                    expect(res.body).to.have.property('data', 15);
                    done();
                });
        });
    });

    describe('GET /about', () => {
        it('should return status 200', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('should return HTML content', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    expect(res).to.be.html;
                    done();
                });
        });

        it('should contain the correct title', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    expect(res.text).to.include('<title>About</title>');
                    done();
                });
        });
    });

});

describe("Model Routes", () => {

    describe("POST /api/todo", () => {
        it("should return status 200", (done) => {
            var todo = {
                title: 'Test Todo',
                desc: 'This is a test',
                date: `11/11/11 00:00:00`
            };
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("should return an object", (done) => {
            var todo = {
                title: 'Test Todo',
                desc: 'This is a test',
                date: `11/11/11 00:00:00`
            };
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it("should return statusCode 201 in the response body", (done) => {
            var todo = {
                title: 'Test Todo',
                desc: 'This is a test',
                date: `11/11/11 00:00:00`
            };
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    expect(res.body).to.have.property('statusCode', 201);
                    done();
                });
        });

        it("should return a success message", (done) => {
            var todo = {
                title: 'Test Todo',
                desc: 'This is a test',
                date: `11/11/11 00:00:00`
            };
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    expect(res.body).to.have.property('message', 'success');
                    done();
                });
        });
    });

    describe('GET /api/todo', () => {
        it("should return status 200", (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("should return an object", (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    expect(res.body).to.be.an('object');
                    done();
                });
        });

        it("should return statusCode 200 in the response body", (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    expect(res.body).to.have.property('statusCode', 200);
                    done();
                });
        });

        it("should return a success message", (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    expect(res.body).to.have.property('message', 'get all todos successful');
                    done();
                });
        });
    });

});

