
const chai = require('chai');
const expect = require('chai').expect;
const request = require('request');
var { server, startServer } = require('../server');
const chaiHttp = require('chai-http');

// Integrate chai-http with chai
chai.use(chaiHttp)

// Before running tests, start the server
before(async function () {
    this.timeout(5000); // Adjust timeout if needed
    server = await startServer();
});


describe("View Routes \n", function () {

    describe('GET /home and /', () => {
        it('should return the index.html file', (done) => {
            chai.request(server)
                .get('/home')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.text).to.include('<title>SIT725</title>'); // Modify based on your HTML content
                    done();
                });
        });

        it('should return the index.html file', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.text).to.include('<title>SIT725</title>'); // Modify based on your HTML content
                    done();
                });
        });
    });

    describe('GET /add', () => {
        it('should return the sum of a and b', (done) => {
            chai.request(server)
                .get('/add?a=5&b=10')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body).to.have.property('statusCode', 200);
                    expect(res.body).to.have.property('data', 15);
                    done();
                });
        });
    });

    // Test for GET /about
    describe('GET /about', () => {
        it('should return the about.html file', (done) => {
            chai.request(server)
                .get('/about')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res).to.be.html;
                    expect(res.text).to.include('<title>About</title>');
                    done();
                });
        });
    });

});


describe("Model Routes \n", () => {
    describe("POST /api/todo", () => {
        it("Should create new todo item", (done) => {
            var todo = {
                title: 'Test Todo',
                desc: 'This is a test',
                date: `11/11/11 00:00:00`
            };
            chai.request(server)
                .post('/api/todo')
                .send(todo)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('statusCode', 201);
                    expect(res.body).to.have.property('message', 'success');
                    done();
                })
        });
    });

    describe('GET /api/todo', () => {
        it("Fetch All Items", (done) => {
            chai.request(server)
                .get('/api/todo')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.an('object')
                    expect(res.body).to.have.property('statusCode', 200);
                    expect(res.body).to.have.property('message', 'get all todos successful');
                    done();
                })
        })
    })
});