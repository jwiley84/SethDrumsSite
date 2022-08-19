var clientID = '0ystkdnbr06044vt9vahzod73l5wrm';
var clientSecret = '2xsoytpdc66lbfzfcxi6xv8kaswbk5';
var token, expiresIn, id, sked

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
        sked = data.data.segments[0].start_time
        console.log(sked)
    })
};

var countdown = function (nextStream) {
    var timer, days, hours, minutes, seconds;
  
    nextStream = new Date(nextStream);
    
    nextStream = nextStream.getTime();
    //console.log("wait", nextStream)

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
        // console.log(dateStart);
        console.log(nextStream)
      var timeRemaining = parseInt((nextStream - dateStart.getTime()) / 1000)
        // console.log(timeRemaining)
      if ( timeRemaining >= 0 ) {
        days    = parseInt(timeRemaining / 86400);
        timeRemaining   = (timeRemaining % 86400);
        hours   = parseInt(timeRemaining / 3600) + 7; //this will need to be manually set for seth's timezone until I can fix it
        timeRemaining   = (timeRemaining % 3600);
        minutes = parseInt(timeRemaining / 60);
        timeRemaining   = (timeRemaining % 60);
        seconds = parseInt(timeRemaining);
  
        document.getElementById("days").innerHTML    = parseInt(days, 10);
        document.getElementById("hours").innerHTML   = ("0" + hours).slice(-2);
        document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
        document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
      } else {
        return;
      }
    }
  
    //function display(days, hours, minutes, seconds) {}
  }


var makeCall = function () {
    if (!expiresIn || expiresIn - new Date().getTime() < 1) {
        console.log("YO");
        getOauth().then(function () {
            getbroadcastID().then(function () {
                getStreamSked().then(function () {
                    countdown(sked)
                });
            });
            return;
        })
    } else{
        getbroadcastID().then(function() {
            getStreamSked().then(function () {
                countdown(sked)
            });
        });
    }; 
};



makeCall();
countdown();



