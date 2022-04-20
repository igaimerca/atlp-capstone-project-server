import chai from "chai";
import chaiHttp from "chai-http";

// Assertion style
chai.should();
chai.use(chaiHttp);
const server = "http://localhost:5000";

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

  //   /**
  //    * Test the PUT route
  //    */

  //   describe("PUT /blogs/:id", () => {
  //     it("It should update an existing blog", (done) => {
  //       const blogId = "62570d150f78e1d2f5045378";
  //       const token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
  //       const blog = {
  //         title: "New title after updating!",
  //         banner: "http://tny.im/rPW",
  //         comments: ["Thanks for sharing", "Great blog!"],
  //         likes: 20,
  //         description: "Description updated!",
  //       };
  //       chai
  //         .request(server)
  //         .put("/blogs/" + blogId)
  //         .set({ Authorization: `Bearer ${token}` })
  //         .send(blog)
  //         .end((err, response) => {
  //           response.should.have.status(201);
  //           response.body.should.be.a("object");
  //           response.body.should.have
  //             .property("title")
  //             .eq("New title after updating!");
  //           done();
  //         });
  //     });
  //   });

  //     /**
  //    * Test the PATCH route
  //    */

  // describe("PATCH /blogs/comment/:id", () => {
  //     it("It should add comment on an existing blog", (done) => {
  //       const blogId = "62570d150f78e1d2f5045378";
  //       const token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
  //       const blog = {
  //         comment: "new comment after patching!",
  //       };
  //       chai
  //         .request(server)
  //         .patch("/blogs/comment/" + blogId)
  //         .set({ Authorization: `Bearer ${token}` })
  //         .send(blog)
  //         .end((err, response) => {
  //           response.should.have.status(200);
  //           response.body.should.be.a("object");
  //           done();
  //         });
  //     });
  //   });

  //   /**
  //    * Test the DELETE route
  //    */
  //   describe("DELETE /blogs/:id/delete", () => {
  //     it("It should DELETE an existing blog", (done) => {
  //       const blogId = "62600ad0b3f29f61ab82b939";
  //       const token =
  //         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
  //       chai
  //         .request(server)
  //         .delete(`/blogs/${blogId}/delete`)
  //         .set({ Authorization: `Bearer ${token}` })
  //         .end((err, response) => {
  //           response.should.have.status(201);
  //           done();
  //         });
    //   });
    // });
});
