import { meetupRecords, questionRecords } from "../db/db";
import Questions from "../models/question";

export default {
  createQuestion: (req, res) => {
    const questionLength = questionRecords.length;
    req.body.id =
     questionLength > 0 
      ? questionRecords[questionLength - 1].id + 1 
      : 1;
    const question = new Questions(req.body);
    const meetup = meetupRecords.find(
      c => c.id === parseInt(question.meetup, 10)
    );

    if (!meetup)
      return res.status(400).send({ 
          status: 400, 
          error: "Meetup does not exist." 
        });
    questionRecords.push(question);

    return res.status(201).send({
      status: 201,
      message: "Your question has been created successfully.",
      data: [question]
    });
  }
};