document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM loaded with JavaScript');
   
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBBpG_JfseI3zOmv5cqF6nHQ_za1GnIUI4",
        authDomain: "cs50finance-bce94.firebaseapp.com",
        databaseURL: "https://cs50finance-bce94.firebaseio.com",
        projectId: "cs50finance-bce94",
        storageBucket: "cs50finance-bce94.appspot.com",
        messagingSenderId: "554494982071"
    };
    firebase.initializeApp(config);

    // For each of your app's pages that need information about the signed-in user, 
    // attach an observer to the global authentication object. This observer gets called 
    // whenever the user's sign-in state changes.
    // see https://firebase.google.com/docs/auth/web/start
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            console.log("user signed in");

            // get currently signed user
            // var user = firebase.auth().currentUser;
            // if user is not signed in, there will be null
            console.log(user.email);
            console.log(user.uid);

            // this is how we add cash to user
            //user.cash = 10000;
            console.log(user.cash);

  

            // var displayName = user.displayName;
            // var email = user.email;
            // var emailVerified = user.emailVerified;
            // var photoURL = user.photoURL;
            // var isAnonymous = user.isAnonymous;
            // var uid = user.uid;
            // var providerData = user.providerData;
        } else {
            // User is signed out.
            console.log("user signed out");
        }
    });    


    // authentification - create user
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#createUserWithEmailAndPassword
    
    // var email = "newuser03@gmail.com";
    // var password = "123456"

    // firebase.auth().createUserWithEmailAndPassword(email, password)
    //     .catch(function(error) {
    //         // Handle Errors here.
    //         var errorCode = error.code;
    //         var errorMessage = error.message;
    //         if (errorCode == 'auth/weak-password') {
    //             alert('The password is too weak.');
    //         } else {
    //             alert(errorMessage);
    //         }
    //         console.log(error);
    // });    

    // after we run this, the user is created!
 


    // authentificate user with email and password
    // https://firebase.google.com/docs/auth/web/password-auth
    var email = "newuser03@gmail.com";
    var password = "123456"

    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(error);
    });

    // if no error - the user is logged



    // Read and Write Data to database
    // see https://firebase.google.com/docs/database/web/read-and-write
    // By default, read and write access to your database is restricted 
    // so only authenticated users can read or write data. 
    
    // Get a reference to the database service
    // var database = firebase.database();


    // function writeUserData(userId, name, email, imageUrl) {
    //     firebase.database().ref('users/' + userId).set({
    //         username: name,
    //         email: email,
    //         profile_picture : imageUrl
    //     });
    // }

});


