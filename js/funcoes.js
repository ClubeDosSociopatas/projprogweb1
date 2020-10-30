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

	
