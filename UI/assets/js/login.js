
email.addEventListener("focusout", checkEmail, true);

password.addEventListener("focusout", checkPassword, true);

submitBtn.onclick = () => {
    checkEmail();
    checkPassword();
};