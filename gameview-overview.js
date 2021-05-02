const gameviewMainContent = document.getElementById('mainContent');

//var team = document.getElementById('team')
data = null;
awayTeam = teams_array[teams_array.indexOf(parseInt(awayTeamId)) + 1]
homeTeam = teams_array[teams_array.indexOf(parseInt(homeTeamId)) + 1]

const htRequest = new XMLHttpRequest();
htRequest.withCredentials = true;

htRequest.onload = function () {
    data = JSON.parse(this.response);
    console.log(data)
    if (htRequest.status >= 200 && htRequest.status < 400) {
        data.api.game.forEach(details => {
            const row1 = document.createElement('div');
			row1.setAttribute('class', 'row no-gutters justify-content-space-around align-items-center');

            // home team logo
            const i = document.createElement('img');
            if (details.vTeam.fullName == 'Cleveland Cavaliers'){
                i.setAttribute('src', cavs);
            }
            else if (details.vTeam.fullName == 'Detriot Pistons'){
                i.setAttribute('src', pistons);
            }
            else {
                i.setAttribute('src', details.vTeam.logo);
            }
            i.setAttribute('width', "20%");
            i.setAttribute('height', "auto");

            // Away Team Logo
            const j = document.createElement('img');
            if (details.hTeam.fullName == 'Cleveland Cavaliers'){
                j.setAttribute('src', cavs);
                
            }
            else if (details.hTeam.fullName == 'Detriot Pistons'){
                j.setAttribute('src', pistons);
            }
            else {
                j.setAttribute('src', details.hTeam.logo);
            }
            j.setAttribute('width', "20%");
            j.setAttribute('height', "auto");
            j.setAttribute('style', 'float: right')

            // Start Time
            const status_div = document.createElement('div');
            if (gameStatus == "Scheduled"){
                status_div.setAttribute('class', 'text-lg font-weight-bold text-info text-uppercase text-center mb-1');
                var utcDate = details.startTimeUTC
                var localDate = new Date(utcDate)
                var minutes = localDate.getMinutes()
                if (minutes == 0) {minutes = "00"}
                status_div.textContent = localDate.getHours() - 12 + ":" + minutes + " PM CT"
            }


            gameviewMainContent.appendChild(row1)
            row1.appendChild(i)
            row1.appendChild(status_div)
            row1.appendChild(j)
        })
    }
}
htRequest.send(data)

