ls = window.localStorage;
url = window.location.href;

//Itens localStorage//
var contas = JSON.parse(ls.getItem("contas"));
if(contas == null){
	contas = [];
}
var user = JSON.parse(ls.getItem("user"));

var car = parseInt(JSON.parse(ls.getItem("carrinho")));

var cartoes = JSON.parse(ls.getItem("cartoes"));
if(cartoes == null){
	cartoes = [];
}

//Teste usuario logado//
var testePag = window.location.href.slice(window.location.href.lastIndexOf("/")+1)
if(user != null && (testePag == "cadastro.html" || testePag == "login.html")){
	window.location.href = "../index.html";
}
if(user == null && (testePag == "usuario.html")){
	window.location.href = "../index.html";
}


$(document).ready(function(){
	prepararPagina();
	if(testePag == "usuario.html"){
		prepararUsuario();
	}
	funcaoClique();
});



//PREPARAR PAGINA USER//
function prepararUsuario(){
	$("#nomeUser").html(contas[user][0]);
	$("#emailUser").html(contas[user][1]);
	$("#dataUser").html(contas[user][2]);
	$("#estadoUser").html(contas[user][3]);
	$("#senhaUser").html('*'.repeat(contas[user][4].length));
	for(var cont = 0; cont < 3; cont++){
		var cardTest = "#tCartaoCadastrado" + String(cont);
		if(cartoes[user][cont][0] == null){
			$(cardTest).html('Cadastrar cartão');
		}
		else{
			$(cardTest).html((cartoes[user][cont][1].slice(0,4) + "-****".repeat(3)));
		}
	}
}



//PREPARAR PAGINAS//
function prepararPagina(){
	if(user != null){
		usu = parseInt(user);
		var capt = contas[usu][0].charAt(0).toUpperCase() + contas[usu][0].slice(1);
		if(testePag == "usuario.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones"><img src="../img/iconeCarrinho.png"></button>');
		}
		else{
			$("#meioPagIndex").html('<h1 class="mensagem-cativante">Seja bem vindo,<br>'+ capt +'!</h1>');
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones"><img src="img/iconeCarrinho.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bUser"><img src="img/iconePessoa.png"></button>');
		}
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



function cadastrarCartao(num){
	var juncao = '<div class="div-mudar-senha alturaJCartao" id="dCampoJanela"><table>';
	juncao+=	 '<tr>';
	juncao+=	 '<td class="fechar-janela"><img src="../img/iconeX.png" id="bFechaJanela"></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td>Nome Completo: <input type="text" placeholder="Nome Completo" id="iNomeComp"></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td>Número do Cartão: <input type="text" placeholder="Número do Cartão" maxlength="16" id="iNumCartao"></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td>Código de Segurança: <input type="text" placeholder="CVV" maxlength="4" size="2" id="iCVV"></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td>Data de Vencimento: <input type="text" placeholder="MM/AA" maxlength="5" size="3" id="iDataVenc"></td></tr>';
	juncao+=	 '<tr><td><button class="b-janela" id="bJanelaOverCartao">CADASTRAR</button></td></tr>';
	juncao+=	 '<tr><td class="erro-janela" id="tErroJanela"></td></tr>';
	juncao+=	 '</table></div>';

	$("#dOverlay").html(juncao);
	$("#dCampoJanela").addClass("alturaJCartao");
	$("#dOverlay").show();

	$("#bFechaJanela").click(function(){
		$("#dOverlay").hide();
		$("#dOverlay").html();
	});

	$("#bJanelaOverCartao").click(function(){
		var form = ["#iNomeComp", "#iNumCartao", "#iCVV", "#iDataVenc"];

		var testeCartao = true;

		for(var cont = 0; cont < form.length; cont++){
			$(form[cont]).removeClass("input-janela-erro");
		}
		$("#tErroJanela").html("");

		var aux = [];
		for(var cont = 0; cont < form.length; cont++){
			aux.push($(form[cont]).val());
		}

		for(var cont = 0; cont < form.length; cont++){
			if(aux[cont] == ""){
				testeCartao = false;
				$(form[cont]).addClass("input-janela-erro");
				$("#tErroJanela").html("FORMULARIO INCOMPLETO!");
			}
		}

		if(parseInt(aux[1]) < 1000000000000000){
			testeCartao = false;
			$(form[1]).addClass("input-janela-erro");
			if($("#tErroJanela").html() == ""){
				$("#tErroJanela").html("CARTÃO INVÁLIDO!");
			}
		}

		if(parseInt(aux[2]) < 100){
			testeCartao = false;
			$(form[2]).addClass("input-janela-erro");
			if($("#tErroJanela").html() == ""){
				$("#tErroJanela").html("CVV INVÁLIDO!");
			}
		}

		if(testeCartao){
			cartoes[user][num] = aux;
			ls.setItem("cartoes", JSON.stringify(cartoes));
			window.location.href = "usuario.html";
		}
	});
}



function prepararCartoes(num){
	var juncao = '<div class="div-mudar-senha" id="dCampoJanela"><table><tr>';
	juncao+=	 '<td class="fechar-janela" colspan="2"><img src="../img/iconeX.png" id="bFechaJanela"></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td colspan="2" class="informacoes-cinza">Nome Completo: <span class="info">'+cartoes[user][num][0]+'</span></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td colspan="2" class="informacoes-cinza">Número do Cartão: <span class="info">'+(cartoes[user][num][1].slice(0,4) + "-****".repeat(3))+'</span></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td colspan="2" class="informacoes-cinza">Código de Segurança: <span class="info">'+cartoes[user][num][2]+'</span></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td colspan="2" class="informacoes-cinza">Data de Vencimento: <span class="info">'+cartoes[user][num][3]+'</span></td></tr>';
	juncao+=	 '<tr>';
	juncao+=	 '<td><button class="b-janela" id="bCartaoRemover">REMOVER</button></td>';
	juncao+=	 '<td><button class="b-janela" id="bCartaoMudar">MUDAR</button></td>';
	juncao+=	 '</tr></table></div>';

	cartao = '#tCartaoCadastrado' + String(num);

	$("#dOverlay").html(juncao);
	$("#dCampoJanela").addClass("alturaJMudar");
	$("#dOverlay").show();

	$("#bFechaJanela").click(function(){
		$("#dOverlay").hide();
		$("#dOverlay").html();
	});
	$("#bCartaoRemover").click(function(){
		cartoes[user][num] = [null,null,null,null];
		ls.setItem("cartoes", JSON.stringify(cartoes));
		window.location.href = "usuario.html";
	});
	$("#bCartaoMudar").click(function(){
		$("#dOverlay").hide();
		$("#dOverlay").html();
		cadastrarCartao(num);
	});
}



//FUNCOES DE CLIQUE//
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
		if(testePag == "cadastro.html" || testePag == "login.html" || testePag == "usuario.html"){
			window.location.href = "../index.html";
		}
	});
	$("#bUser").click(function(){
		window.location.href = "paginas/usuario.html"
	});



	//FUNCOES CADASTRO-LOGIN//
	$("#bCadastro").click(function(){
		var form = ["#iNome", "#iMail", "#iData", "#iEstado", "#iSenha", "#iConSenha"]

		for(var cont = 0; cont < form.length; cont++){
			$(form[cont]).removeClass("erro-cadastro");
		}
		$("#textoErro").html("");

		var testeCadastro = true;
		var aux = [];

		for(var cont = 0; cont < form.length; cont++){
			aux.push($(form[cont]).val());
		}

		for(var cont = 0; cont < form.length; cont++){
			if(aux[cont] == ""){
				testeCadastro = false;
				$(form[cont]).addClass("erro-cadastro");
				$("#textoErro").html("FORMULARIO INCOMPLETO!");
			}
		}
		if(aux[4] != aux[5]){
			testeCadastro = false;
			$(form[5]).addClass("erro-cadastro");
			$(form[5]).val("");
			if($("#textoErro").html() == ""){
				$("#textoErro").html("CONFIRMAÇÃO INCORRETA!");
			}
		}

		for(var cont = 0; cont < contas.length; cont++){
			if(aux[0].toLowerCase() == contas[cont][0].toLowerCase()){
				if($("#textoErro").val() == ""){
					testeCadastro = false;
					$(form[0]).addClass("erro-cadastro");
					$("#textoErro").html("USUÁRIO JÁ CADASTRADO!");
				}
			}
			if(aux[1] == contas[cont][1]){
				if($("#textoErro").val() == ""){
					testeCadastro = false;
					$(form[1]).addClass("erro-cadastro");
					$("#textoErro").html("E-MAIL JÁ CADASTRADO!");
				}
			}
		}

		if(testeCadastro){
			aux.splice(5);
			contas.push(aux);
			cartoes.push([[null,null,null,null],[null,null,null,null],[null,null,null,null]]);
			ls.setItem("contas", JSON.stringify(contas));
			ls.setItem("user", JSON.stringify(contas.length-1));
			ls.setItem("cartoes", JSON.stringify(cartoes));
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

		for(var cont = 0; cont < form.length; cont++){
			aux.push($(form[cont]).val());
		}

		for(var cont = 0; cont < 2; cont++){
			if(aux[cont] == ""){
				$(form[cont]).addClass("erro-cadastro");
				$("#textoErro").html("FORMULARIO INCOMPLETO!");
			}
		}

		for(var cont = 0; cont < contas.length; cont++){
			if(aux[0].toLowerCase() == contas[cont][0].toLowerCase() && aux[1] == contas[cont][4]){
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



	//FUNCOES PAG USER//
	$("#bSair").click(function(){
		ls.setItem("user", null);
		window.location.href = "../index.html";
	});
	$("#tCartaoCadastrado0").click(function(){
		if(cartoes[user][0][0] != null){
			prepararCartoes(0);
		}
		else{
			cadastrarCartao(0)
		}
	});
	$("#tCartaoCadastrado1").click(function(){
		if(cartoes[user][1][0] != null){
			prepararCartoes(1);
		}
		else{
			cadastrarCartao(1)
		}
	});
	$("#tCartaoCadastrado2").click(function(){
		if(cartoes[user][2][0] != null){
			prepararCartoes(2);
		}
		else{
			cadastrarCartao(2)
		}
	});
	//CONFIRMAR DELETAR CONTA//
	$("#bDeleteConta").click(function(){
		var juncao = '<div class="div-mudar-senha" id="dCampoJanela">';
		juncao+=     '<table>';
		juncao+=	 '<tr>';
		juncao+=	 '<td colspan="2"><h2>Deseja mesmo deletar sua conta?</h2></td>';
		juncao+=	 '</tr>';
		juncao+=     '<tr>';
		juncao+=	 '<td><button class="b-cadastro" id="bSIM">SIM</button></td>';
		juncao+=	 '<td><button class="b-cadastro" id="bNAO">NÃO</button></td>';
		juncao+=	 '</tr>';
		juncao+=	 '</table>';
		juncao+=	 '</div>';

		$("#dOverlay").html(juncao);
		$("#dCampoJanela").addClass("alturaJDeletar");
		$("#dOverlay").show();

		$("#bNAO").click(function(){
			$("#dOverlay").hide();
			$("#dOverlay").html();
		});
		$("#bSIM").click(function(){
			contas.splice(user, 1);
			cartoes.splice(user, 1);
			ls.setItem("cartoes", JSON.stringify(cartoes));
			ls.setItem("contas", JSON.stringify(contas));
			ls.setItem("user", null);
			window.location.href = "../index.html";
		});
	});
	//JANELA MUDAR SENHA//
	$("#bMudarSenha").click(function(){
		var juncao = '<div class="div-mudar-senha" id="dCampoJanela">';
		juncao+=     '<table>';
		juncao+=	 '<tr>';
		juncao+=	 '<td class="fechar-janela"><img src="../img/iconeX.png" id="bFechaJanela"></td>';
		juncao+=     '</tr>';
		juncao+=	 '<tr>';
		juncao+=	 '<td>Senha atual: <input type="password" placeholder="Senha atual" id="iSenhaAtual"></td>';
		juncao+=	 '</tr>';
		juncao+=	 '<tr>';
		juncao+=	 '<td>Nova senha: <input type="password" placeholder="Nova senha" id="iNovaSenha"></td>';
		juncao+=	 '</tr>';
		juncao+=	 '<tr>';
		juncao+=	 '<td>Confirmar Senha: <input type="password" placeholder="Confirmar Senha" id="iConfSenha"></td>';
		juncao+=	 '</tr>';
		juncao+=	 '<tr>';
		juncao+=	 '<td><button class="b-janela" id="bJanelaOver">MUDAR</button></td>';
		juncao+=	 '</tr>';
		juncao+=	 '<tr>';
		juncao+=	 '<td class="erro-janela" id="tErroJanela"></td>';
		juncao+=	 '</tr>';
		juncao+=	 '</table>';
		juncao+=     '</div>';

		$("#dOverlay").html(juncao);
		$("#dCampoJanela").addClass("alturaJMudar");
		$("#dOverlay").show();

		$("#bFechaJanela").click(function(){
			$("#dOverlay").hide();
			$("#dOverlay").html();
		});
		$("#bJanelaOver").click(function(){
			var form = ["#iSenhaAtual", "#iNovaSenha", "#iConfSenha"];

			var testeSenha = true;

			for(var cont = 0; cont < 3; cont++){
				$(form[cont]).removeClass("input-janela-erro");
			}
			$("#tErroJanela").html("");

			var aux = [];

			for(var cont = 0; cont < form.length; cont++){
				aux.push($(form[cont]).val());
			}

			for(var cont = 0; cont < 3; cont++){
				if(aux[cont] == ""){
					testeSenha = false;
					$(form[cont]).addClass("input-janela-erro");
					$("#tErroJanela").html("FORMULARIO INCOMPLETO!");
				}
			}

			if(aux[0] != contas[user][4]){
				testeSenha = false;
				$(form[0]).addClass("input-janela-erro");
				if($("#tErroJanela").html() == ""){
					$("#tErroJanela").html("SENHA INCORRETA!");
				}
			}

			if(aux[1] != aux[2]){
				testeSenha = false;
				$(form[2]).addClass("input-janela-erro");
				if($("#tErroJanela").html() == ""){
					$("#tErroJanela").html("CONFIRMAÇÃO INCORRETA!");
				}
			}

			if(testeSenha){
				contas[user][4] = aux[1];
				ls.setItem("contas", JSON.stringify(contas));
				window.location.href = 'usuario.html';
			}
		});
	});
}