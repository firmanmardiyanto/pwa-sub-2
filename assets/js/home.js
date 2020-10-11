import { getData } from './index.js';

const nextMatch = 'http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED';
const recentMatch = 'http://api.football-data.org/v2/competitions/2021/matches?status=FINISHED';
const klasemen = 'http://api.football-data.org/v2/competitions/2021/standings';
const competitions = [
    'http://api.football-data.org/v2/competitions/2001/',
    'http://api.football-data.org/v2/competitions/2002/',
    'http://api.football-data.org/v2/competitions/2003/',
    'http://api.football-data.org/v2/competitions/2014/',
    'http://api.football-data.org/v2/competitions/2015/',
    'http://api.football-data.org/v2/competitions/2021/',
];

export function getDataNextMatch() {
    getData(nextMatch).then(data => {
        let html = '';

        for (let index of data.matches.slice(0, 2)) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);

            html += `
                <tr class="card">
                    <td class="team-wrap">
                        <img src="img/match/tf-1.jpg" alt="">
                        <h6>${index.homeTeam.name}</h6>
                    </td>
                    <td class="mt-content" style="text-align: center;">
                        <div class="mc-op">${data.competition.name}</div>
                        <div class="mc-op">Matchday ${index.matchday}</div>
                        <h4>VS</h4>
                        <div class="mc-op">${local} WIB</div>
                    </td>
                    <td class="team-wrap">
                        <img src="img/match/tf-2.jpg" alt="">
                        <h6>${index.awayTeam.name}</h6>
                    </td>
                </tr>
            `;
        }

        let nextId = document.getElementById('next-match') || null;
        nextId.innerHTML = html;

        let preloadId = document.getElementById('preloader-1') || null;
        preloadId.style.display = 'none';

    });
}

export function getDataRecentMatch() {
    getData(recentMatch).then(data => {
        let html = '';

        for (let index of data.matches.slice(-2)) {
            let wib = index.utcDate;
            let local = new Date(wib).toLocaleString('id-ID').slice(0, -3);

            html += `
                <tr class="card">
                    <td class="team-wrap">
                        <img src="img/match/tf-1.jpg" alt="">
                        <h6>${index.homeTeam.name}</h6>
                    </td>
                    <td class="mt-content"  style="text-align: center;">
                        <div class="mc-op">${data.competition.name}</div>
                        <div class="mc-op">Matchday ${index.matchday}</div>
                        <h4>${index.score.fullTime.homeTeam}:${index.score.fullTime.awayTeam}</h4>
                        <div class="mc-op">${local} WIB</div>
                    </td>
                    <td class="team-wrap">
                        <img src="img/match/tf-2.jpg" alt="">
                        <h6>${index.awayTeam.name}</h6>
                    </td>
                </tr>
            `;
        }

        let recentId = document.getElementById('recent-match') || null;
        recentId.innerHTML = html;

        let preloadId = document.getElementById('preloader-2') || null;
        preloadId.style.display = 'none';

    });
}

export function getDataKlasemen() {
    getData(klasemen).then(data => {
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

export function getDataCompetition() {
    let requestAll = competitions.map(url => getData(url));
    Promise.all(requestAll).then(datas => {
        let html = '';
        datas.forEach(data => {
            html += `
                <div class="col s12 m4">
                    <a href="#">
                        <div class="card-panel teal">
                            <h5 class="center-align white-text">${data.name}</h5>
                        </div>
                    </a>
                </div>
            `;
        });

        let competitionId = document.getElementById('competitions') || null;
        competitionId.innerHTML = html;

        let preloadId = document.getElementById('preloader-4') || null;
        preloadId.style.display = 'none';
    });

}




