import {loadNav, loadPage} from './navbar.js';
import {getDataNextMatch, getDataRecentMatch, getDataKlasemen, getDataCompetition} from './home.js';
// import {getDataFixturesNext} from './fixtures.js';

document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
  
    loadNav();

    let page = window.location.hash.substr(1);
    if (page == '') page = 'home';
    loadPage(page);

    getDataNextMatch();
    getDataRecentMatch();
    getDataKlasemen();
    getDataCompetition();

    // getDataFixturesNext();
});