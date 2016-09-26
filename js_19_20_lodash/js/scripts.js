$(function () {

    function RequestData() {

        $.getJSON("https://brootle.github.io/js_19_20_lodash/data.json")
        .done(function (data, textStatus, jqXHR) {

            // we put data to localStorage so we can work with it on local machine
            localStorage.setItem('users', JSON.stringify(data));

        })
         .fail(function (jqXHR, textStatus, errorThrown) {

             // log error to browser's console
             console.log(errorThrown.toString());
         });
    }

    RequestData();

    var users = localStorage.getItem('users'); // get JSON formatted string from local storage

    users = JSON.parse(users); // convert JSON format string to JavaScript object   

    console.log(users); 
    
    /////////////////////////////////////////////////////////////////////////////////
    // get all skills and add then to new array with uniq and sorted skills
    var skills = _.mapValues(users, 'skills');
    var skillsList = []; 

    _.forOwn(skills, function(value, key) {
        skillsList = _.concat(skillsList,value);
    });

    skillsList = _.sortBy(_.uniq(skillsList));
    console.log(skillsList);
    //////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////////
    // get list of users sorted by amount of friends
    var usersByFriends = new Object;
    usersByFriends = _.sortBy(users, [function(o) { return o.friends.length; }]);
    //console.log(usersByFriends); // print new sorted Object
    var usersByFriendsList = [];
    usersByFriendsList = _.toArray(_.mapValues(usersByFriends, 'name'));
    console.log(usersByFriendsList);
    ///////////////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////////
    // get all names of friends
    var friendsNames = _.mapValues(users, 'friends');
    var friendsNamesList = []; 

    _.forOwn(friendsNames, function(value, key) {
        friendsNamesList = _.concat(friendsNamesList, (_.values(_.mapValues(value, 'name'))));
    });    

    friendsNamesList = _.sortBy(_.uniq(friendsNamesList));
    console.log(friendsNamesList);
    ///////////////////////////////////////////////////////////////////////////////////
});