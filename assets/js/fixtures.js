import { getData } from './index.js';

const nextMatch = 'http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED';
const recentMatch = 'http://api.football-data.org/v2/competitions/2021/matches?status=FINISHED';

const competitions = [
    'http://api.football-data.org/v2/competitions/2001/',
    'http://api.football-data.org/v2/competitions/2002/',
    'http://api.football-data.org/v2/competitions/2003/',
    'http://api.football-data.org/v2/competitions/2014/',
    'http://api.football-data.org/v2/competitions/2015/',
    'http://api.football-data.org/v2/competitions/2021/',
];

export function getDataFixturesNext() {
    getData(`http://api.football-data.org/v2/competitions/2021/matches?status=SCHEDULED`).then(data => {
        let html = '';

        for (let index of data.matches) {
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

        document.getElementById('next-match-fixtures').innerHTML = html;
        document.getElementById('preloader-1').style.display = 'none';

    });
}

export function getDataFixturesRecent() {
    getData(recentMatch).then(data => {
        let html = '';

        for (let index of data.matches) {
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

        document.getElementById('recent-match-fixtures').innerHTML = html;
        document.getElementById('preloader-2').style.display = 'none';

    });
}

getDataFixturesNext();
getDataFixturesRecent();

getData('http://api.football-data.org/v2/competitions/2001').then(data => {
    console.log(data);
});

let id = document.getElementById('competitionFixture').value;

console.log(id);