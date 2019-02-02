async function loginUser(event) {
  event.preventDefault();
  document.getElementById("loader").style.display = "block";

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
      console.log(userData);
      console.log(body);

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
    }
    else {
      //   alert('error');
    }
    console.log(response);
  }
  catch (err) {
    throw err;
  }
}
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', loginUser);
