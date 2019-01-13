import moment from 'moment';

export default class Meetups {
  constructor(meetup) {
    this.id = meetup.id;
    this.topic = meetup.topic;
    this.location = meetup.location;
    this.happeningOn = meetup.happeningOn;
    this.tags = meetup.tags;
    this.createdOn = moment("12-25-1995", 'MM-DD-YYYY');
  }
}
