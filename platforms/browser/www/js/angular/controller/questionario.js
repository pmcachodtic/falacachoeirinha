app.controller('questoes-controller',['$scope','$http','$window','$ngConfirm','dticservice','$sce', function ($scope,$http,$window,$ngConfirm,dticservice,$sce) {

	$scope.pesquisa={};

	$scope.questoes=[];

	$scope.$sce=$sce;

	identificarPesquisa();



	function questoes(q,contribuinte,area){
			
		
			/*Primeiro, tenta buscar as respostas anteriores do tiozinho:*/
			$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/respostas?cpf='+contribuinte.cpf+'&questao='+q.id).then(function(data){
				var questao={};
				
				if(data.data){

					questao=data.data;

				}else{	

					questao={cpf:contribuinte,questao:q};								

				}
				

				$scope.questoes.push(questao);
			});						
		
	};


	function identificarPesquisa(){
			var url = window.location.href;
			var arguments = url.split('?')[1].split('=');
			

			var area= arguments[1];
			area=parseInt(area.replace('[','').replace(']','').replace('"',''));


			var p=JSON.parse($window.sessionStorage.getItem('pesquisa'));
			

			$http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/consultar/questoes/pesquisa?pesquisa='+p.id+'&grupo='+area).then(function(data){
				var quest=data.data

				var contribuinte=dticservice.getContribuinte($window);

				for(i in quest){					
					var q=quest[i];										

					questoes(q,contribuinte,area);
				};

			});
	};



	$scope.registrar=function(){

		$http.post('http://sistemas.cachoeirinha.rs.gov.br/pmcachoSocialQuiz/criar/respostas',$scope.questoes).then(function(data){
			if(data.data){
				dticservice.confirmacaoHTML('Resposta enviada!<p>Obrigado por participar de nossa pesquisa!</p><p>Apoveite para responder sobre outro tópico!</p>','categorias.html',$scope,$ngConfirm,$window);
			}
		});
		
	};


	$scope.clicarOPT=function($event){
	
		if($event.currentTarget.nodeName=="LI"){					
		 	$($event.currentTarget).find('INPUT').prop("checked",true);
		}else{
		 	$($event.currentTarget).parent().find('INPUT').first().prop("checked",true);
		}
	};



}]);
