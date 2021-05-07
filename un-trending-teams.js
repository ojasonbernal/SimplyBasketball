

const unTrendingTeamsApp = document.getElementById('un-trending-teams');
var data = null;

const unTrendingTeamsContainer = document.createElement('div');
unTrendingTeamsContainer.setAttribute('class', 'card-body');
unTrendingTeamsApp.appendChild(unTrendingTeamsContainer);

const unTrendingTeamsXHR = new XMLHttpRequest();

unTrendingTeamsXHR.withCredentials = true;


var lastTenWins = {};

unTrendingTeamsXHR.onload = function () {
    data = JSON.parse(this.response);
    if (xhr.status >= 200 && xhr.status < 400) {
        data.api.standings.forEach(games => {
                var teamIndex = teams_array.indexOf(parseInt(games.teamId)) + 1;
                lastTenWins[teams_array[teamIndex]] = parseInt(games.lastTenWin);
        });
    } else {
        console.log("Error loading teams trending down.")
    }
    
    
    // Create items array
    var items = Object.keys(lastTenWins).map(function(key) {
        return [key, lastTenWins[key]];
    });
    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });
    //console.log(items)
    // Display first 5 teams in sorted Dictionary: LastTenWins
    for(var i = 29; i > 24; i--){
        var progress = 10 * items[i][1];
        
        const a = document.createElement('h4');
        a.setAttribute('class', 'small font-weight-bold');
        a.textContent = items[i][0];
        const b = document.createElement('span');
        b.setAttribute('class', 'float-right')
        b.textContent = items[i][1] + " - " + (10 - items[i][1]).toString()
        a.appendChild(b);
        unTrendingTeamsContainer.appendChild(a);
        
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
        unTrendingTeamsContainer.appendChild(c);
    }
}
    
unTrendingTeamsXHR.send();
        
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