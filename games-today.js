/* <div class="col-xl-3 col-md-6 mb-4">
    <div class="card border-left-primary shadow h-100 py-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1", id="game1"></div>
                    <div class="h5 mb-0 font-weight-bold text-gray-800">6:30pm</div>
                </div>
                <div class="col-auto">
                    <i class="fas fa-calendar fa-2x text-gray-300"></i>
                </div>
            </div>
        </div>
    </div>
</div> */
const app = document.getElementById('games-today');

const container = document.createElement('div');
container.setAttribute('class', 'row');


app.appendChild(container);

var counter = 0;

// Team Logos
var cavs = "https://www.nba.com/cavaliers/sites/cavaliers/files/styles/mobile__700x500_/public/externals/7e35978536f9dcf829450f38c1b2cbd0.png"
var pistons = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Pistons_logo17.svg/1200px-Pistons_logo17.svg.png"


var d = new Date();
var date1 = d.getFullYear().toString() + "-0" + (d.getMonth() + 1).toString()+ '-0' + d.getDate().toString();
var date2 = d.getFullYear().toString() + "-0" + (d.getMonth() + 1).toString()+ '-0' + (Number(d.getDate())+1).toString();


const request1 = new XMLHttpRequest();

request1.withCredentials = true;


const request2 = new XMLHttpRequest();
	
request2.withCredentials = true;

request1.onload = function () {
	
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	if (request1.status >= 200 && request1.status < 400) {
		data.api.games.forEach(games => {
			var nowDate = games.startTimeUTC
			var localDate1 = new Date(nowDate)
			//console.log(localDate1.getHours())
			if (localDate1.getHours() < 19) {
			const a = document.createElement('div');
			a.setAttribute('class', 'col-xl-4 col-md-6 mb-4');
			const b = document.createElement('div');
			b.setAttribute('class', 'card border-left-primary shadow h-100 py-2 games-today-card');
			b.setAttribute('id', games.gameId)
			b.setAttribute('homeTeamId', games.hTeam.teamId)
			b.setAttribute('awayTeamId', games.vTeam.teamId)
			b.setAttribute('gameStatus', games.statusGame)
			b.addEventListener('click', clickHandler)
			
			
			const c = document.createElement('div');
			c.setAttribute('class', 'card-body');
			const d = document.createElement('div');
			d.setAttribute('class', 'row no-gutters align-items-center');
			const e = document.createElement('div');
			e.setAttribute('class', 'col mr-2');
			const h = document.createElement('div');
			h.setAttribute('class', 'col-auto');
			const i = document.createElement('img');
			
			if (games.vTeam.nickName == 'Cavaliers'){
				i.setAttribute('src', cavs);
			}
			else if (games.vTeam.nickName == 'Pistons'){
				i.setAttribute('src', pistons);
			}
			else {
				i.setAttribute('src', games.vTeam.logo);
			}
			i.setAttribute('width', 75);
			i.setAttribute('height', "auto");
			const j = document.createElement('img');
			if (games.hTeam.nickName == 'Cavaliers'){
				j.setAttribute('src', cavs);
				
			}
			else if (games.hTeam.nickName == 'Pistons'){
				j.setAttribute('src', pistons);
			}
			else {
				j.setAttribute('src', games.hTeam.logo);
			}
			j.setAttribute('width', 75);
			j.setAttribute('height', "auto");
			
			
			a.appendChild(b);
			b.appendChild(c);
			c.appendChild(d);
			d.appendChild(i);
			d.appendChild(e);
			d.appendChild(j)
			d.appendChild(h);
			
			const team_names_div = document.createElement('div');
			team_names_div.setAttribute('class', 'text-lg font-weight-bold text-primary text-center text-uppercase border-bottom-dark mb-1');
			team_names_div.textContent = games.vTeam.nickName + " @ " + games.hTeam.nickName
			
			e.appendChild(team_names_div);
			
			if( games.statusGame != "Scheduled") { //if game has yet to start, checks to see if game status is displaying a time
				const game_score_div = document.createElement('div');
				game_score_div.setAttribute('class', 'h5 mb-0 font-weight-bold text-center text-lg text-gray-800');
				game_score_div.textContent = games.vTeam.score.points + " - " + games.hTeam.score.points
				
				e.appendChild(game_score_div);
				
				if( container.childNodes[0] == null)
				container.appendChild(a);
				else 
				container.insertBefore(a, container.childNodes[0]);
				
			} else {
				container.appendChild(a);
			}
			
			const status_div = document.createElement('div');
			status_div.setAttribute('class', 'text-lg font-weight-bold text-info text-uppercase text-center mb-1');
			
			if (games.statusGame == "Scheduled"){
				var utcDate = games.startTimeUTC
				var localDate = new Date(utcDate)
				var minutes = localDate.getMinutes()
				if (minutes == 0) {minutes = "00"}
				status_div.textContent = localDate.getHours() - 12 + ":" + minutes + " PM CT"
			}
			if (games.statusGame == "Finished"){
				status_div.textContent = "Final"
			}
			if( games.statusGame == "In Play") { //if game is in progress, checks to see if Qtr is in status
				var quarter = games.currentPeriod
				if (games.halftime == '1'){
					status_div.textContent = "Halftime"
				}
				else if (games.EndOfPeriod == "1"){
					status_div.textContent = "End of Qtr " + quarter.charAt(0)
				}
				else if( games.clock=="" ){
					status_div.textContent = "Qtr " + quarter.charAt(0) + " - 00:00" 
				} else {
					status_div.textContent = "Qtr " + quarter.charAt(0) + " - " + games.clock
				}
			}
			
			e.appendChild(status_div);
			counter++
		}
		});
	} else {
		console.log("Error loading first API request for games today."  + "Request status is: " + request1.status)
	}
}

request2.onload = function () {
	
	// Begin accessing JSON data here
	var data = JSON.parse(this.response);
	if (request2.status >= 200 && request2.status < 400) {
		data.api.games.forEach(games => {
			var nowDate = games.startTimeUTC
			var localDate1 = new Date(nowDate)
			if (localDate1.getHours() >= 19) {

			const a = document.createElement('div');
			a.setAttribute('class', 'col-xl-4 col-md-6 mb-4');
			const b = document.createElement('div');
			b.setAttribute('class', 'card border-left-primary shadow h-100 py-2 games-today-card');
			b.setAttribute('id', games.gameId)
			b.setAttribute('homeTeamId', games.hTeam.teamId)
			b.setAttribute('awayTeamId', games.vTeam.teamId)
			b.setAttribute('gameStatus', games.statusGame)
			
			b.addEventListener('click', clickHandler)
			
			
			const c = document.createElement('div');
			c.setAttribute('class', 'card-body');
			const d = document.createElement('div');
			d.setAttribute('class', 'row no-gutters align-items-center');
			const e = document.createElement('div');
			e.setAttribute('class', 'col mr-2');
			const h = document.createElement('div');
			h.setAttribute('class', 'col-auto');
			const i = document.createElement('img');
			
			if (games.vTeam.nickName == 'Cavaliers'){
				i.setAttribute('src', cavs);
			}
			else if (games.vTeam.nickName == 'Pistons'){
				i.setAttribute('src', pistons);
			}
			else {
				i.setAttribute('src', games.vTeam.logo);
			}
			i.setAttribute('width', 75);
			i.setAttribute('height', "auto");
			const j = document.createElement('img');

			if (games.hTeam.nickName == 'Cavaliers'){
				j.setAttribute('src', cavs);
			}
			else if (games.hTeam.nickName == 'Pistons'){
				j.setAttribute('src', pistons);
			}
			else {
				j.setAttribute('src', games.hTeam.logo);
			}
			j.setAttribute('width', 75);
			j.setAttribute('height', "auto");
			
			
			a.appendChild(b);
			b.appendChild(c);
			c.appendChild(d);
			d.appendChild(i);
			d.appendChild(e);
			d.appendChild(j)
			d.appendChild(h);
			
			const team_names_div = document.createElement('div');
			team_names_div.setAttribute('class', 'text-lg font-weight-bold text-primary text-center text-uppercase border-bottom-dark mb-1');
			team_names_div.textContent = games.vTeam.nickName + " @ " + games.hTeam.nickName
			
			e.appendChild(team_names_div);
			
			if( games.statusGame != "Scheduled") { //if game has yet to start, checks to see if game status is displaying a time
				const game_score_div = document.createElement('div');
				game_score_div.setAttribute('class', 'h5 mb-0 font-weight-bold text-center text-lg text-gray-800');
				game_score_div.textContent = games.vTeam.score.points + " - " + games.hTeam.score.points
				
				e.appendChild(game_score_div);
				
				if( container.childNodes[0] == null)
				container.appendChild(a);
				else 
				container.insertBefore(a, container.childNodes[0]);
				
			} else {
				container.appendChild(a);
			}
			
			const status_div = document.createElement('div');
			status_div.setAttribute('class', 'text-lg font-weight-bold text-info text-uppercase text-center mb-1');
			
			if (games.statusGame == "Scheduled"){
				var utcDate = games.startTimeUTC
				var localDate = new Date(utcDate)
				var minutes = localDate.getMinutes()
				if (minutes == 0) {minutes = "00"}
				status_div.textContent = localDate.getHours() - 12 + ":" + minutes + " PM CT"
			}
			if (games.statusGame == "Finished"){
				status_div.textContent = "Final"
			}
			if( games.statusGame == "In Play") { //if game is in progress, checks to see if Qtr is in status
				var quarter = games.currentPeriod
				if (games.halftime == '1'){
					status_div.textContent = "Halftime"
				}
				else if (games.EndOfPeriod == "1"){
					status_div.textContent = "End of Qtr " + quarter.charAt(0)
				}
				else if( games.clock=="" ){
					status_div.textContent = "Qtr " + quarter.charAt(0) + " - 00:00" 
				} else {
					status_div.textContent = "Qtr " + quarter.charAt(0) + " - " + games.clock
				}
			}
			
			e.appendChild(status_div);
			counter++
		}
		});
	} else {
		console.log("Error loading second API request for games today." + "Request status is: " + request2.status)
	}
} 

function clickHandler() {
	//console.log(this.getAttribute("id")+"&homeTeamId="+this.getAttribute("homeTeamId")+"&awayTeamId="+this.getAttribute("awayTeamId"))
	window.location.assign("gameview.html?gameId="+this.getAttribute("id")+"&homeTeamId="+this.getAttribute("homeTeamId")+"&awayTeamId="+this.getAttribute("awayTeamId")+"&gameStatus="+this.getAttribute("gameStatus"));
}

request1.send();
request2.send()