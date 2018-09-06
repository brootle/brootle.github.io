// const AccessTokenResponse = require('./Responses/AccessTokenResponse.js');

const request = require('request');
const requestPromise = require('request-promise');

// const fetch = require ('node-fetch');
// const FormData = require ('form-data');


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
        this.post = requestPromise.post;

        this.taskToken,
        this.uri,
        this.profiles
    }    

    Request(method){
        let form;

        if(method == "access_token"){
            form = { api_key: this.Key };
        }

        if(method == "create_task"){
            form = { token: this.AccessToken };
        }        

        if(method == "start_encode"){
            form = { 
                task_token: this.taskToken,
                uri: this.uri,
                profiles: this.profiles 
            };
        }          

        return {
            url:`${this.url}${this.version}/` + method, 
            form: form,
            json: true            
        }      
    }

    // getAccessToken(){

    //     request.post({
    //         url:`${this.url}${this.version}/access_token`, 
    //         form: { api_key: this.Key }}, 
    //         function (err, response, data) {
    //             if (err) {
    //                 return console.error('Error: ', err);
    //             }
    //             data = JSON.parse(data);
    //             this.AccessToken = data.token;
    //             console.log("AccessToken: ", this.AccessToken);
    //     });  

    // }

    static CreateTask(){

    }


}


module.exports = QencodeApiClient;