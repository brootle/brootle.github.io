const app = require('express')();
const server = require('http').Server(app);

app.get('/', function (req, res) {
  //res.sendFile(__dirname + '/index.html');

    res.send({
        message:"hello"
    });  

});


// port is assigned dinamically by heroku, so it can be different all the time
// in the development process.env.PORT is not defined so we assign 8080 manually
const PORT = process.env.PORT || 8080

server.listen(PORT, function () {
  console.log(`app listening on port ${PORT}! if locally, that's at http://localhost:8080/`)
});


