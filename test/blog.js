import chai from "chai";
import chaiHttp from "chai-http";

// Assertion style
chai.should();
chai.use(chaiHttp);
const server = "http://localhost:5000";

describe("Blogs Endpoints", () => {
  /**
   * Test the GET route
   */
  describe("GET /blogs", () => {
    it("It should GET all the blogs", (done) => {
      chai
        .request(server)
        .get("/blogs")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("It should NOT GET all the blogs", (done) => {
      chai
        .request(server)
        .get("/blog")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  /**
   * Test the GET (by id) route
   */
  describe("GET /blogs/:id", () => {
    it("It should GET a blog by ID", (done) => {
      const blogId = "62570d150f78e1d2f5045378";
      chai
        .request(server)
        .get("/blogs/" + blogId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("title");
          response.body.should.have.property("description");
          done();
        });
    });
  });

  /**
   * Test the POST route
   */
  describe("POST /blogs", () => {
    it("It should create a new blog", (done) => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      const blog = {
        title: "testing creating a new blog",
        banner: "http://tny.im/rPW",
        comments: ["Test comments!"],
        likes: 200,
        description: "description goes here",
      };
      chai
        .request(server)
        .post("/blogs")
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("title")
            .eq("testing creating a new blog");
          done();
        });
    });
  });

  /**
   * Test the PUT route
   */

  describe("PUT /blogs/:id", () => {
    it("It should update an existing blog", (done) => {
      const blogId = "62570d150f78e1d2f5045378";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      const blog = {
        title: "New title after updating!",
        banner: "http://tny.im/rPW",
        comments: ["Thanks for sharing", "Great blog!"],
        likes: 20,
        description: "Description updated!",
      };
      chai
        .request(server)
        .put("/blogs/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have
            .property("title")
            .eq("New title after updating!");
          done();
        });
    });
  });

  /**
   * Test the PATCH route
   */

  describe("PATCH /blogs/comment/:id", () => {
    it("It should add comment on an existing blog", (done) => {
      const blogId = "62570d150f78e1d2f5045378";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      const blog = {
        comment: "new comment after patching!",
      };
      chai
        .request(server)
        .patch("/blogs/comment/" + blogId)
        .set({ Authorization: `Bearer ${token}` })
        .send(blog)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test the DELETE route
   */
  describe("DELETE /blogs/:id/delete", () => {
    it("It should DELETE an existing blog", (done) => {
      const blogId = "62600ad0b3f29f61ab82b939";
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjU3MGM4ODBmNzhlMWQyZjUwNDUzNzMiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NDk5NjA2MTl9.JhWPMPZbb1EF9GwU7UX5FHZ-WMTORC6BCHE6nngQGuQ";
      chai
        .request(server)
        .delete(`/blogs/${blogId}/delete`)
        .set({ Authorization: `Bearer ${token}` })
        .end((err, response) => {
          response.should.have.status(201);
          done();
        });
    });
  });
});
