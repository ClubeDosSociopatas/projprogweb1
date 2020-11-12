ls = window.localStorage;
url = window.location.href;

$(document).ready(function(){
	var contas = JSON.parse(ls.getItem("contas"));
	var aux = [];

	funcaoClique();
});

function funcaoClique(){
	$("#bRediCadastro").click(function(){
		window.location.href = "cadastro.html";
	});
	$("#bRediLogin").click(function(){
		window.location.href = "login.html";
	});
	$("#bRediPagPrincipal").click(function(){
		window.location.href = "index.html";
	});
}