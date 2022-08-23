var clientID = '0ystkdnbr06044vt9vahzod73l5wrm';
var clientSecret = '2xsoytpdc66lbfzfcxi6xv8kaswbk5';
var token, expiresIn, id, streamingNow

//TOKEN
var getOauth = function () {
    return fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        body: 'client_id=' + clientID + '&client_secret=' + clientSecret + '&grant_type=client_credentials',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function (res) {
            return res.json()
    }).then(function (data) {
        //console.log(data);
        token = data.access_token
        expiresIn = new Date().getTime() + (data.expires_in * 1000)
    }).catch(function (err) {
        console.log("oops ", err)
    })
};

var  getbroadcastID = function(){
    return fetch('https://api.twitch.tv/helix/users?login=jj_wiley', {
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': clientID
        }
    }).then(function (res) {
        return res.json()
    }).then(function (data) {
        //console.log(data)
        id = data.data[0].id
    });
};

var getStreamSked = function(){
    return fetch('https://api.twitch.tv/helix/schedule?broadcaster_id=' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': clientID
        }
    }).then(function (res) {
        return res.json()
    }).then(function(data) {
        //console.log(data.data.segments[0])
        sked = data.data.segments
        //console.log("start time", sked)
    }) 
};


//refactor countdown to handle array of objects
var countdown = function (upcomingStreams) { 
    console.log("strims", upcomingStreams)
    var timer, days, hours, minutes, seconds;
    
    console.log("starting out", upcomingStreams[0].start_time)
    var nextStream = upcomingStreams[0].start_time
    nextStream = new Date(nextStream); //this is converting to PDT, oops
    nextStream = new Date(nextStream.getUTCFullYear(), //PUT IT BACK
                               nextStream.getUTCMonth(),
                               nextStream.getUTCDate(),
                               nextStream.getUTCHours(),
                               nextStream.getUTCMinutes(),
                               nextStream.getUTCSeconds());
    

    nextStream = nextStream.getTime();

    if ( isNaN(nextStream) ) {
      return;
    }
  
    timer = setInterval(calculate, 1000);
  
    function calculate() {
      var dateStart = new Date();
      var dateStart = new Date(dateStart.getUTCFullYear(),
                               dateStart.getUTCMonth(),
                               dateStart.getUTCDate(),
                               dateStart.getUTCHours(),
                               dateStart.getUTCMinutes(),
                               dateStart.getUTCSeconds());

      var timeRemaining = parseInt((nextStream - dateStart.getTime()) / 1000)

      if ( timeRemaining >= 0 ) {
        days    = parseInt(timeRemaining / 86400);
        timeRemaining   = (timeRemaining % 86400);
        hours   = parseInt(timeRemaining / 3600); 
        if (hours >= 24) {
            days += 1;
            hours -= 24;
        } 
        timeRemaining   = (timeRemaining % 3600);
        minutes = parseInt(timeRemaining / 60);
        timeRemaining   = (timeRemaining % 60);
        seconds = parseInt(timeRemaining);
  
        document.getElementById("days").innerHTML    = parseInt(days, 10) + "D:";
        document.getElementById("hours").innerHTML   = ("0" + hours).slice(-2) + "H:";
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2) + "M:";
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2) + "S";
      } else {
        return;
      }
    }
  
  }

  var getStreamLive = function(){
    return fetch('https://api.twitch.tv/helix/streams?user_login=sethdrums', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Client-Id': clientID
        }
    }).then(function (res) {
        return res.json()
    }).then(function(data) {
        console.log("live streams", data.data)
        streamingNow = data.data
        //
    }) 
};

var countup = function (streamingNow) {
    //console.log(streamingNow[0].game_name)
    var hours, minutes, seconds;
    
    //find the time:
    var start_time = streamingNow[0].started_at;
    console.log(start_time);
    
    start_time = new Date(start_time); //this is converting to PDT, oops
    console.log(start_time)
    start_time = new Date(start_time.getUTCFullYear(), //PUT IT BACK
                            start_time.getUTCMonth(),
                            start_time.getUTCDate(),
                            start_time.getUTCHours(),
                            start_time.getUTCMinutes(),
                            start_time.getUTCSeconds());

    start_time = start_time.getTime();

    console.log(start_time);
    if ( isNaN(start_time) ) {
      return;
    }
  
    timer = setInterval(calculate, 1000);
  
    function calculate() {
      var dateStart = new Date();
      var dateStart = new Date(dateStart.getUTCFullYear(),
                               dateStart.getUTCMonth(),
                               dateStart.getUTCDate(),
                               dateStart.getUTCHours(),
                               dateStart.getUTCMinutes(),
                               dateStart.getUTCSeconds());

      
      
      //logic: I need to take the current time and subtract start time
      var timeRemaining = parseInt((dateStart.getTime() - start_time) / 1000)
      //console.log("time rem", timeRemaining)

      //need a "before now check"
      if ( timeRemaining >= 0 ) {
        days    = parseInt(timeRemaining / 86400);
        timeRemaining   = (timeRemaining % 86400);
        hours   = parseInt(timeRemaining / 3600); 
        if (hours >= 24) {
            days += 1;
            hours -= 24;
        } 
        timeRemaining   = (timeRemaining % 3600);
        minutes = parseInt(timeRemaining / 60);
        timeRemaining   = (timeRemaining % 60);
        seconds = parseInt(timeRemaining);
        
        //console.log("this is the hours", hours)

        document.getElementById("days").innerHTML    = parseInt(days, 10);
        document.getElementById("hours").innerHTML   = parseInt(hours);//("0" + hours).slice(-2);
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
      } else {
        return;
      }
    }
  
  }


var makeCall = function () {
    if (!expiresIn || expiresIn - new Date().getTime() < 1) {
        console.log("YO");
        getOauth().then(function () {
            getbroadcastID().then(function () {
                getStreamSked().then(function () {
                    getStreamLive().then(function () {
                        var livehide = document.getElementById("livehide");
                        var countdownColor = document.getElementById("hideylink");
                        var noworlater = document.getElementById("noworlater");
                        var recButton = document.getElementById("pulse");
                        var twitchbtn = document.getElementById("twitchbtn");
                        if (streamingNow.length > 0) {
                            countup(streamingNow);
                            console.log("theres's a stream now")
                            //change color of coundown to red, and set to 0's
                            //countdown is whole counter. needs to be entirely red
                            //noworlater is word. 'NOW' for this secttion                     
                            livehide.style.display = "none";
                            recButton.style.display = "block";
                            //livehide.style = "color: rgba(255, 0, 0, 0) !important"
                            countdownColor.style = "color: rgb(255, 0, 0) !important"
                            noworlater.innerHTML = "STREAMING NOW!"
                            twitchbtn.innerHTML = "LIVE NOW ON TWITCH"
                        }
                        else {
                            console.log("NO stream! Coundown!")
                            //countdown is whole counter. needs to be entirely white
                            //noworlater is word. 'LATER' for this secttion
                            livehide.style.display = "block";
                            recButton.style.display = "none";
                            countdownColor.style = "color: rgb(255, 255, 255) !important"
                            noworlater.innerHTML = "NEXT STREAM: "
                            noworlater.style = "margin-right: 10px;"
                            //coundown to next stream
                            countdown(sked)
                        }
                    });
                    
                });
            });
            return;
        })
    } else{
        getbroadcastID().then(function() {
            getStreamSked().then(function () {
                getStreamLive().then(function () {
                    if (streamingNow .length > 0) {
                        console.log("theres's a stream now")
                    }
                    else {
                        console.log("NO stream! Coundown!")
                        countdown(sked)
                    }
                });
            });
        });
    }; 
};



makeCall();
//countdown();