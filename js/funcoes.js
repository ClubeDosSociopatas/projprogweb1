ls = window.localStorage;

//Itens compraveis e Carrinho//
var itens = [["Bola de peso 4/6kgs", "bolas.png", 34.99, false],
			 ["Elastico para treino", "elastico.png", 22.99, false],
			 ["Bicicleta Estática", "bicicleta.png", 129.99, false],
			 ["Anel de Pilates", "aneldepilates.png", 30.99, false],
			 ["Bandagem Adesiva", "bandagemadesiva.png", 12.99, false],
			 ["Bola para yoga", "bolayoga.png", 25.99, false],
			 ["Caneleiras 1KG", "caneleira1.png", 28.99, false],
			 ["Caneleiras 2KG", "caneleira2.png", 36.99, false],
			 ["Halter 1KG", "peso1.png", 19.99, false],
			 ["Halter 3KG", "peso3.png", 28.99, false],
			 ["Tatame Esticável", "tatamiestica.png", 39.99, false],
			 ["Tatame Eva", "tatameeva.png", 49.99, false],
			 ["Tatame", "tatami.png", 29.99, false],
			 ["Suplemento colágeno tipo II", "colageno.png", 39.99, false],
			 ["Suplemento maca peruana", "macaperuana.png", 42.99, false],
			 ["Suplemento picolinato de cromo", "picolinato.png", 42.99, false],
			 ["Suplemento thermo abdomen", "thermoabdomen.png", 45.99, false],
			 ["Suplemento BCAA", "bcaa.png", 45.99, false]];

//     ITENS LOCALSTORAGE     //

var car = JSON.parse(ls.getItem("carrinho"));
if(car == null){
	car = [];
}

//Variaveis usuario e cadastros//
var contas = JSON.parse(ls.getItem("contas"));
if(contas == null){
	contas = [];
}
var user = JSON.parse(ls.getItem("user"));
var cartoes = JSON.parse(ls.getItem("cartoes"));
if(cartoes == null){
	cartoes = [];
}

if(user != null){
	for(var cont = 0; cont < car[user].length; cont++){
	itens[car[user][cont]].splice(3, 1, true);
	}
}

//Teste usuario logado//
var testePag = window.location.href.slice(window.location.href.lastIndexOf("/")+1)
if(user != null && (testePag == "cadastro.html" || testePag == "login.html")){
	window.location.href = "../index.html";
}
if(user == null && (testePag == "usuario.html" || testePag == "carrinho.html")){
	window.location.href = "../index.html";
}

var globalOpinioes = []; //criação de array






$(document).ready(function(){
	prepararPagina();
	if(testePag == "usuario.html"){
		prepararUsuario();
	}
	if(testePag == "carrinho.html"){
		prepararCarrinho();
	}
	if(testePag == "maisopcoes.html"){
		prepararProdutos();
	}
	funcaoClique();
});





//MOSTRAR OPNIOES//
function mostraLista(){
	
	$("#lOpinioes").html("");
	for(var i = 0; i < globalOpinioes.length; i++){
		$("#lOpinioes").append((i+1) + ": " + globalOpinioes[i] + "<br>");
	}
}



//FUNC CALCULAR JUROS//
function calcularJuros(numP, numF){
	var tJuros = parseInt($("#sJuros").val());
	if(parseFloat(numP) == 0.0){
		$(".fonte-preco").html('Total: &emsp; R$ '+numP);
		return;
	}
	if(tJuros == 0){
		numP = parseFloat(numP) + parseFloat(numF);
		$(".fonte-preco").html('Total: &emsp; R$ '+numP.toFixed(2));
		return;
	}
	if(tJuros == 1){
		numP = parseFloat(numP) + parseFloat(numF);
		numP = parseFloat(numP/2).toFixed(2);
		$(".fonte-preco").html('Total: &emsp; 2xR$ '+numP);
		return;
	}
	if(tJuros == 2){
		numP = parseFloat(numP) + parseFloat(numF);
		numP = parseFloat(numP/4).toFixed(2);
		$(".fonte-preco").html('Total: &emsp; 4xR$ '+numP);
		return;
	}
	if(tJuros == 3){
		var numeral = parseFloat(numP) + parseFloat(numP*0.08) + parseFloat(numF);
		numeral = parseFloat(numeral/6).toFixed(2);
		$(".fonte-preco").html('Total: &emsp; 6xR$ '+numeral);
		return;
	}
	if(tJuros == 4){
		var numeral = parseFloat(numP) + parseFloat(numP*0.14) + parseFloat(numF);
		numeral = parseFloat(numeral/8).toFixed(2);
		$(".fonte-preco").html('Total: &emsp; 8xR$ '+numeral);
		return;
	}
}



//FUNC CALCULAR PRECO//
function calcPreco(){
	var precoCalculo = 0;
	for(var cont = 0; cont < car[user].length; cont++){
		precoCalculo+= itens[car[user][cont]][2] * $("#quant"+cont+"").val();
	}
	return precoCalculo;
}



//PREPARAR PAGINAS//
function prepararPagina(){
	if(user != null){
		if(testePag != "maisopcoes.html"){
			$("#dProdutoIndex").html("");
			for(var cont = 0; cont < 3; cont++){
				var juncao = '<div class="div-fotos-produtos">';
				juncao+=	 '<div class="container-img"><img src="img/'+itens[cont][1]+'">';
				juncao+=	 '<div class="containerText1">'+itens[cont][0]+'</div>';
				juncao+=	 '<div class="containerText2">R$'+itens[cont][2]+'</div></div>';
				if(!(itens[cont][3])){
					juncao+= '<button class="botao-add-carrinho" id_item="'+cont+'">Comprar</button></div>';
				}
				else{
					juncao+= '<button class="botao-comprado">No Carrinho!</button></div>';
				}
				$("#dProdutoIndex").append(juncao);
			}
		}
		usu = parseInt(user);
		var capt = contas[usu][0].charAt(0).toUpperCase() + contas[usu][0].slice(1);
		if(testePag == "index.html"){
			$("#meioPagIndex").html('<h1 class="mensagem-cativante">Seja bem vindo,<br>'+ capt +'!</h1>');
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bRediCarrinho"><img src="img/iconeCarrinho.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bUser"><img src="img/iconePessoa.png"></button>');
		}
		else if(testePag == "usuario.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bRediCarrinho"><img src="../img/iconeCarrinho.png"></button>');
		}
		else if(testePag == "maisopcoes.html"){
			$("#dIcones").html('<button class="b-icones" id="bRediCarrinho"><img src="../img/iconeCarrinho.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bUser"><img src="../img/iconePessoa.png"></button>');
		}
		else if(testePag == "carrinho.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bUser"><img src="../img/iconePessoa.png"></button>');
		}
	}
	else{
		$("#dProdutoIndex").html("");
		for(var cont = 0; cont < 3; cont++){
			var juncao = '<div class="div-fotos-produtos">';
			juncao+=	 '<div class="container-img"><img src="img/'+itens[cont][1]+'">';
			juncao+=	 '<div class="containerText1">'+itens[cont][0]+'</div>';
			juncao+=	 '<div class="containerText2">R$'+itens[cont][2]+'</div></div>';
			$("#dProdutoIndex").append(juncao);
		}
		$(".div-fotos-produtos").css("height", "150px");
		if(testePag == "cadastro.html" || testePag == "login.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
		}
		else if(testePag == "maisopcoes.html"){
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="../img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bRediLogin"><img src="../img/iconeLogin.png"></button>');
		}
		else{
			$("#fraseCati").html("Busque o seu Físico Perfeito,<br>Junte-se a Nós!");
			$("#meioPagIndex").html('<button class="b-cadastro" id="bRediCadastro">Cadastro</button>');
			$("#dIcones").html('<button class="b-icones" id="bBusca"><img src="img/iconeBusca.png"></button>');
			$("#dIcones").append('<button class="b-icones" id="bRediLogin"><img src="img/iconeLogin.png"></button>');
		}
	}
}



//PREPARAR PAGINA DE PRODUTOS//
function prepararProdutos(){
	$(".Produtos-base").html("");
	for(var cont = 0; cont < itens.length; cont++){
		var juncao = '<div class="div-card-produto">';
		juncao+=	 '<div class="container-img"><img src="../img/'+itens[cont][1]+'">';
		juncao+=	 '<div class="containerText1">'+itens[cont][0]+'</div>';
		juncao+=	 '<div class="containerText2">R$'+itens[cont][2]+'</div></div>';
		if(!(itens[cont][3])){
			juncao+= '<button class="botao-add-carrinho" id_item="'+cont+'">Comprar</button></div>';
		}
		else{
			juncao+= '<button class="botao-comprado">No Carrinho!</button></div>';
		}
		$(".Produtos-base").append(juncao);
	}
}



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



//PRPARAR PAGINA CARRINHO//
function prepararCarrinho(){
	$(".div-main-carrinho").html("");
	$('.div-main-carrinho').css('height', ''+(300+(car[user].length*200))+'px');
	for(var cont = 0; cont < car[user].length; cont++){
		var juncao = '<div class="div-espaco-produto">';
		juncao+=	 '<div class="div-dentro"><table><tr>';
		juncao+=	 '<td><img src="../img/'+itens[car[user][cont]][1]+'"><b class="div-produto-nome">'+itens[car[user][cont]][0]+'</b><b class="botao-remover" id_car="'+cont+'">Remover</b></td>';
		juncao+=	 '<td class="alinha-produto-direita"><input type="text" placeholder="Qt" value="1" maxlength="2" size="2" id="quant'+cont+'" class="quantidadeProduto" id_car="'+cont+'"><b class="div-preco" id="preco'+cont+'">R$ '+itens[car[user][cont]][2]+'</b></td>';
		juncao+=	 '</tr></table></div></div>';
		juncao+=	 '<div class="linha-separador"></div>';
		$(".div-main-carrinho").append(juncao);
	}
	var preco = parseFloat(calcPreco());
	var frete = parseFloat(((preco*0.12)+9.00).toFixed(2));
	var precoFinal = (preco+frete).toFixed(2);

	var juncao = '';
	if(preco == 0.0){
		juncao+= '<div class="espacamento-preco"><b class="fonte-frete">Frete: &emsp; R$ '+0+'</b><br><b class="fonte-preco">Total: &emsp; R$ '+0+'</b></div>';
	}
	else{
		juncao+= '<div class="espacamento-preco"><b class="fonte-frete">Frete: &emsp; R$ '+frete+'</b><br><b class="fonte-preco">Total: &emsp; R$ '+precoFinal+'</b></div>';
	}
	juncao+=	 '<div class="linha-separador"></div>';
	juncao+=     '<div class="espacamento-final"><table><tr><td>';
	if(cartoes[user][0][0] == null && cartoes[user][1][0] == null && cartoes[user][2][0] == null){
		juncao+= '<span class="info"><span class="info-cartao" id="tCartaoCadastrado0">Cadastrar Cartão</span></span>';
	}
	else{
		juncao+= '<select id="sCartao" class="compra-juros">';
		for(var cont = 0; cont < cartoes[user].length; cont++){
			if(cartoes[user][cont][0] != null){
				juncao+=	 '<option value="'+cont+'">Cartão '+(cartoes[user][cont][1].slice(0,4) + "-****".repeat(3))+'</option>';
			}
		}
		juncao+= '</select></td>';
	}
	juncao+=	 '<td rowspan="2"><button class="botao-efetuar-compra" id="bEfetuarCompra">Efetuar compra</button><br><b class="erro-janela"></b></td>';
	juncao+=	 '</tr><tr><td><select id="sJuros" class="compra-juros">';
	juncao+=	 '<option value="0">À Vista</option>'
	juncao+=	 '<option value="1">2x (Sem Juros)</option>';
	juncao+=	 '<option value="2">4x (Sem Juros)</option>';
	juncao+=	 '<option value="3">6x (Juros de 8%)</option>';
	juncao+=	 '<option value="4">8x (Juros de 14%)</option></select></td></tr></table></div>';
	$(".div-main-carrinho").append(juncao);
}



//CADASTRAR UM CARTAO//
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
			prepararUsuario();
			prepararCarrinho();
			funcaoClique();
			$("#dOverlay").hide();
			$("#dOverlay").html();
		}
	});
}



//PREPARAR CARTAO PARA VISUALIZACAO//
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
		if(testePag == "cadastro.html" || testePag == "maisopcoes.html"){
			window.location.href = "login.html";
		}
		else{
			window.location.href = "paginas/login.html";
		}
	});
	$("#bRediPagPrincipal").click(function(){
		if(testePag != "index.html"){
			window.location.href = "../index.html";
		}
	});
	$("#bUser").click(function(){
		if(testePag == "index.html"){
			window.location.href = "paginas/usuario.html";
		}
		else{
			window.location.href = "usuario.html";
		}
	});
	$("#bRediCarrinho").click(function(){
		if(testePag == "index.html"){
			window.location.href = "paginas/carrinho.html";
		}
		else{
			window.location.href = "carrinho.html";
		}
	});
	$("#bBusca").click(function(){
		if(testePag != "index.html"){
			window.location.href = "maisopcoes.html";
		}
		else{
			window.location.href = "paginas/maisopcoes.html";
		}
	});



	//EVENTO OPNIOES//
	$("#bAddDepoimento").click(function(){
		var descOpinioes = $("#tDepoimento").val();
		globalOpinioes.push(descOpinioes);
		mostraLista();
		
	});



	//FUNCOES CADASTRO-LOGIN//
	$("#bCadastro").click(function(){
		var form = ["#iNome", "#iMail", "#iData", "#iEstado", "#iSenha", "#iConSenha"];

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
			car.push([]);
			ls.setItem("contas", JSON.stringify(contas));
			ls.setItem("user", JSON.stringify(contas.length-1));
			ls.setItem("cartoes", JSON.stringify(cartoes));
			ls.setItem("carrinho", JSON.stringify(car));
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
			car.splice(user, 1);
			ls.setItem("cartoes", JSON.stringify(cartoes));
			ls.setItem("contas", JSON.stringify(contas));
			ls.setItem("carrinho", JSON.stringify(car));
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



	//FUNCOES CARRINHO//
	$(".botao-add-carrinho").click(function(){

		var id = $(this).attr("id_item");

		itens[id].splice(3, 1, true);
		car[user].push(id);
		prepararPagina();
		prepararProdutos();
		ls.setItem("carrinho", JSON.stringify(car));
		funcaoClique();
	});

	$(".quantidadeProduto").on('input', function(){
		var id = $(this).attr("id_car");

		var preco = parseFloat(calcPreco());
		var frete = parseFloat(((preco*0.12)+9.00).toFixed(2));

		$("#preco"+id).html("R$ "+(itens[car[user][id]][2] * $(this).val()).toFixed(2));
		$(".fonte-frete").html('Frete: &emsp; R$ '+frete);
		calcularJuros(preco, frete);
	});

	$(".botao-remover").click(function(){
		var id = $(this).attr("id_car");
		car[user].splice(id, 1);
		ls.setItem("carrinho", JSON.stringify(car));
		window.location.href = "carrinho.html";
	});

	$("#sJuros").on('input', function(){
		var preco = parseFloat(calcPreco());
		var frete = parseFloat(((preco*0.12)+9.00).toFixed(2));

		calcularJuros(preco, frete);
	});

	$("#bEfetuarCompra").click(function(){
		$(".erro-janela").html('');
		if(car[user].length == 0){
			$(".erro-janela").html('CARRINHO VAZIO!');
		}
		else if(cartoes[user][0][0] == null && cartoes[user][1][0] == null && cartoes[user][2][0] == null){
			$(".erro-janela").html('POR FAVOR, <br>CADASTRE UM <br>CARTÃO!');
		}
		else{
			car[user].splice(0,car[user].length);
			ls.setItem("carrinho", JSON.stringify(car));
			prepararCarrinho();
			$("#bEfetuarCompra").removeClass('botao-efetuar-compra');
			$("#bEfetuarCompra").addClass('botao-efetuado');
			$("#bEfetuarCompra").html('Compra Efetuada!');
		}
	});



	//FUNCOES MAIS OPCOES//
	$(".botao-opcoes").click(function(){
		window.location.href = "paginas/maisopcoes.html";
	});
}

