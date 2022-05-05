import chai from "chai";
import chaiHttp from "chai-http";

// Assertion style
chai.should();
chai.use(chaiHttp);
const server = "https://ai-brand-server.herokuapp.com";
// const server = "http://localhost:5000";

describe("Auth Endpoints", () => {
    /**
     * Test the GET route
     */
    describe("GET /auth", () => {
        it("It should GET all the users", (done) => {
            const token =
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
            chai
                .request(server)
                .get("/auth")
                .set({ Authorization: `Bearer ${token}` })
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("array");
                    done();
                });
        });

        it("It should NOT GET all the users", (done) => {
            chai
                .request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(404);
                    done();
                });
        });
    });

    //   /**
    //    * Test the POST route
    //    */
    describe("POST /auth/login", () => {
        it("It should login the user", (done) => {
            const credentials = {
                email: "admin@gmail.com",
                password: "123456"
            };
            chai
                .request(server)
                .post("/auth/login")
                .send(credentials)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a("object");
                    done();
                });
        });
    });
});
