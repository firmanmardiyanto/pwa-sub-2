import { getData } from './index.js';

const baseUrl = 'http://api.football-data.org/v2/competitions/2021';

export function getDataNextMatch() {
    getData(baseUrl + '/matches?status=SCHEDULED').then(data => {
        let html = '';

        for (let index of data.matches.slice(0, 2)) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);

            html += `
                <div class="card horizontal hoverable">
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <p>${index.homeTeam.name}</p>
                    </div>
                    <div class="col s4" style="text-align: center;">
                        <p>${data.competition.name}</p>
                        <p>Matchday ${index.matchday}</p>
                        <h4>VS</h4>
                        <p>${local} WIB</p>
                    </div>
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <p>${index.awayTeam.name}</p>
                    </div>
                </div>
            `;
        }

        let nextId = document.getElementById('next-match') || null;
        nextId.innerHTML = html;

        let preloadId = document.getElementById('preloader-1') || null;
        preloadId.style.display = 'none';

    });
}

export function getDataRecentMatch() {
    getData(baseUrl + '/matches?status=FINISHED').then(data => {
        let html = '';

        for (let index of data.matches.slice(-2)) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);

            html += `
                <div class="card horizontal hoverable">
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <p>${index.homeTeam.name}</p>
                    </div>
                    <div class="col s4" style="text-align: center;">
                        <p>${data.competition.name}</p>
                        <p>Matchday ${index.matchday}</p>
                        <h4>${index.score.fullTime.homeTeam}:${index.score.fullTime.awayTeam}</h4>
                        <p>${local} WIB</p>
                    </div>
                    <div class="col s4" style="display: flex; align-items: center; justify-content: center;">
                        <p>${index.awayTeam.name}</p>
                    </div>
                </div>
            `;
        }

        let recentId = document.getElementById('recent-match') || null;
        recentId.innerHTML = html;

        let preloadId = document.getElementById('preloader-2') || null;
        preloadId.style.display = 'none';

    });
}

export function getDataKlasemen() {
    getData(baseUrl + '/standings').then(data => {
        let html = '';

        data.standings[0].table.forEach(club => {
            html += `
                <tr>
                    <td>${club.position}</td>
                    <td>
                        <img src="${club.team.crestUrl}" width="20" height="20">
                        <span>${club.team.name}</span>
                    </td>
                    <td>${club.playedGames}</td>
                    <td>${club.won}</td>
                    <td>${club.draw}</td>
                    <td>${club.lost}</td>
                    <td>${club.points}</td>
                </tr>
            `;
        });

        let klasemenId = document.getElementById('klasemen') || null;
        klasemenId.innerHTML = html;

        let preloadId = document.getElementById('preloader-3') || null;
        preloadId.style.display = 'none';
    })
}

export function home() {
    // home page
    getDataNextMatch();
    getDataRecentMatch();
    getDataKlasemen();
}




