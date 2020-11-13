ls = window.localStorage;
url = window.location.href;

var contas = JSON.parse(ls.getItem("contas"));
if(contas == null){
	contas = [];
}
var user = parseInt(JSON.parse(ls.getItem("user")));


$(document).ready(function(){
	funcaoClique();
});


function funcaoClique(){
	//REDIRECIONAR//
	$("#bRediCadastro").click(function(){
		window.location.href = "cadastro.html";
	});
	$("#bRediLogin").click(function(){
		window.location.href = "login.html";
	});
	$("#bRediPagPrincipal").click(function(){
		window.location.href = "index.html";
	});



	//FUNCOES CADASTRO-LOGIN//
	$("#bCadastro").click(function(){
		var form = ["#iNome", "#iData", "#iEstado", "#iSenha", "#iConSenha"]

		for(var cont = 0; cont < 5; cont++){
			$(form[cont]).removeClass("erro-cadastro");
		}
		$("#textoErro").html("");

		var testeCadastro = true;
		var aux = [];

		aux.push($(form[0]).val());
		aux.push($(form[1]).val());
		aux.push($(form[2]).val());
		aux.push($(form[3]).val());
		aux.push($(form[4]).val());

		for(var cont = 0; cont < 5; cont++){
			if(aux[cont] == ""){
				testeCadastro = false;
				$(form[cont]).addClass("erro-cadastro");
				$("#textoErro").html("FORMULARIO INCOMPLETO!");
			}
		}
		if(aux[3] != aux[4]){
			testeCadastro = false;
			$(form[4]).addClass("erro-cadastro");
			$(form[4]).val("");
			if($("#textoErro").html() == ""){
				$("#textoErro").html("CONFIRMAÇÃO INCORRETA!");
			}
		}
		
		for(var cont = 0; cont < contas.length; cont++){
			if(aux[0] == 1){
				if($("#textoErro").val() == ""){
					$("#textoErro").html("USUÁRIO JÁ CADASTRADO!");
				}
			}
		}

		if(testeCadastro){
			contas.push(aux);
			ls.setItem("contas", JSON.stringify(contas));
		}
	});
	$("#bLogin").click(function(){
		var form = ["#iNome", "#iSenha"];

		for(var cont = 0; cont < 2; cont++){
			$(form[cont]).removeClass("erro-cadastro");
		}
		$("#textoErro").html("");

		var aux = [];

		aux.push($(form[0]).val());
		aux.push($(form[1]).val());

		for(var cont = 0; cont < 2; cont++){
			if(aux[cont] == ""){
				$(form[cont]).addClass("erro-cadastro");
				$("#textoErro").html("FORMULARIO INCOMPLETO!");
			}
		}

		for(var cont = 0; cont < contas.length; cont++){
			if(aux[0] == contas[cont][0] && aux[1] == contas[cont][3]){
				ls.setItem("user", JSON.stringify(cont));
				window.location.href = "index.html";
				break;
			}
			if(cont == (contas.length - 1)){
				if($("#textoErro").html() == ""){
					$("#textoErro").html("USUÁRIO/SENHA INCORRETOS!");
					for(var i = 0; i < 2; i++){
						$(form[i]).addClass("erro-cadastro");
					}
					return;
				}
			}
		}
	});
}