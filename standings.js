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

const app = document.getElementById('games-today');
var data = null;
var data2 = null;

// Call the dataTables jQuery plugin
$(document).ready(function() {
	var table = $('#standingsTable').DataTable({"paging":   false, "info": false, "order": [[ 3, "desc" ]]});
	var table2 = $('#standingsTable2').DataTable({"paging":   false, "info": false, "order": [[ 3, "desc" ]]});
	
	const xhr = new XMLHttpRequest();
	
	xhr.withCredentials = true;
	
	xhr.onload = function () {
		data = JSON.parse(this.response);
		console.log(data)
		if (xhr.status >= 200 && xhr.status < 400) {
			data.api.standings.forEach(games => {

				if(games.conference.name == "west" /*|| games.conference.name == "west"*/){
					var teamIndex = teams_array.indexOf(parseInt(games.teamId)) + 1;
					
					// Determine Win or Lose Streak
					var wlStreak = games.winStreak == 1 ? 'W' : 'L'

					table.row.add( [
						teams_array[teamIndex],
						games.win,
						games.loss,
						games.winPercentage,
						games.gamesBehind,
						games.lastTenWin + "-" + games.lastTenLoss,
						wlStreak + games.streak
					] ).draw( false );

				}
				if(games.conference.name == "east"){
					var teamIndex = teams_array.indexOf(parseInt(games.teamId)) + 1;
					
					// Determine Win or Lose Streak
					var wlStreak = games.winStreak == 1 ? 'W' : 'L'

					table2.row.add( [
						teams_array[teamIndex],
						games.win,
						games.loss,
						games.winPercentage,
						games.gamesBehind,
						games.lastTenWin + "-" + games.lastTenLoss,
						wlStreak + games.streak
					] ).draw( false );

				}
			});
		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Gah, it's not working!`;
			app.appendChild(errorMessage);
		}
	}

	xhr.send(data);
});
