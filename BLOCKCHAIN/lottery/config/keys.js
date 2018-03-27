// return keys depending if we are on production or development enviroment

if (process.env.NODE_ENV === 'production'){
    // return production set of keys
    module.exports = require('./prod');
} else{
    // return development keys
    module.exports = require('./dev');
}