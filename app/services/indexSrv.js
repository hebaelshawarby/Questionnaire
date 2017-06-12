angular.module('indexSrv', [])

myApp.factory('indexSrv', function($http,AuthToken) {
  

  var savedData={}
    var savedData1={}

    return {

      
            set:function(data){
            savedData=data;
           },
          get : function(){
             return savedData;
          },


    	 postQuestionnaire:function(data){	
        return $http.post('/Questionnaire',data).then(function(res){
        	console.log(res)
        	return res
        })
        
           },

             userRegister:function(data){  
        return $http.post('/register',data)
        
           },

       userLogin:function(data){
       return $http.post('/login',data).then(function(response){
          AuthToken.SetToken(response.data.token)
         //console.log(response)
            return response;
       });
       
       },    


IsLoggedIn: function(){

       if(AuthToken.GetToken()){
         return true;
       }else{
         return false;
       }

      },

      LogOut: function(){
        AuthToken.SetToken(); 
        console.log("logout from indexSrv")
      },


// function which return the current user
      GetCurrentUser:function(){
        if(AuthToken.GetToken()){
          console.log('i have token')
          return $http.post('/me');
        }else
        {
          $q.reject({message:"user has no token"})
        }
      }

,

      GetToken:function(){
        return AuthToken.GetToken();

      }




          }
      


    
})
.factory('AuthToken',function($window){
 return{

// set token is  a function which takes parameter token and set  it to the localSTorage of the user
   SetToken : function(token){
    if(token){

     $window.localStorage.setItem('token',token)
    }else{
     $window.localStorage.removeItem('token')

    }



   },
   // function which retrieves the token from the localStorage
   GetToken: function(){
     return $window.localStorage.getItem('token')
   }

 }

})

.factory('AuthInterceptors',function(AuthToken){
  return{

    request: function(config){
      var token= AuthToken.GetToken();
      if(token) 
        config.headers['x-access-token']= token;
      return config;

    }


  }
})


