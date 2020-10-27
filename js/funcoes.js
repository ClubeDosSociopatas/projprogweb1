$(document).ready(function(){
	
	fLocalEventosClick();
	
});
	
function fLocalEventosClick(){	
	
	$("#bSalvar").click(function(){
		
		var nome = $("#tNome").val();
		var sobrenome = $("#tSobrenome").val();
		var email = $("#tEmail").val();
		var matricula = $("#tMatricula").val();
		var usuario = $("#tUsuario").val();
		var senha = $("#tSenha").val();
		var confirmar_senha = $("#tConfirmarSenha").val();
		
		if(nome == ""){
			$("#tNome").addClass("campo-formulario-erro");
		} else {
			$("#tNome").removeClass("campo-formulario-erro");
		}
		if(sobrenome == ""){
			$("#tSobrenome").addClass("campo-formulario-erro");
		} else {
			$("#tSobrenome").removeClass("campo-formulario-erro");
		}
		if(email == ""){
			$("#tEmail").addClass("campo-formulario-erro");
		} else {
			$("#tEmail").removeClass("campo-formulario-erro");
		}
		if(matricula == ""){
			$("#tMatricula").addClass("campo-formulario-erro");
		} else {
			$("#tMatricula").removeClass("campo-formulario-erro");
		}
		if(usuario == ""){
			$("#tUsuario").addClass("campo-formulario-erro");
		} else {
			$("#tUsuario").removeClass("campo-formulario-erro");
		}
		if(senha == ""){
			$("#tSenha").addClass("campo-formulario-erro");
		} else {
			$("#tSenha").removeClass("campo-formulario-erro");
		}
		if(confirmar_senha == ""){
			$("#tConfirmarSenha").addClass("campo-formulario-erro");
		} else {
			$("#tConfirmarSenha").removeClass("campo-formulario-erro");
		}


	});
}			