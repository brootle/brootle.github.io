'use strict';

// return keys depending if we are on production or development enviroment

if (process.env.NODE_ENV === 'production') {
    // return production set of keys
    module.exports = require('./prod');
} else {
    // return development keys
    module.exports = require('./dev');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbmZpZy9rZXlzLmpzIl0sIm5hbWVzIjpbInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm1vZHVsZSIsImV4cG9ydHMiLCJyZXF1aXJlIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVBLElBQUksUUFBUSxBQUFSLElBQVksQUFBWixhQUF5QixBQUE3QixjQUEwQyxBQUN0QztBQUNBO1dBQU8sQUFBUCxVQUFpQixRQUFRLEFBQVIsQUFBakIsQUFDSDtBQUhELE9BR00sQUFDRjtBQUNBO1dBQU8sQUFBUCxVQUFpQixRQUFRLEFBQVIsQUFBakIsQUFDSCIsImZpbGUiOiJrZXlzLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL2FsZXgvYnJvb3RsZS5naXRodWIuaW8vQkxPQ0tDSEFJTi9raWNrc3RhcnQifQ==