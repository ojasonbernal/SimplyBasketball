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

const gameviewApp = document.getElementById('gameviewTable');
const gameTitleApp = document.getElementById('gameTitle');
const homeTeamTitleApp = document.getElementById('homeTeamTitle');
const awayTeamTitleApp = document.getElementById('awayTeamTitle');

//var team = document.getElementById('team')
const urlParams = new URLSearchParams(window.location.search);
const gameId = urlParams.get('gameId');
const homeTeamId = urlParams.get('homeTeamId');
const awayTeamId = urlParams.get('awayTeamId');
const gameStatus = urlParams.get('gameStatus');
var data = null;
var playerFullName
var awayTeam = teams_array[teams_array.indexOf(parseInt(awayTeamId)) + 1]
var homeTeam = teams_array[teams_array.indexOf(parseInt(homeTeamId)) + 1]

gameTitleApp.textContent = awayTeam + " @ " + homeTeam
homeTeamTitleApp.textContent = homeTeam
awayTeamTitleApp.textContent = awayTeam

const gameviewXHR = new XMLHttpRequest();
gameviewXHR.withCredentials = true;

// if game has yet to start
if(gameStatus == "Scheduled"){ 
	console.log('Scheduled')
	var table = $('#divA').remove();
	var table = $('#divB').remove();
}
// game has started/finished
else{
	console.log('Started/Finished')
	homeTeamTitleApp.textContent += ": Box Score"
	awayTeamTitleApp.textContent += ": Box Score"
	$.getJSON( "players.json", function( json ) {
		//console.log(json.api.players);
		// Call the dataTables jQuery plugin
		$(document).ready(function() {
			var table = $('#playerStats').DataTable({"searching": false, "paging":   false, "info": false, "order": [[ 2, "desc" ]]});
			var table2 = $('#playerStats2').DataTable({"searching": false,"paging":   false, "info": false, "order": [[ 2, "desc" ]]});
			
			gameviewXHR.onload = function () {
				data = JSON.parse(this.response);
				//console.log(data)
				if (gameviewXHR.status >= 200 && gameviewXHR.status < 400) {
					data.api.statistics.forEach(player => {
						// Loop through json players to find where playerId = playerId
						json.api.players.forEach(jsonPlayer => {
							if (player.playerId == jsonPlayer.playerId) { playerFullName = jsonPlayer.firstName + " " + jsonPlayer.lastName}
						})
						// Check if players have played
						if (player.min == '0:00' || player.min == "") {
							return true
						}
						if(player.teamId == homeTeamId ){
							table.row.add( [
								playerFullName,//json.api.players[player.playerId-1].firstName + " " + json.api.players[player.playerId-1].lastName,
								player.min,
								player.points,
								player.fgm + "-" + player.fga,
								player.tpm + "-" + player.tpa,
								player.ftm + "-" + player.fta,
								player.totReb,
								player.offReb,
								player.defReb,
								player.assists,
								player.steals,
								player.blocks,
								player.turnovers,
								player.plusMinus
							] ).draw( false );
						}
						if(player.teamId == awayTeamId){
							table2.row.add( [
								playerFullName,//json.api.players[player.playerId-1].firstName + " " + json.api.players[player.playerId-1].lastName,
								player.min,
								player.points,
								player.fgm + "-" + player.fga,
								player.tpm + "-" + player.tpa,
								player.ftm + "-" + player.fta,
								player.totReb,
								player.offReb,
								player.defReb,
								player.assists,
								player.steals,
								player.blocks,
								player.turnovers,
								player.plusMinus
							] ).draw( false );
						}
					});
				} else {
					console.log("Gah! statistics/players/gameId/ is not working!")
				}
			}
			
			gameviewXHR.send(data);
		});
	});
}
