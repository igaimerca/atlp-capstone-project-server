import chai from "chai";
import chaiHttp from "chai-http";

// Assertion style
chai.should();
chai.use(chaiHttp);
const server = "http://localhost:5000";

describe("Queries Endpoints", () => {
  /**
   * Test the GET route
   */
  describe("GET /contact", () => {
    it("It should GET all the queries", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      chai
        .request(server)
        .get("/contact")
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the queries", (done) => {
      chai
        .request(server)
        .get("/queries")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /contact", () => {
    it("It should create a new query", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      const query = {
        name: "name",
        email: "name@gmail.com",
        subject: "query subject here",
        message: "A description of the query in more details!",
      };
      chai
        .request(server)
        .post("/contact")
        .set({ Authorization: `Bearer ${token}` })
        .send(query)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("name").eq("name");
          done();
        });
    });
  });
});
