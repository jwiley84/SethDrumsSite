var APIKey = 'AIzaSyDRCZVlAfT9XHp9_33MBhpsizIXg8hz0LE';

var authenticate = function() {
    return fetch('https://youtube.googleapis.com/youtube/v3/search?part=snippet%2C%20id&channelId=UC72TYpCmFqUOrH_XiypPx7g&maxResults=4&order=date&key=' + APIKey, {
    }).then((res) => {
        return res.json()
    }).then((data) => {
        let videos = data.items;
        let videoContainer = document.querySelector(".youtube-container")
        for (video of videos) {
            console.log(video.snippet)
            let vid = video.id.videoId;
            let url = video.snippet.thumbnails.high.url;
            videoContainer.innerHTML += '<a href="https://www.youtube.com/watch?v=' + vid + '"><img class="ytvids img-fluid" src="'+ url + '"></a>'
        }
    });
    
}

authenticate();