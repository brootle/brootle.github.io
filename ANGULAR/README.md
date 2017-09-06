BASED on https://www.udemy.com/angular-2-tutorial-for-beginners

1. Install TypeScript
    $ sudo npm install -g typescript
    It will be at /usr/lib/node_modules/typescript/bin/tsc 

2. Install Typings module
    $ sudo npm install -g typings
    It will be at /usr/lib/node_modules/typings/dist/bin.js 

3. Unzip angular2-seed.zip to root folder instead of creating app by Angular command
    see https://www.udemy.com/angular-2-tutorial-for-beginners/learn/v4/t/lecture/4304626?start=0

4. Install dependencies
    $ npm install

5. Start the app
    $ npm start
    this will run commands in package.json -> "start": "concurrent \"npm run tsc:w\" \"npm run lite\" ",

    App will be started at http://localhost:3000/

6. Create new component in 'app' folder -> courses.component.ts

7. Create service to get data from server -> courses.service.ts