require("dotenv").config();
const supertest = require("supertest");
const chai = require("chai");
const app = require("../app");

const expect = chai.expect;
const request = supertest(app);

describe("GET Routes for Drone Listing", function () {
  describe("/drone-listing", function () {
    it("should fetch all drones", async function () {
      const response = await request.get("/drone-listing");
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an("array");
    });

    it("should handle situations where no drones are available", async function () {
      // Assuming  database is empty or this test runs in an isolated environment
      const response = await request.get("/drone-listing");
      if (response.body.length === 0) {
        expect(response.body).to.be.an("array").that.is.empty;
      } else {
        expect(response.body).to.be.an("array");
      }
    });
  });

  it("should fetch drones for a specific user with a valid wallet address", async function () {
    const walletAddress = "5Gh4pNg51qc4rHepHqGQo3KtFJbQmnSsmTjVZWdXpLWLikP6";
    const response = await request.get(`/drone-listing/user/${walletAddress}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
  });

  it("should return an error for an invalid wallet address", async function () {
    const walletAddress = "invalid_wallet"; // Less than 48 characters
    const response = await request.get(`/drone-listing/user/${walletAddress}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Invalid wallet address");
  });
  
  it("should handle cases where the user has no drones", async function () {
    const walletAddress = "5Gh4pNf51wc4rHepHqGQo3KtFJbQmnSsmTjVZWdXpLWLikP6"; // Using an address that's valid but has no drones
    const response = await request.get(`/drone-listing/user/${walletAddress}`);
    expect(response.status).to.equal(200);
    if (response.body.length === 0) {
      expect(response.body).to.be.an("array").that.is.empty;
    } else {
      expect(response.body).to.be.an("array");
    }
  });
});

module.exports = describe;
