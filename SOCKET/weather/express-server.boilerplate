var express = require("express");

var app = express();

app.get('/', function (req, res) {        
    res.send({
        message:"hello"
    });
});

const PORT = process.env.PORT || 8080

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}! if locally, that's at http://localhost:8080/`)
});
