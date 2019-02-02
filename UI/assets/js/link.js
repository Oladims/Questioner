function linker(destination) {
  event.preventDefault();
  console.log(window.location.href);
  if (localStorage.getItem('user')) {
    if (window.location.href = '/index.html') {
      window.location.href = `./pages/${destination}.html`;
    } else {
      window.location.href = `/${destination}.html`;
    }
  } else if (window.location.href != '/index.html') {
    window.location.href = '../pages/login.html';
  }
}
