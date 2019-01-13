// import meetup from './meetup';

export default class Rsvp {
  constructor(rsvp) {
    this.id = rsvp.id;
    this.meetup = rsvp.meetup;
    this.topic = rsvp.topic;
    this.user = rsvp.user;
    this.response = rsvp.response;
  }
}
