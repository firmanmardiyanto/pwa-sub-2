import {loadNav} from './navbar.js';
import {home} from './home.js';
import {fixtures} from './fixtures.js';
import {initComponents, loadPage} from './init.js';

const load = function() {
    initComponents();
        
    loadNav();

    // home page
    home();

    // fixtures page
    fixtures();

    // let save = document.querySelector('.red');
    // console.log(save);
    // save.onclick = () => {
    //     console.log('Tombol save klik');
    // }

};

document.addEventListener('DOMContentLoaded', load);