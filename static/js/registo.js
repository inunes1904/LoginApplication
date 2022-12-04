// Funcao que permite validar o formulario de Registo
function validarForm(){
    // Receber o valor das variaveis
    var password = $("#password")[0].value
    var password2 = $("#password2")[0].value
    var email = $("#email")[0].value
    // Definicao dos objetos do tipo Regular Expression para verificar se os fields estao validos
    var passwordStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    var emailStrongRegex = 
    new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    
    // Verifica se as passwords sao iguais
    if (password === password2){
            // Verifica Se a password esta valida
            if(password.match(passwordStrongRegex)) 
            { 
                // Verifica Se o email esta valido
                if (email.match(emailStrongRegex)){

                    return true;
                }else{         
                    // Escreve nas divs os Erros        
                    $("#divdasdivs").empty()
                    $("#divdasdivs").append('<p class="warningIcon"><b>Email Errado!</b></p>'
                    +'<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;O email tem de ser válido</b></small></p>')
                    return false;
                }       
            }
            else
            {                 
                $("#divdasdivs").empty()
                $("#divdasdivs").append('<p style="color:red;"><b>Password Errada!</b></p>')
                // Verifica se a password contem 1 caracter alfabetico minusculo
                if (!password.match('(?=.*[a-z])')){
                    // Escreve nas divs os Erros   
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter alfabético minúsculo</b></small></p>')
                }
                // Verifica se a password contem 1 caracter alfabetico maiusculo
                if (!password.match('(?=.*[A-Z])')){
                    // Escreve nas divs os Erros   
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter alfabético maiúsculo</b></small></p>')   
                }
                // Verifica se a password contem 1 caracter numerico
                if (!password.match('(?=.*?[0-9])')){
                    // Escreve nas divs os Erros   
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter numérico</b></small></p>')
                }
                // Verifica se a password contem 1 caracter alfabetico especial
                if (!password.match('(?=.*[$*&@#!])')){
                    // Escreve nas divs os Erros   
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter especial</b></small></p>')
                    
                }
                // Verifica se a password contem 8 caracteres no minimo
                if (!password.match('(.{8,})')){
                    // Escreve nas divs os Erros   
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 8 caracters</b></small></p>')
                }
                return false;
   
            }
    }else{     
        // Escreve nas divs os Erros 
        $("#divdasdivs").empty()
        $("#divdasdivs").append('<p style="color:red;"><b>Password Errada!</b></p>'
        +'<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;As Passwords são diferentes</b></small></p>')
        return false;
   
    }
  }

  // Verifica se a checkbox esta pressionada ou nao
$('input[name=checkbox]').change(function() {
if ($(this).is(':checked')) {
    $('input[name=checkbox]').val('True')
} else {
    $('input[name=checkbox]').val('False')
}
});
  