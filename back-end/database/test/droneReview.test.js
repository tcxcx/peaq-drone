require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const app = require("../app");

const expect = chai.expect;
const request = supertest(app);

describe("POST /drone-review/reviews", function () {
  it("should add a new review", async function () {
    const newReview = {
      droneId: "0ca8278e-190b-4c90-bfeb-1ecd006f288b",
      reviewerWalletAddress: "5Gh4pNf51wc4rHepHqGQo3KtFJbQmnSsmTjVZWdXpLWLikP6",
      rating: 2,
      comment: "Bad drone! Worst ever",
    };

    const response = await request
      .post("/drone-review/reviews")
      .send(newReview);
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an("object");
    expect(response.body).to.have.property("droneId", newReview.droneId);
  });
});

describe("GET /drone-review/reviews/:droneId", function () {
  it("should fetch reviews for a specific drone", async function () {
    const droneId = "0ca8278e-190b-4c90-bfeb-1ecd006f288b"; 
    const response = await request.get(`/drone-review/reviews/${droneId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });
});

describe("PUT /drone-review/reviews/:reviewId", function () {
  it("should update a specific review", async function () {
    const reviewId = "38e6a8d9-f1e7-4c96-a8c8-5556d82508fd";
    const updates = { rating: 5, comment: "Updated comment" };

    const response = await request
      .put(`/drone-review/reviews/${reviewId}`)
      .send(updates);
    expect(response.status).to.equal(200);
  });
});

describe("DELETE /drone-review/reviews/:reviewId", function () {
  it("should delete a specific review", async function () {
    const reviewId = "38e6a8d9-f1e7-4c96-a8c8-5556d82508fd";
    const response = await request.delete(`/drone-review/reviews/${reviewId}`);
    expect(response.status).to.equal(200);
  });
});

module.exports = describe;
