angular.module('MainController', ['formBuild','indexSrv'])
.controller('MainController',function(builder,$route,$scope,$timeout,indexSrv,$location,$rootScope) {


	if(indexSrv.IsLoggedIn()){
			console.log("success user is logged in")
			indexSrv.GetCurrentUser().then(function(data){
			console.log(data.data)
			 $scope.isuser=true;


			         });
			      }
			         else
			          {
			  console.log("user is not logged")
			  $scope.isuser=false


			    }








this.click=function(data){
console.log(data)
this.output=data;
$scope.hj=data;
$location.path('/welcome2')
$scope.FinalOutput=data;
}


this.getStart=function(){
	console.log("clik")
	$location.path('/qName');
}

this.start=function(){
	$location.path('/login');
}



this.newQuestionnaire=function(data){
	console.log(data);
	indexSrv.postQuestionnaire(data).then(function(res){

	})
	this.qName=data.title
	this.qDescription=data.description
	$location.path('/welcome');

}


this.newUser=function(data){
	indexSrv.userRegister(data).then(function(res){
		console.log(res)
		$location.path('/login')

	})
}

this.login=function(data){

		indexSrv.userLogin(data).then(function(response){
			console.log(response.data)
			 $scope.isuser=true;
			 $location.path('/userDashboard')

		


		})
	}


this.logout=function(){
		indexSrv.LogOut();
		 $scope.isuser=false;

		console.log("log")
	    $location.path('/')


	}


indexSrv.set($scope.FinalOutput)
console.log(indexSrv.get())





  
});


	
