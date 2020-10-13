import { getData } from './index.js';
import { btnClick } from './init.js';

const baseUrl = 'http://api.football-data.org/v2/competitions/2021/matches?status=';

function addListener(data) {
        //add listener by id
        for (let index of data.matches) {
            btnClick(index);
        }
}

export function getDataFixturesNext() {
    getData(baseUrl + 'SCHEDULED').then(data => {
        let html = '';

        for (let index of data.matches) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);
            html += `
                <div class="card horizontal hoverable" style="margin-top: 3rem;">
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <h6>${index.homeTeam.name}</h6>
                    </div>
                    <div class="col s4" style="text-align: center;">
                        <p>${data.competition.name}</p>
                        <p>Matchday ${index.matchday}</p>
                        <h4>VS</h4>
                        <p>${local} WIB</p>
                    </div>
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <h6>${index.awayTeam.name}</h6>
                    </div>
                    
                    <a class="btn-floating halfway-fab waves-effect waves-light red" name="save" id="${index.id}">
                        <i class="material-icons">add</i>
                    </a>
                </div>
            `;
        }

        const elemId = document.getElementById('next-match-fixtures') || null;
        elemId.innerHTML = html;

        addListener(data);

        /**
         *  Tidak perlu pakai ini, karena begitu di innerHTML otomatis tertimpah
        const preloadId = document.getElementById('preloaderFix-1');
        preloadId.style.display = 'none'; */

    });
}

export function getDataFixturesRecent() {
    getData(baseUrl + 'FINISHED').then(data => {
        let html = '';

        for (let index of data.matches) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);

            html += `
                <div class="card horizontal hoverable" style="margin-top: 3rem;">
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <h6>${index.homeTeam.name}</h6>
                    </div>
                    <div class="col s4" style="text-align: center;">
                        <p>${data.competition.name}</p>
                        <p>Matchday ${index.matchday}</p>
                        <h4>${index.score.fullTime.homeTeam} : ${index.score.fullTime.awayTeam}</h4>
                        <p>${local} WIB</p>
                    </div>
                    
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <h6>${index.awayTeam.name}</h6>
                    </div>

                    <a class="btn-floating halfway-fab waves-effect waves-light red" id="${index.id}">
                        <i class="material-icons">add</i>
                    </a>
                </div>
            `;
        }

        const elemId = document.getElementById('recent-match-fixtures') || null;
        elemId.innerHTML = html;

        addListener(data);

        /**
         *  Tidak perlu pakai ini, karena begitu di innerHTML otomatis tertimpah
        const preloadId = document.getElementById('preloaderFix-2');
        preloadId.style.display = 'none'; */

    });
}


export function fixtures() {
    getDataFixturesNext();
    getDataFixturesRecent();
}
