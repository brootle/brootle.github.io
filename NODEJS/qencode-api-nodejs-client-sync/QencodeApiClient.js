
const request = require('sync-request');
const FormData = require('form-data');
const querystring = require('querystring');

const TranscodingTask = require('./Classes/TranscodingTask');

class QencodeApiClient {

    constructor(key){
        this.Key = key;
        this.AccessToken = null;
        this.url = "https://api-qa.qencode.com/";
        this.version = "v1";
        this.USER_AGENT = "Qencode PHP API SDK 1.0";
        this.ConnectTimeout = 20;
        this.lastResponseRaw = null;
        this.lastResponse = null;    
        this.getAccessToken();
    }    


    getAccessToken(){
        let response = this.Request("access_token", {api_key: this.Key });
        this.AccessToken = response.token;
    }

    CreateTask(){
        let response = this.Request("create_task", {token: this.AccessToken });
        return new TranscodingTask(this, response.task_token);;
    }

    Request(path, parameters){

        // convert parameters to string like 'api_key=5adb0584aa29f'
        parameters = querystring.stringify(parameters);   

        let response = request(
            'POST', 
            `https://api-qa.qencode.com/v1/${path}`,
            {
                headers: {'content-type': 'application/x-www-form-urlencoded'},                
                body: parameters
            }
        );

        response = JSON.parse(response.getBody('utf8'));        

        return response;  
    }

}


module.exports = QencodeApiClient;