function linker(destination) {
  event.preventDefault();
  if (localStorage.getItem('user')) {
    window.location.href = `../pages/${destination}.html`;
  } else {
    window.location.href = '../pages/login.html';
  }
}
