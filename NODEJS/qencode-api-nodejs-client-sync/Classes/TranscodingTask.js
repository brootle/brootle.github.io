const querystring = require('querystring');
const StartEncodeResponse = require('../Responses/StartEncodeResponse');

class TranscodingTask {

    constructor(api, taskToken){
        this.api = api;  
        this.taskToken = taskToken;       
        this.statusUrl = null;

        this.StartTime;
        this.Duration;      
        this.lastStatus
    }    

    Start(transcodingProfile, uri, transferMethod = null, payload = null, OutputPathVariables = null){
        let parameters = {
            task_token: this.taskToken,
            uri: uri,
            profiles: transcodingProfile
        };
    
        if (transferMethod != null) {
            parameters.transfer_method = transferMethod;
        }

        if (payload != null){
            parameters.payload = payload;
        }

        if (this.StartTime > 0){ 
            parameters.start_time = this.StartTime.toFixed(4).toString();
        }

        if (this.Duration > 0) {
            parameters.duration = this.Duration.toFixed(4).toString();
        }

        if (OutputPathVariables != null){
            parameters.output_path_variables = JSON.stringify(OutputPathVariables);
        }

        let response = this.api.Request("start_encode", parameters);

        this.statusUrl = response.status_url;

        // PollStatus();

        return response;
    }


    GetStatus(){
        let parameters = {
            "task_tokens[]": this.taskToken
        };        

        let response = this.api.Request("status", parameters);

        this.lastStatus = response.statuses[this.taskToken];

        return this.lastStatus;
    }

}


module.exports = TranscodingTask;