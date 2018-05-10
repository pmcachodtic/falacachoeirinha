app.controller('registro-controller',['$scope','$http','$window','$ngConfirm','dticservice', function ($scope,$http,$window,$ngConfirm,dticservice) {


	$scope.bairros=[];

	consultarBairros();

	function consultarBairros(){
		$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/bairros/pesquisa').then(function(data){
			$scope.bairros=data.data;
		});
	};

	$scope.contribuinte={};

	$scope.localizarContribuinte=function(){
		$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/contribuinte/cpf?cpf='+$scope.contribuinte.cpf).then(function(data){
			if(data.data){
				$scope.contribuinte=data.data;
			}
		});
	};


	$scope.acessar=function(){
		if($scope.contribuinte.confirmar){
			if($scope.contribuinte.cpf){
				if($scope.contribuinte.nome){
					if($scope.contribuinte.email){
						if($scope.contribuinte.idade){
							if($scope.contribuinte.sexo){
								if($scope.contribuinte.formacao){	
									if($scope.contribuinte.bairro){	

										$http.post('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/criar/contribuinte',$scope.contribuinte).then(function(data){
											$window.sessionStorage.setItem('contribuinte',JSON.stringify(data.data));
											$window.location.href="pesquisas.html";
										});
									}else{
										dticservice.mensagem("Informe seu bairro!",$scope,$ngConfirm);
									}
								}else{
									dticservice.mensagem("Informe sua formação!",$scope,$ngConfirm);
								}	
							}else{
								dticservice.mensagem("Informe o sexo!",$scope,$ngConfirm);
							}	
						}else{
							dticservice.mensagem("Informe sua idade!",$scope,$ngConfirm);
						}

					}else{
						dticservice.mensagem("Informe seu e-mail!",$scope,$ngConfirm);
					}
				}else{
					dticservice.mensagem("Informe seu nome!",$scope,$ngConfirm);
				}
			}else{
				dticservice.mensagem("Informe seu cpf!",$scope,$ngConfirm);
			}
		}else{
			dticservice.mensagem("Confirme que concorda com o sigilo e veradicade dos dados informados!",$scope,$ngConfirm);
		}
	};


}]);