app.controller('grupos-controller',['$scope','$http','$window','$ngConfirm','dticservice', function ($scope,$http,$window,$ngConfirm,dticservice) {

$scope.pesquisa={};


	identificarPesquisa();
	
	
	function identificarPesquisa(){
		var url = window.location.href;
		var arguments = url.split('?')[1].split('=');
		arguments.shift();
	

		$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/pesquisa/id?id='+arguments).then(function(data){
			$scope.pesquisa=data.data;	
			$window.sessionStorage.setItem('pesquisa',JSON.stringify($scope.pesquisa));	
			consultarGruposPesquisa();			
		});
	};


	function consultarGruposPesquisa(){
		
		$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/grupos/pesquisa?id='+$scope.pesquisa.id).then(function(data){
			$scope.grupos=data.data;
		});
	};	         

}]);
