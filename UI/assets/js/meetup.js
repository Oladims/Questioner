const rawUserData = localStorage.getItem('user');
const userData = JSON.parse(rawUserData);
const urlink = window.location.href;
const urlSplit = urlink.split('?');
const params = urlSplit[1];
const newParams = params.split('=');
const meetupId = newParams[1];
const meetupTopic = document.getElementById('meetupTopic');
const meetupDate = document.getElementById('meetupDate');
const meetupLocation = document.getElementById('meetupLocation');
const meetupDescription = document.getElementById('meetupDescription');
const meetupName = document.getElementById('meetupName');
const askBtn = document.getElementById('askBtn');

async function getMeetup(meetupId) {
  const url = `http://localhost:8000/api/v1/meetups/${meetupId}`;
  try {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          tokens: `${userData.token}`,
        },
      });
    const body = await response.json();
    const meetup = body.data[0].meetup;

    if (response.ok) {
      meetupDate.innerText = meetup.happeningon;
      meetupLocation.innerText = meetup.location;
      meetupDescription.innerText = meetup.description;
      meetupName.innerText = meetup.name;
      askBtn.innerHTML = `<a href='ask.html?id=${meetup.id}&name=${meetup.name}'>Post question</a>`;
    } else {
      alert('error');
    }
  } catch (err) {
    throw err;
  }
}

async function getQuestions(meetupId) {
  const url = `http://localhost:8000/api/v1/questions/meetup/${meetupId}`;
  try {
    const response = await fetch(url,
      {
        method: 'GET',
        headers: {
          tokens: `${userData.token}`,
        },
      });
    const body = await response.json();
    const questions = body.data[0].question;
    const questionSummary = document.getElementById('question-summary');

    if (response.ok) {
      questions.forEach((question) => {
        questionSummary.innerHTML += ` <div class="question-summary" >
     
     <div onclick="" class="question-stats">
       <div class="votes">
         <div class="mini-counts"><span title="0 votes">${question.votes}</span></div>
         <small class="small">votes</small>
       </div>
     </div>
     <div class="summary">
       <div>
         <a href="question.html?id=${question.id}" class="question-hyperlink"
           >${question.title}</a>
       </div>
       <div class="tags">
         <a
           href="question.html?id=${question.id}"
           class="post-tag"
           title=""
           rel="tag"
           >View details</a>
       </div>
     </div>
   </div>`;
      });
    } else {
      alert('error');
    }
  } catch (err) {
    throw err;
  }
}

getMeetup(meetupId);
getQuestions(meetupId);
