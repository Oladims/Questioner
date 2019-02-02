const request = new XMLHttpRequest();

request.open('GET', 'https://oladims-questioner.herokuapp.com/api/v1/meetups', true);
request.onload = () => {
  const data = JSON.parse(request.response);
  const meetups = data.data[0].meetup;

  const meetupRow = document.getElementById('meetups');
  if (request.status >= 200 && request.status < 400) {
    for (meetup = 0; meetup < 4; meetup++) {
      meetupRow.innerHTML += ` <div class="meetup hvrbox">
            <img class="meetupimage hvrbox-layer_bottom" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1A8Y_qFHiSjEQV5YnFja04rAMpsL7eyGBjmCN8Qa7P30DjWfR"
              alt="Avatar" style="width:100%">
            <div class="meetup-container">
              <h4 class="center"><b>${meetups[meetup].name}</b></h4>
              <p class="center">${meetups[meetup].topic}</p>
            </div>
            <div class="meetup-container hvrbox-layer_top">
              <div class="hvrbox-text">
               <h4><a class="viewdetail light-text" href="./pages/meetupdetails.html?id=${meetups[meetup].id}">View Details</a></h4>
                <h4> Are you coming?</h4>
                <div class="response">
                    <div class="yes"><i class="yes fas fa-check-circle"></i><span>Yes</span></div>
                    <div class="no"><i class="no fas fa-times-circle"></i><span>No</span></div>
                    <div class="maybe"><i class="maybe fas fa-meh-rolling-eyes"></i><span>Maybe</span></div>
                </div>
              </div>
            </div>
          </div>`;
    }
  } else {
    console.log('error');
  }
};

request.send();

async function loginUser(event) {
  event.preventDefault();


  const emailaddress = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;


  const url = 'https://oladims-questioner.herokuapp.com/api/v1/user/login';

  const params = {

    email: emailaddress,
    password: userPassword,

  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const data = await response.json();
    if (response.ok) {
      window.location.href = './pages/userProfile.html';
    }
    else {
      //   alert('error');
    }
    console.log(response);
    console.log(data);

  }
  catch (err) {
    throw err;
  }
}// createUser();
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', loginUser);

