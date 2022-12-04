$(document).ready(function(){

  // Metodo simples que atribui o inteiro randomico do array 
  var randomItem = function(array){return array[Math.floor(Math.random() * array.length)];};
  
  var username = "Stranger";
    
  var kid = {
    WPM: 80, //tempo a escrever /tempo que demora a responder
    status: "not connected",
    maxAttention: 45, // tempo que demora o "robot chat" a ficar cansado e sair do chat
    curAttentionSpan: this.maxAttention, // inicia no maximo
    curUsername: "Kid",
    usernames: [
      "Kuririn",
      "Gohan",
      "Bulma",
      "SuperXandao",
      "Bubu",
      "SonGoku",
      "Vegeta",
      "Cell",
      "Picolo",
    ],
    greetings: [
      "Olá animal",
      "olá Jagunço",
      "taooooo tas bom",
      "uiii ja nao te via ha boe",
      "ainda bem que estas ai",
      "oiiiiiii ta friooooo",
      "Como estas",
    ],
    insults: [
      "O lago fica muito longe daqui.",
      "As dificuldades aumentam quanto mais perto chegamos do objectivo.",
      "Foi uma segunda-feira muito boa por ser um sábado.",
      "Como é maravilhoso que ninguém precise de esperar um único momento antes de começar a melhorar o mundo.",
      "Decidiu viver a sua vida pelo grande manifesto das batidas.",
      "A correcção faz muito, mas o encorajamento faz mais.",
      "Aquele que se conhece a si próprio é iluminado.",
      "O silêncio é uma vedação em torno da sabedoria.",
      "Com o aviso de ventos fortes",
      "Amar a todos, confiar em alguns, não fazer mal a ninguém.",
      "As pessoas mais bem sucedidas são aquelas que são boas no plano B.",
      "Esta é uma boneca japonesa.",
      "Com a realização do próprio potencial e auto-confiança na própria capacidade, pode-se construir um mundo melhor.",
      "Se pudéssemos aprender a gostar de nós próprios, mesmo um pouco, talvez as nossas crueldades e raivas pudessem derreter-se.",
      "Os quilómetros podem realmente separá-lo dos amigos... Se queres estar com alguém que amas, não estás já lá?",
      "Os gatos são bons animais de estimação, pois são limpos e não são ruidosos.",
      "Levou algum tempo a perceber que tudo o que ele decidiu não mudar, ele estava de facto a escolher.",
      "Nenhum dia em que se aprende algo é uma perda completa.",
      "Que o nosso jardim de corações de despertar floresça com centenas de flores.",
      "O vermelho é mais verde que o roxo, com certeza.",
      "A cor da telha não era algo de que o casal alguma vez tivesse falado.",
      "Ouvi dizer que Nancy é muito bonita.",
      "Ninguém o pode fazer sentir-se inferior sem o seu consentimento.",
      "O seu grito silenciou os adolescentes desordeiros.",
      "O início do conhecimento é a descoberta de algo que não compreendemos.",
    ],
    copypastas: [
      "O presente de Natal favorito da criança foi a caixa grande em que o cortador de relva do seu pai chegou.",
      "Deve acolher a mudança como regra, mas não como seu governante.",
      "O seu espaço sagrado é onde se pode voltar a encontrar repetidamente.",
      "O mais importante é transformar as nossas mentes, para uma nova forma de pensar, uma nova perspectiva: devemos esforçar-nos por desenvolver um novo mundo interior.",
      "Várias aves marinhas são elegantes, mas nada é tão elegante como um pelicano deslizante.",
    ],
    afkAlmostGone: [
      "...?",
      "estas com medo mano?",
      "que se passa, nao falas?",
      "onde vais animal?",
      "estas com problemas em pensar amigo?",
      "se nao responderes em 2 segundos vou bazar, adeus",
    ],
    afkGoodbyes: [
      "Se fizéssemos as coisas de que somos capazes, surpreender-nos-íamos a nós próprios, Adeus!",
      "Adeus animal, sempre sonhei em estar encalhado numa ilha deserta até que realmente acontecesse.",
      "Embora todos os seus amigos tivessem a certeza de que Maria tinha um sexto sentido, ela sabia que na realidade tinha um sétimo sentido. XAU",
      "O verdadeiro silêncio é o resto da mente; é para o espírito o que o sono é para o corpo, a alimentação e o refresco, Bye Bye",
      "Acredito que somos fundamentalmente os mesmos e temos o mesmo potencial básico. XAUUUUUUUUU",
      "Comece a tecer e Deus dar-lhe-á o fio. GODI BYI",
      "Olharam para o céu e viram um milhão de estrelas. ADEUS",
    ],
    triggers: [
   
    ],
    reply: function(text){
      this.status = "typing";
      var kidName = this.curUsername;
      var kidWPM = this.WPM;
      var kidReply = "";
      var isCopyPasta = false;
      if(text !== undefined && text !== null && text !== ""){kidReply = text;}else{
        if($(".chatbox .messages-wrapper .you").length === 1){
          kidReply = randomItem(this.greetings);
        }else{
          var finalDecision = randomItem(this.insults);
          var lastUserMessage = $(".chatbox .message.you:last-child .text").text();
          var triggered = false;
          for(var i=0;i<this.triggers.length;i++){
            var curRegex = this.triggers[i][0];
            var randReply = randomItem(this.triggers[i][1]);
            if(lastUserMessage.match(curRegex)){
              console.log("TRIGGERED");
              triggered = true;
              finalDecision = randReply;
              break;
            }
          }
          if(Math.random() < 0.1 && !triggered){
            finalDecision = randomItem(this.copypastas);
            isCopyPasta = true;
          }
          kidReply = finalDecision;
        }
      }
      
      //function to simulate actual typing using WPM to estimate how long it'd take to type up a reply
      var sendReply = function(replyText, isPasta){
        setTimeout(function(){
          sendMsg(kidName, replyText);
          kid.status = "idle";
          $(".reply .typing").text("");
          console.log("done typing! took "+(replyText.length * (1000/((kidWPM * 6)/60)))+"ms to reply");
        }, isPasta?500:(replyText.length * (1000/((kidWPM * 6)/60))));
      };
      //function to delay response time (so kid doesnt start typing response instantly)
      setTimeout(function(){
        $(".reply .typing").text(kidName+" está a escrever...");
        console.log("typing");
        sendReply(kidReply, isCopyPasta);
      },(250+(Math.random()*5000)));
    },
  };
  // Inicia a contagem decrescente da atenção do robot
  var timerActive = false, almostAFK = false;
  var attentionTimer = function(){
    var timer = setInterval(function(){
      if(kid.curAttentionSpan > 0){
        if(kid.status === "idle"){kid.curAttentionSpan--;}
        if(!almostAFK && kid.curAttentionSpan <= kid.maxAttention - (kid.maxAttention / 2)){
          almostAFK = true;
          if(kid.status !== "typing"){kid.reply(randomItem(kid.afkAlmostGone));}
        }
      }else{
        if(kid.status !== "typing"){
          kid.reply(randomItem(kid.afkGoodbyes));
          kid.status = "disconnected";
          clearInterval(timer);
        }
      }
    }, 1000);
  };
  // funcao que adiciona à Janela se who === username, a mensagem é do user caso contrario e do "robot"
  var sendMsg = function(who, text){
    if(text === null || text === undefined || text === ""){return;}
    if($(".reply input.usermsg").attr("placeholder") != ""){
      $(".reply input.usermsg").attr("placeholder","");
    }
    
    var tryOut = 0;
    for ( i in kid.usernames[0]){
      console.log(who)
      if (who === kid.usernames[i]){
        tryOut = i
      }
    }
    if (who === kid.usernames[tryOut] || who === 'typing'){
      console.log(kid.usernames)
    var html = ''+
    '<div class="">'+
    '<div class="'+(who === username?"you":"them")+' message">'+
      '<div class="avatar"></div>'+
      '<b><div class="name">'+who+'</div></b>'+
      '<div class="text alert alert-info">'+text+'</div>'+
    '</div>'+
    '</div> ';}else{

        var html = ''+
        '<div class="floatRight">'+
        '<div class="'+(who === username?"you":"them")+' message">'+
          '<div class="avatar"></div>'+
          '<b><div class="name">'+who+'</div></b>'+
          '<div class="text alert alert-secondary">'+text+'</div>'+
        '</div>'+
        '</div> ';
    }
    
    $(".chatbox .messages-wrapper").append($.parseHTML(html));
    $(".chatbox").scrollTop($(".chatbox .messages-wrapper").height());
    if(who === username){
      if(!timerActive){timerActive = true;attentionTimer();}
      kid.curAttentionSpan = kid.maxAttention;
      almostAFK = false;
      if(kid.status !== "typing"){kid.reply();}
      $(".reply input.usermsg").val("");
    }
  };
  // funcao que recebe o nome que o utilizador da App quer para entrar no chat
  $(".setuser button").click(function(){
    var desiredName = $(".setuser .username").val();
    if(desiredName !== "" && desiredName !== null && desiredName !== undefined){
      username = desiredName;
      $(".setuser, .dim").fadeOut(100);
      setTimeout(function(){
        $(".messages-wrapper .status").text("Connectado, diz algo no chat!");
        $(".reply input.usermsg").prop('disabled', false);
        kid.status = "idle";
        kid.curUsername = randomItem(kid.usernames);
      },(500+(Math.random()*1000)));
    }else{
      alert("Introduz um username para o chat Secreto");
      $(".setuser input.username").focus();
    }
  });
  // envia a mensagem escrita pelo utilizador quando o botao Enviar mensagem é pressionado
  $(".reply input.usermsg").keydown(function(e){if(e.which === 13){sendMsg(username, $(this).val());}});
  $(".reply button.send").click(function(){sendMsg(username, $(".reply input.usermsg").val());$(".reply input.usermsg").focus();});
  
});