async function loginUser(event) {
  event.preventDefault();


  const emailaddress = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;

  const submitBtn = document.getElementById('submitBtn');

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
      window.location.href = './userProfile.html';
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
submitBtn.addEventListener('click', loginUser);
