app.service('dticservice',function(){
	var login=[];
	var usuario={};
	return {
		mensagem: function (mensagem,scope,ngConfirm){
			scope.mensagem=mensagem;
			ngConfirm({
				animation:'top',
				animationBounce: 3,
				title: 'Mensagem do Sistema',  
	            columnClass:'col-md-8 col-md-offset-2',          
	            content: '<div class="row">'+
		            	'<div class="col-sm-12 col-md-12">'+
		            			'{{mensagem}}'+
		            	'</div>'+	
		            	'<div class="col-sm-12 col-md-12">'+
	                            '<hr/>'+
	                    '</div>'+            	
	            	'</div>',            	
	            theme:'dark',
	            scope: scope,
	            buttons:{
	                ok: {
		                    text: '<i class="fa fa-check"></i>&nbsp;OK',
		                    btnClass: 'btn-blue',
		                    action: function(scope, button){
		                    	
		                    }
	               		}
	               	
	               	}
	           	
			});
		},
		diasNoMes:function (ano,mes){
    		/*COMO USAR A FUNÇÃO:
   		 	1 - A função retorna sempre os dias do mês anterior ao solicitado. Para tanto, informa-se o ano corrente do cálculo, o mês + 1 e o dia sempre em 0*/    
        	return new Date(ano, mes, 0).getDate();
    	},
    	getContribuinte:function(window){
    		return JSON.parse(window.sessionStorage.getItem('contribuinte'));
    	},
    	confirmacao:function (mensagem,url,scope,ngConfirm,window){
	        scope.mensagem=mensagem;
	        ngConfirm({
	            title: 'Mensagem do Sistema',  
	            columnClass:'col-md-8 col-md-offset-2',          
	            content: '<div class="row">'+
	                    '<div class="col-sm-12 col-md-12">'+
	                            '{{mensagem}}'+
	                    '</div>'+       
	                    '<div class="col-sm-12 col-md-12">'+
	                            '<hr/>'+
	                    '</div>'+                   
	                '</div>',               
	            theme:'dark',
	            scope: scope,
	            buttons:{
	                ok: {
	                        text: '<i class="fa fa-check"></i>&nbsp;OK',
	                        btnClass: 'btn-blue',
	                        action: function(scope, button){	                        	
	                            window.location.href=url;
	                        }
	                    }
	                
	                }
	            
	        });
    	},
    	
    	getLogin:function(window){
    		return JSON.parse(window.sessionStorage.getItem('login'));
    	},
    	localizarServidor:function(obj,http){
			
			var usuario_oracle={};			
		
			http.get('http://sistemas.cachoeirinha.rs.gov.br/pmcachoServices/consultarmatricula?matricula='+obj.matricula).then( 						
				function (data){
					usuario_oracle=data.data;				
					usuario.nome=usuario_oracle.nome;			
					usuario.cpf=usuario_oracle.cpf;	


					if(usuario.cpf.length<14){
						while(usuario.cpf.length<11){
							usuario.cpf='0'+usuario.cpf;
						};

						usuario.cpf=usuario.cpf.substring(0,3)+'.'+usuario.cpf.substring(3,6)+'.'+usuario.cpf.substring(6,9)+'-'+usuario.cpf.substring(9,11);

						obj.nome=usuario.nome;
						
					};
				}
			);

			
		},
		gerarRelatorio:function (url,nome,http){				
			
			http.get(url,{responseType:'arraybuffer'}).then(function (data) {

			    var file = window.URL.createObjectURL(new Blob([data.data]));
			    var a = document.createElement("a");
		        a.href = file;
		        a.download =  nome;
		        document.body.appendChild(a);
		        a.click();
		        
		        window.onfocus = function () {                     
		          document.body.removeChild(a)
		        }	 
			});					

		},
		toDate(data){
			 var date = new Date(data)
            var userTimezoneOffset = date.getTimezoneOffset() * 60000;
            return new Date(date.getTime() + userTimezoneOffset);
		}

	};
});