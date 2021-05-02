const headline_div = document.getElementById('headline');
        
var counter = 1;
 
var request = new XMLHttpRequest();

request.onload = function () {
    var data = JSON.parse(this.response);
    
    if (request.status >= 200 && request.status < 400) {

        data.forEach( headlines => {
            $('#Title' + counter.toString()).append(headlines.Title);

            $('.Content' + counter.toString()).append(headlines.Content);
            
            $('.Updated' + counter.toString()).append( Date(headlines.Updated));
            
            $('.OriginalSource' + counter.toString()).append(headlines.OriginalSource);

            counter++;
        });
    } else {
        console.log("Error loading headlines."); // hello
    }

    $( function() { $( "#headline" ).accordion(); });

}
request.send()
