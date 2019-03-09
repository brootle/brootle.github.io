Based on https://www.udemy.com/react-redux-tutorial

1. Install redux
    $ npm install redux react-redux --save

2. Make components
3. All test for Jest will be inside __tests__ folder

4. Install enzyme to test if componets are present inside other components
    $ npm install enzyme enzyme-adapter-react-16 --save

   enzyme enzyme-adapter-react-16 where 16 is same version of current react "react": "^16.8.2"
   so number changes depending on react version

   make setupTests.js in scr folder to configure Enzyme, when Jest stars that file 
   will be 1st to load and execute

   https://airbnb.io/enzyme/docs/api/

5. Make .env file in the root of the project and put absolute path NODE_PATH=src/
   so instead of 
        import App from '../App';
   we can do 
        import App from 'components/App';
   update all imports from relative to absolute paths

6. Use redux for comments https://www.udemy.com/react-redux-tutorial/learn/v4/t/lecture/10467032?start=0

    Make Reducers in src/reducers/
    and wrap App inside Provider with reducers as props, see src/index.js
    
    Make Actions

7. Wire up action creator to src/components/CommentBox.js

8. Make Root.js component that be actually redux Provider and used as a wrapper
   for other components passed to it as children, incliding App component and so on.
   We do it, so we can use it in tests as well

9. Now we can wrap CommentBox component in tests inside <Root> component

10. Test Reducers in src/reducers/__tests__

11. Test Actions in src/actions/__tests__

12. Finnish CommentList component, see src/components/CommentList.js

13. Now test it in CommentList.test.js

14. Testing HTTP requests. 
    We use this service https://jsonplaceholder.typicode.com/
    Install several libs for asynct http with redux
    $ npm install axios redux-promise moxios --save

15. Import reduxPromise and applyMiddleware in Root.js

16. Add FETCH_COMMENTS to actions/types.js
    and import it in actions/index.js
    and add new action creator there fetchComments
    and we will use axios to fetch comments from https://jsonplaceholder.typicode.com/

17. Add 'fetch comments' button to components/CommentBox.js
    and attach on click fetchComments function from actions which is available in props
    as we used redux connect function to connect to our component
    Add new case to reducers/comment.js to handle new action type FETCH_COMMENTS

18. What we did before was "UNIT TESTS" testing small parts
    Now we need to make "INTEGRATION TEST" that will test a lof of stuff in our app:
    button, reducer, action in same place
    so make 'src/__tests__/integrations.test.js' for all integrations tests

19. We use moxios to immitate succesfull response to http request in Jest testing enviroment