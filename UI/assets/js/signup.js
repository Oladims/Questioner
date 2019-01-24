async function  createUser(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const otherName = document.getElementById('otherName').value;
  const emailaddress = document.getElementById('email').value;
  const userPassword = document.getElementById('password').value;
  const phonenumber = '08136715215';
  const submitBtn = document.getElementById('submitBtn');

  const url = 'https://oladims-questioner.herokuapp.com/api/v1/user/signup';

  const params = {
    firstname: firstName,
    lastname: lastName,
    email: emailaddress,
    password: userPassword,
    username: otherName,
    phonenumber: phonenumber,
  };
try{
 const response =  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
    const data = await response.json();
    if(response.ok) {
      window.location.href = './userProfile.html';
    }
    else{
      // alert('error');
    }
    console.log(response);
    console.log(data);
    
}
catch(err){
  throw err;
}
}// createUser();
submitBtn.addEventListener('click', createUser);