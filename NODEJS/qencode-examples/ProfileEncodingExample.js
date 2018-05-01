const QencodeApiClient = require('qencode-api');

const apiKey = "5adb0584aa29f";
const transcodingProfiles = ["5adb0584aa43b", "5adb0584aacca", "5adb0584ab49e"];
const transferMethod = null;
const videoUrl = "https://qa.stagevids.com/static/1.mp4";
const payload = null;
const OutputPathVariables = null;


const qencodeApiClient = new QencodeApiClient(apiKey);

console.log("AccessToken: ", qencodeApiClient.AccessToken);

let task = qencodeApiClient.CreateTask();
task.StartTime = 0.01567;
task.Duration = 0.575;
console.log("Created new task: ", task.taskToken);

task.Start(transcodingProfiles, videoUrl, transferMethod, payload, OutputPathVariables);
console.log("Status URL: ", task.statusUrl);

CheckTaskStatus();

async function CheckTaskStatus(){
    while (task.GetStatus().status != "completed" && task.lastStatus.error != 1) {
        console.log(task.GetStatus().status);
        await sleep(5000);
    }     
    console.log(task.GetStatus().status);
}

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}