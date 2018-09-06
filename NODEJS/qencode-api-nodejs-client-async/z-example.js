const QencodeApiClient = require('./QencodeApiClient.js');

const apiKey = "5adb0584aa29f";
const transcodingProfile = "5adb0584aa43b";
const transferMethod = null;
const videoUrl = "https://qa.stagevids.com/static/1.mp4";


const qencodeApiClient = new QencodeApiClient(apiKey);

qencodeApiClient.post(qencodeApiClient.Request("access_token"))
    .then(function (response) {
        console.log(response);
        // POST succeeded...
        qencodeApiClient.AccessToken = response.token;
        console.log(qencodeApiClient.AccessToken);
        

        // creating task
        qencodeApiClient.post(qencodeApiClient.Request("create_task"))
            .then(function(response){
                console.log(response);

                // start encode
                qencodeApiClient.taskToken = response.task_token;
                qencodeApiClient.uri = videoUrl;
                qencodeApiClient.profiles = transcodingProfile;    

                qencodeApiClient.post(qencodeApiClient.Request("start_encode"))
                    .then(function(response){
                        console.log(response);
                        // now we can start a loop to get status of encoding process
                    })
                    .catch(function(err){
                        console.log(err);
                    })

            })
            .catch(function(err){
                 console.log(err);
            })
   

    })
    .catch(function (err) {
        // POST failed...
        console.log(err);
    });
