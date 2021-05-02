let teams_array = [	1,"Atlanta Hawks","Hawks","ATL",
					2,"Boston Celtics","Celtics","BOS",
					4,"Brooklyn Nets","Nets","BKN",
					5,"Charlotte Hornets","Hornets","CHA",
					6,"Chicago Bulls","Bulls","CHI",
					7,"Cleveland Cavaliers","Cavaliers","CLE",
					8,"Dallas Mavericks","Mavericks","DAL",
					9,"Denver Nuggets","Nuggets","DEN",
					10,"Detroit Pistons","Pistons","DET",
					11,"Golden State Warriors","Warriors","GSW",
					14,"Houston Rockets","Rockets","HOU",
					15,"Indiana Pacers","Pacers","IND",
					16,"LA Clippers","Clippers","LAC",
					17,"Los Angeles Lakers","Lakers","LAL",
					19,"Memphis Grizzlies","Grizzlies","MEM",
					20,"Miami Heat","Heat","MIA",
					21,"Milwaukee Bucks","Bucks","MIL",
					22,"Minnesota Timberwolves","Timberwolves","MIN",
					23,"New Orleans Pelicans","Pelicans","NOP",
					24,"New York Knicks","Knicks","NYK",
					25,"Oklahoma City Thunder","Thunder","OKC",
					26,"Orlando Magic","Magic","ORL",
					27,"Philadelphia 76ers","76ers","PHI",
					28,"Phoenix Suns","Suns","PHX",
					29,"Portland Trail Blazers","Trail Blazers","POR",
					30,"Sacramento Kings","Kings","SAC",
					31,"San Antonio Spurs","Spurs","SAS",
					38,"Toronto Raptors","Raptors","TOR",
					40,"Utah Jazz","Jazz","UTA",
					41,"Washington Wizards","Wizards","WAS"]; 
					/*teamId, fullName, nickname, shortname*/
					//console.log(teams_array.indexOf("Hawks")) //returns 2
					//console.log(teams_array.indexOf(2)) //returns 4

    const appp = document.getElementById('trending-teams');
    var data = null;

    const containerr = document.createElement('div');
    containerr.setAttribute('class', 'card-body');
    appp.appendChild(containerr);

	const xhr = new XMLHttpRequest();
	
	xhr.withCredentials = true;

    var lastTenWins = {};

    xhr.onload = function () {
		data = JSON.parse(this.response);
		if (xhr.status >= 200 && xhr.status < 400) {
			data.api.standings.forEach(games => {
                    var teamIndex = teams_array.indexOf(parseInt(games.teamId)) + 1;
                    lastTenWins[teams_array[teamIndex]] = parseInt(games.lastTenWin);
            });
        } else {
            console.log("Error loading teams trending up.")
        }
        
        
        // Create items array
        var items = Object.keys(lastTenWins).map(function(key) {
            return [key, lastTenWins[key]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        
        // Display first 5 teams in sorted Dictionary: LastTenWins
        var counter = 0;
        for(var key in items){
            if (counter == 5) {break;}
            var progress = 10 * items[key][1];
            
            const a = document.createElement('h4');
            a.setAttribute('class', 'small font-weight-bold');
            a.textContent = items[key][0];
            const b = document.createElement('span');
            b.setAttribute('class', 'float-right')
            b.textContent = items[key][1] + " - " + (10 - items[key][1]).toString()
            a.appendChild(b);
            containerr.appendChild(a);
            
            const c = document.createElement('div');
            c.setAttribute('class', 'progress mb-4');
            const d = document.createElement('div');
            d.setAttribute('class', 'progress-bar bg-info');
            d.setAttribute('role', 'progressbar');
            d.setAttribute('style', 'width: ' + progress.toString() + '%');
            d.setAttribute('aria-valuenow', progress.toString());
            d.setAttribute('aria-valuemin', "0");
            d.setAttribute('aria-valuemax', '100');
            c.appendChild(d)
            containerr.appendChild(c);
            counter++;
        }
    }
        
        xhr.send();
        
/* 
<div class="card-body">
    <h4 class="small font-weight-bold">Server Migration <span
            class="float-right">20%</span></h4>

    <div class="progress mb-4">
        <div class="progress-bar bg-danger" role="progressbar" style="width: 20%"
            aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h4 class="small font-weight-bold">Sales Tracking <span
            class="float-right">40%</span></h4>
    <div class="progress mb-4">
        <div class="progress-bar bg-warning" role="progressbar" style="width: 40%"
            aria-valuenow="40" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h4 class="small font-weight-bold">Customer Database <span
            class="float-right">60%</span></h4>
    <div class="progress mb-4">
        <div class="progress-bar" role="progressbar" style="width: 60%"
            aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h4 class="small font-weight-bold">Payout Details <span
            class="float-right">80%</span></h4>
    <div class="progress mb-4">
        <div class="progress-bar bg-info" role="progressbar" style="width: 80%"
            aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
    <h4 class="small font-weight-bold">Account Setup <span
            class="float-right">Complete!</span></h4>
    <div class="progress">
        <div class="progress-bar bg-success" role="progressbar" style="width: 100%"
            aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
    </div>
</div>
*/