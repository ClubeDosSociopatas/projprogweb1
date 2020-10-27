var usuarios = [];

var storage = window.localStorage;

$(document).ready(function(){
	
	fLocalMostraUsuarios();
		
});
	
function fLocalMostraUsuarios(){
	
	$("#tableUsuarios").html("");
	
	var array = JSON.parse(storage.getItem("dados"));
	
	var conteudo = "";
	
	for(var i = 0; i < array.length; i++){
		conteudo = "";
		conteudo += "<tr>";
		conteudo += "<td>" + array[i][0] + "</td>";
		conteudo += "<td>" + array[i][1] + "</td>";
		conteudo += "<td>" + array[i][2] + "</td>";
		conteudo += "<td>" + array[i][3] + "</td>";
		conteudo += "</tr>";
		
		$("#tableUsuarios").append(conteudo);
	}
}