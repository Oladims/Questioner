async function createUser(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const otherName = document.getElementById('otherName').value;
  const emailaddress = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const phonenumber = '08136715215';
  
  const url = 'https://oladims-questioner.herokuapp.com/api/v1/user/signup';
  
  const params = {
    firstname: firstName,
    lastname: lastName,
    email: emailaddress,
    password: userPassword,
    othername: otherName,
    username: otherName,
    phonenumber,
  };
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    const body = await response.json();
    if (response.ok) {
      const userData = JSON.stringify({
        token: body.data[0].token,
        firstname: body.data[0].user.firstname,
        lastname: body.data[0].user.lastname,
        othername: body.data[0].user.othername,
        username: body.data[0].user.username,
        email: body.data[0].user.email,
        phonenumber: body.data[0].user.phonenumber,
        access: body.data[0].user.access,
      });
      localStorage.setItem('user', userData);

      if (body.data[0].user.access) {
        setTimeout(() => {
          window.location.href = '#';
        }, 2000);
      } else {
        setTimeout(() => {
          window.location.href = './userProfile.html';
        }, 2000);
      }
    } else {
      // alert('error');
    }
    console.log(response);
  }
  catch (err) {
    throw err;
  }
}// createUser();
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', createUser);
