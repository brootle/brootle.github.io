How to make React App... based on tutorial at https://facebook.github.io/react/tutorial/tutorial.html

1. Install 'create-react-app' globally and create app
    $ sudo npm install -g create-react-app
    $ create-react-app firtst-react-app

2. Go to app folder and start app
    $ cd firtst-react-app
    $ npm start

3. Delete all files in the src/ folder of the new project.

4. Add index.css to src folder and copy styles from https://codepen.io/gaearon/pen/oWWQNa?editors=0100

5. Add index.js to src folder and code from https://codepen.io/gaearon/pen/oWWQNa?editors=0010
   and add this code to the top of the code

    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';   

6. Run the app
    $ npm start


7. Also install Yarn package manager
    $ sudo npm install -g yarn
   To remove yarn
    $ sudo npm uninstall -g yarn 

8. Make new app and go to that directory
    $ create-react-app ageteller 

9. You can install bootstrap locally for a project
    $ npm install react-bootstrap --save

10. Remove 'src' folder and make empty one

11. Make 'index.js' in 'src'

12. Make 'components' folder in 'src' and make 'App.js' inside it

13. Add a link to bootstrap styles in 'index.html'

14. Make 'assets' folder in 'src' for images and so on

SECTION 5 LECTURE 19 of the tutorial

15. To install Redux
     $ npm install redux react-redux --save

16. Make 'actions', 'reducers' and 'data' folder in 'src' for our Redux app
    And get json file with data from resources and copy it to 'data' folder

17. 1st we make actions in 'action' and reducers functions in 'reducers' folder

18. Make components in 'components' folder

19. Make 'styles/index.css' inside 'src' folder and import styles in the App.js

20. Make 'assets' folder in 'src' and put background image there


=====================DEPLOYMENT==================================================
SEE https://blog.heroku.com/deploying-react-with-zero-configuration

$ heroku login
$ git init
$ heroku create -b https://github.com/mars/create-react-app-buildpack.git

$ heroku apps:rename superheroes-react
    => https://superheroes-react.herokuapp.com/

$ git add .
$ git commit -m "initial commit"
$ git push heroku master

21. SECTION 6 RecipeFinder
        $ create-react-app recipefinder
        $ npm install redux react-redux react-bootstrap react-router-dom --save   

22. Install plugin to allow Json requests from local machine
        https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi      

23. At heroku -> https://recipefinder-react.herokuapp.com      
    renamed to -> https://twitchtv-react.herokuapp.com    

24. My logingform app -> https://loginform-react.herokuapp.com   

25. Install to pass body correctly 
        $ npm install query-string --save

26. SECTION 7 Memgenerator
        $ npm install redux react-redux react-bootstrap redux-thunk --sav

        https://memegenerator-react.herokuapp.com


FREE CODE CAMP
https://markdownpreview-react.herokuapp.com/

http://largescalejs.ru/what-exactly-is-a-large-javascript-application/       

