function createUser(event) {
  event.preventDefault;

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const emailaddress = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  const submitBtn = document.getElementById("submitBtn");

  const params = `firstname=${firstName}&lastname=${lastName}&email=${emailaddress}&password=${userPassword}`;
  const url = "https://oladims-questioner.herokuapp.com/api/v1/user/signup";

//   const params = {
//     firstname: firstName,
//     lastname: lastName,
//     email: emailaddress,
//     password: userPassword,
//   };
    let options = {
        method: "post",
        headers: {
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
        body:params,
      }
  fetch(url, options).catch(err => err);
}
// createUser();
submitBtn.addEventListener("click", createUser);
