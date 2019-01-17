# Questioner
 Questioner helps the meetup organizer prioritize questions to be answered. Other users can vote on asked questions and they bubble to the top or bottom of the log.
 
[![Build Status](https://travis-ci.com/Oladims/Questioner.svg?branch=develop)](https://travis-ci.com/Oladims/Questioner)
[![Coverage Status](https://coveralls.io/repos/github/Oladims/Questioner/badge.svg?branch=develop)](https://coveralls.io/github/Oladims/Questioner?branch=develop)
![Heroku](https://heroku-badge.herokuapp.com/?app=heroku-badge)

## Features

1. Admin can create meetups.
2. Users can create an account and log in.
3. Users can post questions to a specific meetup.
4. Users can upvote or downvote a question.
5. Questions are sorted based on the number of upvotes a question has, which helps the meetup organizer(s) to prioritize questions most users are interested in.
6. Users can post comments to a specific question.

# EndPoints

|  **Routes**        | **Description**|
| ------------- |:-------------:|
| POST /api/v1/meetups|Create meetup record. |
| GET /api/v1//meetups|Fetch all meetup records |
| GET /api/v1//meetups/id/|Fetch a specific meetup record. |
| GET /api/v1/meetups/upcoming/|Fetch all upcoming meetup records.|
| POST /api/v1/meetups/id/rsvps|Respond to meetup RSVP.|
| POST /api/v1/questions|Create a question for a specific meetup. |
| PATCH /api/v1/questions/id/upvote|Upvote (increase votes by 1) a specific question |
| PATCH /api/v1/questions//downvote|Downvote (decrease votes by 1) a specific question. |
| POST /api/v1/users/signup|Create a new user record. |
| POST /api/v1/users/login|Returns an existing user record. |


## Getting Started

1. Clone the repo
2. cd into it
3. Run `npm install` to add dependencies
4. Run `npm start`
5. Open the browser and navigate to the port at which the app is running.

## Technologies
Node.js -Runtime Environment

## Author
Olufowora Ibrahim Oladimeji

## References

* Node-js tutorial- Mosh Hamedani
* Stack overflow community
* Andela Cycle 40 Bootcamp colleagues
* Node.js Articles on Medium
* Tutorials point
