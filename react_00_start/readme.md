Setup React, see https://www.codecademy.com/articles/react-setup-i

1. Create package.json by running npm init
    $ npm itit

2. Install react module
    $ npm install --save react

   Now the app can access react like
    var React = require('react')

3. Install react-dom
    $ npm install --save react-dom

4. Install babel 
    $ npm install babel-loader babel-core babel-preset-es2015 webpack --save-dev

5. Make babel config file ".babelrc" and put this in the file
    { presets: ['react'] }

6. Instal webpack-dev-server and html-webpack-plugin for development
    $ npm install webpack-dev-server html-webpack-plugin --save-dev

7. Make webpack.config.js in the rood directory and put this in there

    var HTMLWebpackPlugin = require ('html-webpack-plugin');
    var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
        template: __dirname + '/app/index.html',
        filename: 'index.html',
        inject: 'body'
    });

    module.exports = {
        entry: __dirname + '/app/index.js',
        module: {
            loaders: [{
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }]
        },
        output: {
            filename: 'transformed.js',
            path: __dirname + '/build'
        },
        plugins: [HTMLWebpackPluginConfig]
    };

8. Don't forget to add gitignore file

9. Add scripts to package.json inside 'scripts', see https://www.codecademy.com/articles/react-setup-v
    "scripts": {
        "build": "webpack",
        "start": "webpack-dev-server"
    },

10. Inside of your root directory, create a new directory named app. Create two 
    new files inside of app: app/index.js and app/index.html.

11. Inside of the app folder, create a new folder named components. Create a new 
    file inside of app/components named app/components/App.js. And put any 
    component class there

12. To build the app run this command
     $ npm run build
    Everything will be converted to normal html and JavaScript and you can find it in 'build' folder

13. To start server run
     $ npm run start
    And react app will be available here http://localhost:8080/