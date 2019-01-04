import moment from 'moment';

export default class Meetups {
  constructor(meetup) {
    this.id = meetup.id;
    this.title = meetup.title;
    this.location = meetup.location;
    this.happeningOn = meetup.happeningOn;
    this.tags = [];
    this.createdOn = moment();
  }
}
