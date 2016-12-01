app.factory('Authentication', ['$rootScope', '$firebaseAuth', '$firebaseObject', '$location',
            function($rootScope, $firebaseAuth, $firebaseObject, $location) {
  var auth = $firebaseAuth();
  var ref = firebase.database().ref();

  auth.$onAuthStateChanged(function(user) {
    $rootScope.message = '';
    if (user) {
      //console.log("logged in:" + user.uid);
      var ref = firebase.database().ref().child(user.uid);
      var syncObject = $firebaseObject(ref);
      syncObject.$bindTo($rootScope, 'currentUser');
    } else {
      $rootScope.currentUser = '';
    }
  });


  var myObject = {
    login: function(user) {
      auth.$signInWithEmailAndPassword(user.email, user.userPassword)
        .then(function(user){
        console.log('logged in:', user.uid);
        $location.path('/success');
      }).catch(function(error){
        //console.log(error);
        $rootScope.message = 'Username or password is incorrect';
      });
    },

    logout: function() {
      $rootScope.currentUser = '';
      return auth.$signOut();
    },

    requireAuth: function() {
      return auth.$requireSignIn();
    },

    register: function(userDetails) {
      auth.$createUserWithEmailAndPassword(userDetails.email, userDetails.userPassword)
          .then(function(user) {
              console.log('User ' + user.uid + ' created successfully!');
              firebase.database().ref().child(user.uid).set( {
                  date: firebase.database.ServerValue.TIMESTAMP,
                  regUser: user.uid,
                  firstname: userDetails.firstname,
                  lastname: userDetails.lastname,
                  email:  userDetails.email
              });

              myObject.login(userDetails);
          }).then(function(user) {
              console.log('Logged in as:', user.uid);
          }).catch(function(error) {
              console.error('Error: ', error);
              $rootScope.message = error.message;
          });
    } // register
  };

  return myObject;
}]); //factory
