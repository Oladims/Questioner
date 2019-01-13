import chai from "chai";
import chaiHttp from "chai-http";
import app from "../index";
import { rsvpRecords } from "../db/db";
const { expect } = chai;

chai.use(chaiHttp);

describe("Meetups", () => {
  describe("POST /meetups/correctId/rsvps", () => {
    it("it should return 200 if rsvp is created successfully", done => {
      chai
        .request(app)
        .post("/api/v1/meetups/1/rsvps")
        .send(rsvpRecords[0])
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property("data");
          done();
        });
    });
    it("it should return 400 if fields are not complete", done => {
      chai
        .request(app)
        .post("/api/v1//meetups/1/rsvps")
        .send({
          meetup: "",
          user: "",
          response: ""
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
    it("it should return 400 if meetup does not exist", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          meetup: 345457687,
          user: 2,
          response: "maybe"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
    it("it should return 400 if some fields are invalid", done => {
      chai
        .request(app)
        .post("/api/v1/meetups")
        .send({
          meetup: "77bkb",
          user: "gyfy",
          response: 123
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("error");
          done();
        });
    });
  });
});
