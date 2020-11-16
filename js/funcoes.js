<<<<<<< HEAD
var globalOpinioes = []; //criação de array

$(document).ready(function(){
	
	fLocalEventosClickOpinioes();

});

function fLocalEventosClickOpinioes(){
	
	$("#bAddDepoimento").click(function(){
		var descOpinioes = $("#tDepoimento").val();
		globalOpinioes.push(descOpinioes);
		mostraLista();
		
	});
}

function mostraLista(){
	
	$("#lOpinioes").html("");
	for(var i = 0; i < globalOpinioes.length; i++){
		$("#lOpinioes").append((i+1) + ": " + globalOpinioes[i] + "<br>");
	}
}

	
=======
ls = window.localStorage;
url = window.location.href;

//Itens localStorage//
var contas = JSON.parse(ls.getItem("contas"));
if(contas == null){
	contas = [];
}
var user = JSON.parse(ls.getItem("user"));

var car = parseInt(JSON.parse(ls.getItem("carrinho")));

//Teste usuario logado//
var testePag = window.location.href.slice(window.location.href.lastIndexOf("/")+1)
if(user != null && (testePag == "cadastro.html" || testePag == "login.html")){
	window.location.href = "../index.html";
}


$(document).ready(function(){
	prepararPagina();
	funcaoClique();
});


function prepararPagina(){
	if(user != null){
		usu = parseInt(user);
		var capt = contas[usu][0].charAt(0).toUpperCase() + contas[usu][0].slice(1);
		$("#meioPagIndex").html('<h1 class="mensagem-cativante">Seja bem vindo,<br>'+ capt +'!</h1>');
		$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="img/iconeBusca.png"></button>');
		$("#dIcones").append('<button class="b-icones"><img src="img/iconeCarrinho.png"></button>');
		$("#dIcones").append('<button class="b-icones" id="bUser"><img src="img/iconePessoa.png"></button>');
	}
	else{
		if(testePag == "cadastro.html" || testePag == "login.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
		}
		else{
			$("#fraseCati").html("Busque o seu Físico Perfeito,<br>Junte-se a Nós!");
			$("#meioPagIndex").html('<button class="b-cadastro" id="bRediCadastro">Cadastro</button>');
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bRediLogin"><img src="img/iconeLogin.png"></button>');
		}
	}
}


function funcaoClique(){
	//REDIRECIONAR//
	$("#bRediCadastro").click(function(){
		if(testePag == "login.html"){
			window.location.href = "cadastro.html";
		}
		else{
			window.location.href = "paginas/cadastro.html";
		}
	});
	$("#bRediLogin").click(function(){
		if(testePag == "cadastro.html"){
			window.location.href = "login.html";
		}
		else{
			window.location.href = "paginas/login.html";
		}
	});
	$("#bRediPagPrincipal").click(function(){
		if(testePag == "cadastro.html" || testePag == "login.html"){
			window.location.href = "../index.html";
		}
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
			ls.setItem("user", JSON.stringify(contas.length-1));
			window.location.href = "../index.html";
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
				window.location.href = "../index.html";
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
>>>>>>> 470db7d04b87fe6c087260aca348231e70490c7f
