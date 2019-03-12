const rawUserData = localStorage.getItem('user');
const userData = JSON.parse(rawUserData);

async function loadMeetups() {
  const url = 'https://oladims-questioner.herokuapp.com/api/v1/meetups';
  try {
    const response = await fetch(url,
      {
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
                        <h4> Are you coming?</h4>
                        <div class="response">
                            <div class="yes"><i class="yes fas fa-check-circle"></i><span>Yes</span></div>
                            <div class="no"><i class="no fas fa-times-circle"></i><span>No</span></div>
                            <div class="maybe"><i class="maybe fas fa-meh-rolling-eyes"></i><span>Maybe</span></div>
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
loadMeetups();
