SOCKET + REACT + NODE
BASED ON https://www.valentinog.com/blog/socket-react/

INITIAL SETUP AND DEPLOYMENT

1. $ npm init
2. $ npm install axios express socket.io --save
4. Make .gitignore file and add 'node_modules' there

5. Make app.js and add "start": "node app.js" to package.json file

6. To start app
    $ npm run start

7. $ git add .
8. $ git commit -m "initial commit"

9.  $ heroku login
10. $ heroku create

    TO RENAME
    $ heroku apps:rename srn-weather
    
   -> https://srn-weather.herokuapp.com/

11. $ git push heroku master

12. Check logs at heroku side
    $ heroku logs