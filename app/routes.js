var myApp = angular.module('appRoutes',['ngRoute'])


.config(function($routeProvider) {
  $routeProvider

  // route for the landingPage page
    .when('/', {
    templateUrl: 'views/dashboard.html',
    controller: 'MainController',
    controllerAs: 'MainController'
               })

        .when('/register', {
    templateUrl: 'views/register.html',
    controller: 'MainController',
    controllerAs: 'MainController'
               })
    .when('/userHomePage', {
    templateUrl: 'views/userHomePage.html',
    controller: 'MainController',
    controllerAs: 'MainController'
               })    

   .when('/welcome2',{

  templateUrl:'views/welcome2.html'

  })

   
 .when('/userDashboard', {
    templateUrl: 'views/userDashboard.html',
    controller: 'MainController',
    controllerAs: 'MainController'
               })
  .when('/welcome',{

    templateUrl:'views/welcome.html',
   

    })
  .when('/login',{

    templateUrl:'views/login.html',
   


    })
  .when('/register2',{

    templateUrl:'views/register2.html',
   

    })
   .when('/qName',{

    templateUrl:'views/qName.html'   

    })
  
    .otherwise({
    redirectTo: "/"
  });

    
  

});
