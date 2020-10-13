class AfterLoad {

  static btnClick() {
    const btnElem = document.getElementsByName('save');
    console.log(btnElem);
    btnElem.addEventListener('click', () => {
      console.log('button click');
    })
  }
}

export async function loadPage(elements) {
    const response = await fetch(`pages/${elements}.html`);
    const content = document.querySelector('#body-content');

    if (response.ok) {
      const data = await response.text();
      content.innerHTML = data;
      AfterLoad.btnClick();
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

