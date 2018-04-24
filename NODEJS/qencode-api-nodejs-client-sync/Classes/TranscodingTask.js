const querystring = require('querystring');
const StartEncodeResponse = require('../Responses/StartEncodeResponse');

class TranscodingTask {

    constructor(api, taskToken){
        this.api = api;  
        this.taskToken = taskToken;       
        this.statusUrl = null;

        this.StartTime;
        this.Duration;      
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

        // if (OutputPathVariables.Count > 0){
        //     var outputPathVars = JsonConvert.SerializeObject(OutputPathVariables,
        //         Formatting.None,
        //         new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
        //     parameters.Add("output_path_variables", outputPathVars);
        // }

        // var response = api.Request<StartEncodeResponse>("start_encode", parameters) as StartEncodeResponse;
        // this.statusUrl = response.status_url;
        // PollStatus();
        // return response;

        console.log(parameters);

        let response = this.api.Request("start_encode", parameters);

        this.statusUrl = response.status_url;

        return response;
    }

}


module.exports = TranscodingTask;