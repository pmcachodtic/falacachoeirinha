app.controller('pesquisa-controller',['$scope','$http','$window','$ngConfirm','dticservice', function ($scope,$http,$window,$ngConfirm,dticservice) {

	$scope.pesquisas=[];

	$scope.pesquisa={};	

	$scope.pesquisa.questoes=[];

	listar();

	function listar(){
		$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/pesquisa/ativas').then(function(data){
			$scope.pesquisas=data.data;






		});
	};




}]);