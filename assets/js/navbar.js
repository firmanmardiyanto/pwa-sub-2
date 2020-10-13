import {loadPage} from './init.js'

export async function loadNav() {
    const responseNav = await fetch('nav.html');



    if (responseNav.ok) {
      const data = await responseNav.text();
      document.querySelectorAll('.topnav, .sidenav').forEach(elem => {
        elem.innerHTML = data;
      });

      document.querySelectorAll('.sidenav a, .topnav a')
          .forEach(elem => {
            elem.addEventListener('click', event => {
              // tutup sidenav
              const sidenav = document.querySelector('.sidenav');
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              const page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
        
      let page = window.location.hash.substr(1);
      if (page == '') page = 'home';
      loadPage(page);
      
    } else {
      alert('HTTP-Error: ' + responseNav.status);
    }
}