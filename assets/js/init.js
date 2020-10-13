export function btnClick(index) {
  const btnElem = document.getElementById(index.id)
    btnElem.addEventListener('click', () => {
      console.log(index.awayTeam.name);
    })
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

export function initComponents() {
    const elemNav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elemNav);
    
}

