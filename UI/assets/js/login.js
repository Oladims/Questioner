async function loginUser(event) {
  const title = document.getElementById('title').innerHTML;
  event.preventDefault();
  document.getElementById("loader").style.display = "block";
  const errorText = document.getElementById('errorText');
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
        isadmin: body.data[0].user.isadmin,
      });
      localStorage.setItem('user', userData);
      setTimeout(() => {
        if (title == "Questioner") {
          window.location.href = './pages/userProfile.html';
        }
        else window.location.href = './userProfile.html';
      }, 2000);
    }
    else {
      document.getElementById("loader").style.display = "none";
      errorText.innerText = body.error;
    }
  }
  catch (err) {
    throw err;
  }
}

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', loginUser);
