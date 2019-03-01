const fullname = document.getElementById('fullName');
const username = document.getElementById('userName');
const phonenumber = document.getElementById('phone');
const email = document.getElementById('email');
const rawUserData = localStorage.getItem('user');
const userData = JSON.parse(rawUserData);

if (localStorage.getItem('user')) {
  const rawUserData = localStorage.getItem('user');
  const userData = JSON.parse(rawUserData);

  if (userData.isadmin) {
    document.getElementById('meetupBtn-div').style.display = 'block';
    loadmeetup();
  }
  // set username
  fullname.value = `${userData.firstname} ${userData.lastname} ${userData.othername}`;
  username.value = userData.username;
  phonenumber.value = userData.phonenumber;
  email.value = userData.email;
}

async function loadmeetup() {
  const url = 'http://localhost:8000/api/v1/meetups/admin';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        tokens: `${userData.token}`,
      },
    });
    const body = await response.json();
    const meetups = body.data[0].meetup;
    const meetupRow = document.getElementById('meetups');

    if (response.ok) {
      meetups.forEach((meetup) => {
        meetupRow.innerHTML += ` <div class="meetup hvrbox">
                  <img class="meetupimage hvrbox-layer_bottom" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1A8Y_qFHiSjEQV5YnFja04rAMpsL7eyGBjmCN8Qa7P30DjWfR"
                     alt="Avatar" style="width:100%">
                  <div class="meetup-container">
                    <h4 class="center"><b>${meetup.name}</b></h4>
                    <p class="center">${meetup.topic}</p>
                  </div>
                  <div class="meetup-container hvrbox-layer_top">
                    <div class="hvrbox-text">
                     <h4><a class="viewdetail light-text" href="./meetupdetails.html?id=${meetup.id}">View Details</a></h4>
                      
                      <div class="response">
                     <h4><a onclick="deleteMeetup(${meetup.id})" id="deleteMeetupBtn" class="delete light-text" href="">Delete</a></h4>
                      </div>
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

async function deleteMeetup(meetupId) {
  const url = `http://localhost:8000/api/v1/meetups/${meetupId}`;
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        tokens: `${userData.token}`,
      },
    });
    if (response.ok) {
      alert('Meetup deleted successfully');
      setTimeout(() => {
        window.location.href = './userProfile.html';
      }, 2000);
    } else {
      alert('error');
    }
    console.log(response);
  } catch (err) {
    throw err;
  }
}

async function getquestions() {
  const url = 'http://localhost:8000/api/v1/questions/user';
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        tokens: `${userData.token}`,
      },
    });
    const body = await response.json();
    const questions = body.count;

    const questionCount = document.getElementById('questionCount');
    const userQuestion = document.getElementById('user-question');

    if (response.ok) {
      questionCount.innerText = `(${questions})`;
      userQuestion.innerHTML += `<p>You have asked ${questions} questions</p>`;
    } else {
      alert('error');
    }
  } catch (err) {
    throw err;
  }
}

async function getComments() {
  const url = 'http://localhost:8000/api/v1/questions/userComments';
  const commentCount = document.getElementById('commentCount');
  const userComments = document.getElementById('user-comments');
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        tokens: `${userData.token}`,
      },
    });
    const body = await response.json();
    const userCommentsCount = body.count;
    if (response.ok) {
      commentCount.innerText = `(${userCommentsCount})`;
      userComments.innerHTML += `<p>You have ${userCommentsCount} comments</p>`;
    } else {
      alert('error');
    }
  } catch (err) {
    throw err;
  }
}

getquestions();
getComments();
