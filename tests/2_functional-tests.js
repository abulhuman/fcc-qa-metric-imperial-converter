// const chaiHttp = require('chai-http');
// const chai = require('chai');
// let assert = chai.assert;
// const server = require('../server');

// chai.use(chaiHttp);

// suite('Functional Tests', function() {
// 	this.timeout(5000)
// 	suite('Integration tests', () => {
// 		suite('/api/convert', () => {
// 			test('should convert a valid input such as 10L', (done) => {
// 				chai
// 					.request(server)
// 					.keepOpen()
// 					.get('/api/convert/?input=10L')
// 					.end((err, res) => {
// 						assert.equal(err, null)
// 						assert.equal(res.status, 200)
// 						assert.deepEqual(res.body, {
// 							initNum: 10,
// 							initUnit: 'L',
// 							returnNum: +(2.64172).toFixed(5),
// 							returnUnit: 'gal',
// 							string: "10 liters converts to 2.64172 gallons"
// 						})
// 						done();
// 					})
// 			})
// 			test('should error on an invalid input such as 32g', (done) => {
// 				chai
// 					.request(server)
// 					.keepOpen()
// 					.get('/api/convert/?input=32g')
// 					.end((err, res) => {
// 						assert.equal(err, null)
// 						assert.equal(res.status, 400)
// 						assert.equal(res.text, 'invalid unit')
// 						done();
// 					})
// 			})
// 			test('should error on an invalid number such as 3/7.2/4kg', (done) => {
// 				chai
// 					.request(server)
// 					.keepOpen()
// 					.get('/api/convert/?input=3/7.2/4kg')
// 					.end((err, res) => {
// 						assert.equal(err, null)
// 						assert.equal(res.status, 400)
// 						assert.equal(res.text, 'invalid number')
// 						done();
// 					})
// 			})
// 			test('should error on an invalid number and unit such as 3/7.2/4kilomegagram', (done) => {
// 				chai
// 					.request(server)
// 					.keepOpen()
// 					.get('/api/convert/?input=3/7.2/4kilomegagram')
// 					.end((err, res) => {
// 						assert.equal(err, null)
// 						assert.equal(res.status, 400)
// 						assert.equal(res.text, 'invalid number and unit')
// 						done();
// 					})
// 			})
// 			test('should convert with no number such as kg', (done) => {
// 				chai
// 					.request(server)
// 					.keepOpen()
// 					.get('/api/convert/?input=kg')
// 					.end((err, res) => {
// 						assert.equal(err, null)
// 						assert.equal(res.status, 200)
// 						assert.deepEqual(res.body, {
// 							initNum: 1,
// 							initUnit: 'kg',
// 							returnNum: +(2.20462).toFixed(5),
// 							returnUnit: "lbs",
// 							string: "1 kilograms converts to 2.20462 pounds"
// 						})
// 						done();
// 					})
// 			})
// 		})

// 	})

// });

const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", function () {
  test("GET /api/convert?input=10L", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 10,
          initUnit: "L",
          returnNum: 2.64172,
          returnUnit: "gal",
          string: "10 liters converts to 2.64172 gallons",
        });
        done();
      });
  });
  test("GET /api/convert?input=32g", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid unit");
        done();
      });
  });
  test("GET /api/convert?input=3/7.2/4kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number");
        done();
      });
  });
  test("GET /api/convert?input=3/7.2/4kilomegagram", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.equal(res.text, "invalid number and unit");
        done();
      });
  });
  test("GET /api/convert?input=kg", (done) => {
    chai
      .request(server)
      .get("/api/convert?input=kg")
      .end((req, res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body, {
          initNum: 1,
          initUnit: "kg",
          returnNum: 2.20462,
          returnUnit: "lbs",
          string: "1 kilograms converts to 2.20462 pounds",
        });
        done();
      });
  });
});