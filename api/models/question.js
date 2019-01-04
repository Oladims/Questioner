import moment from 'moment';

export default class Questions {
  constructor(question) {
    this.id = question.id;
    this.createdOn = moment();
    this.createdBy = question.createdBy;
    this.meetup = question.meetup;
    this.title = question.title;
    this.body = question.body;
    this.votes = question.votes;
  }
}