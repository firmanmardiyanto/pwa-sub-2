export async function loadNav() {
    const responseNav = await fetch('nav.html');

    if (responseNav.ok) {
      const data = await responseNav.text();
      document.querySelectorAll('.topnav, .sidenav').forEach(function(elem) {
        elem.innerHTML = data;
      });

      document.querySelectorAll('.sidenav a, .topnav a')
          .forEach(function(elem) {
            elem.addEventListener('click', function(event) {
              // tutup sidenav
              const sidenav = document.querySelector('.sidenav');
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              const page = event.target.getAttribute('href').substr(1);
              loadPage(page);
            });
          });
    } else {
      alert('HTTP-Error: ' + responseNav.status);
    }
}

export async function loadPage(elements) {
    const response = await fetch(`pages/${elements}.html`);
    const content = document.querySelector('#body-content');

    if (response.ok) {
      const data = await response.text();
      content.innerHTML = data;
    } else if (response.status === 404) {
      content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
    } else {
      content.innerHTML = '<p>Ups halaman tidak dapat diakses.</p>';
    }
}