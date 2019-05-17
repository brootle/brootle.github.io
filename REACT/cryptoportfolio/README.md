based on https://habrahabr.ru/post/198632/

INITIAL SETUP AND DEPLOYMENT

1. $ npm init
2. $ npm install express --save
3. Make .gitignore file and add 'node_modules' there

4. Make app.js and add "start": "node app.js" to package.json file

5. $ git add .
6. $ git commit -m "initial commit"

7.  $ heroku login
8. $ heroku create

9. $ git push heroku master

    TO RENAME
    $ heroku apps:rename crypto-portfolio
    
   -> https://crypto-portfolio.herokuapp.com/

10. Check logs at heroku side
    $ heroku logs


CLIENT SIDE SETUP


