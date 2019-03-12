const loggedIn = localStorage.getItem('user');
const nav = document.getElementById('navList');

function logOut() {
  event.preventDefault();
  localStorage.clear();
  window.location.href = '../index.html';
}
function linker(destination) {
  event.preventDefault();
  if (localStorage.getItem('user')) {
    window.location.href = `../pages/${destination}.html`;
  } else {
    window.location.href = '../pages/login.html';
  }
}

if (loggedIn) {
  nav.innerHTML += `<li><a onclick="logOut()" href="">Logout</a></li>`;
}