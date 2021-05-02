// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

// Pie Chart Example
var ctx = document.getElementById("east-west-pie");
var eastRecord = 0
var westRecord = 0

// Grabbing Data
const xhrr = new XMLHttpRequest();
  
  xhrr.withCredentials = true;

  xhrr.onload = function () {
    data = JSON.parse(this.response);
    if (xhr.status >= 200 && xhr.status < 400) {
			data.api.standings.forEach(standings => {

				if(standings.conference.name == "west" /*|| games.conference.name == "west"*/){
          eastRecord += Number(standings.win) - Number(standings.conference.win)
				}
				if(standings.conference.name == "east"){
          westRecord += Number(standings.win) - Number(standings.conference.win)
				}
			});
		} else {
			const errorMessage = document.createElement('marquee');
			errorMessage.textContent = `Gah, it's not working!`;
			app.appendChild(errorMessage);
		}
    





    var myPieChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["East", "West"],
        datasets: [{
          data: [eastRecord, westRecord],
          backgroundColor: ['#4e73df', '#e74a3b'],
          hoverBackgroundColor: ['#2e59d9', '#e74a4c'],
          hoverBorderColor: "rgba(234, 236, 244, 1)",
        }],  
      },  
      options: {
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
        },  
        legend: {
          display: false
        },  
        cutoutPercentage: 80,
      },  
    });  
  }
  
  xhrr.send(data);