const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const showPassword = document.getElementById("showPassword");
const error_name = document.getElementById("error_name");
const error_email = document.getElementById("error_email");
const error_password = document.getElementById("error_password");
const submitBtn = document.getElementById("submitBtn");
const letters = /^[A-Za-z]*$/;
const emailAdd = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const checkName = () => {
  if (name.value === "") {
    name.style.border = "1px solid red";
    error_name.innerText = "*Field cannot be empty";
  } else if (!letters.test(name.value)) {
    name.style.border = "1px solid red";
    error_name.innerText = "*Name must contain only letters";
  } else {
    error_name.innerText = "";
    name.style.border = "";
    submitBtn.disabled = false;

  }
}
const checkEmail = () => {
  if (email.value === "") {
    email.style.border = "1px solid red";
    error_email.innerText = "*Field cannot be empty";
    submitBtn.disabled = true;

} else if (!emailAdd.test(email.value)) {
    email.style.border = "1px solid red";
    error_email.innerText = "*Enter a valid Email";
    submitBtn.disabled = true;

} else {
    error_email.innerText = "";
    email.style.border = "";
    submitBtn.disabled = false;

  }
}
const checkPassword = () => {
  if (password.value === "") {
    password.style.border = "1px solid red";
    error_password.innerText = "*Field cannot be empty";
    submitBtn.disabled = true;
    
} else if (password.value.length < 6) {
    password.style.border = "1px solid red";
    error_password.innerText = "*Password length should be more than five";
    submitBtn.disabled = true;
} else {
    error_password.innerText = "";
    password.style.border = "";
    submitBtn.disabled = false;

  }
}

const togglePassword = () => {
  password.type === "password"
    ? (password.type = "text")
    : (password.type = "password");
}

showPassword.onclick = togglePassword;
