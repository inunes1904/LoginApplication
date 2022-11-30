function validarForm(){
    
    var password = $("#password")[0].value
    var password2 = $("#password2")[0].value
    var email = $("#email")[0].value
    var passwordStrongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")
    var emailStrongRegex = 
    new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  
    if (password === password2){
            if(password.match(passwordStrongRegex)) 
            { 
                if (email.match(emailStrongRegex)){

                    return true;
                }else{                 
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
                if (!password.match('(?=.*[a-z])')){
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter alfabético minúsculo</b></small></p>')
                }
                if (!password.match('(?=.*[A-Z])')){
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter alfabético maiúsculo</b></small></p>')   
                }
                if (!password.match('(?=.*?[0-9])')){
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter numérico</b></small></p>')
                }
                if (!password.match('(?=.*[$*&@#!])')){
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 1 caracter especial</b></small></p>')
                    
                }
                if (!password.match('(.{8,})')){
                    $("#divdasdivs").append('<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;A password deve conter pelo menos 8 caracters</b></small></p>')
                }
                return false;
   
            }
    }else{     
        $("#divdasdivs").empty()
        $("#divdasdivs").append('<p style="color:red;"><b>Password Errada!</b></p>'
        +'<p><small><b><i class="fa-solid fa-triangle-exclamation fa-lg warningIcon"></i>&emsp;As Passwords são diferentes</b></small></p>')
        return false;
   
    }
  }


