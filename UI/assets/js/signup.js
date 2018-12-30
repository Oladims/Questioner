
name.addEventListener("focusout", checkName, true);

email.addEventListener("focusout", checkEmail, true);

password.addEventListener("focusout", checkPassword, true);

submitBtn.onclick = () => {
    checkName();
    checkEmail();
    checkPassword();
};