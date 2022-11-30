
import random, string
from flask import (Flask, flash, redirect, escape, render_template, request, url_for)
from flask_sqlalchemy import SQLAlchemy
from hash_auth import verificar_passord_hash, hash_password
from utilitarios import escrever_log, login_necessario, criar_session, apagar_session, sanitizar
from markupsafe import escape
from secrets import secret_app_key


# Cria o objecto da extensao
db = SQLAlchemy()
# Cria a aplicacao
app = Flask(__name__)
# Configura a localização da base de dados
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///../../aplicacao.db"
# Define uma chave aplicacional
app.config['SECRET_KEY'] = secret_app_key
# Evita que faça o Seguimento das modificações efetuadas
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializa a aplicaçao com a extensao do SQLAlchemy
db.init_app(app)

# Criacao do Modelo de Base de Dados 
class Utilizador(db.Model):
    '''Esta Class recebe Username Email Nome e Password o Id é adicionado automaticamente'''
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    email = db.Column(db.String, nullable=False, unique=True)
    nome = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    salt = db.Column(db.String, nullable=False)

# Cria a tabela user na base de dados por isso esta comentada a partir da primeira ação de criação
#with app.app_context():
   #db.create_all()

# Rota principal da Página retorna apenas um ficheiro Html
@sanitizar
@app.route('/', methods=["GET", "POST"])
def index():
    return render_template('index.html')

# Cria a rota de origem da Aplicação Web esta página
# é uma página de Login
# Metodos autorizados nesta rota são GET e POST
@sanitizar
@app.route("/login", methods=["GET", "POST"])
def login():
    #Se a requesição for do tipo POST 
    if request.method == "POST":
        # Retira o valor digitado no FrontEnd pelo utilizador 
        # para o nosso Backend username 
        username = escape(request.form.get('username'))
        # Retira o valor digitado no FrontEnd pelo utilizador 
        # para o nosso Backend Password neste caso
        password = escape(request.form.get('password'))
        # Query a base de dados que seleciona o primeiro username
        # que encontrar igual ao retirado no form
        utilizador = Utilizador.query.filter_by(username = username).first()
        # Se não existir um objeto de utilizador depois da query
        if not utilizador:
            # Envia uma mensagem dizendo que o email ou username nao existe
            flash("O email ou username não existe, tenta novamente.")
            # Retorna para a pagina inicial
            return redirect(url_for('login'))
        # Basicamente aqui verificamos se a password introduzida 
        # pelo utilizador depois de encriptada fica diferente
        # à password guardada na base de dados 
        elif not verificar_passord_hash(password, utilizador.password, app.config['SECRET_KEY'], utilizador.salt):
            # Envia uma mensagem dizendo que a password esta incorreta
            flash('Password incorreta, tenta novamente.')
            # Retorna para a pagina inicial
            return redirect(url_for('login'))
        else:
            # Efetua o Login ao utilizador 
            criar_session(utilizador)
            # Retorna para a pagina do Chat
            return redirect(url_for('chat'))
    # Renderiza a Template Login.html
    return render_template("login.html")
    
# Cria a rota de para o Registo de Utilizadores
# Metodos autorizados nesta rota são GET e POST
@sanitizar
@app.route("/register", methods=["GET", "POST"])
def register():
    
    if request.method == "POST":
        # Efetua a geração de 16 caracteres randomicamente que sera o nosso salt
        salt = ''.join(random.choices(string.ascii_letters+string.punctuation, k=16))
        # Encripta a password com e atribui o valor a variavel
        # password_encriptada_salt
        password_encriptada_salt = hash_password(
                # Uma password secreta da aplicaçao e adicionada
                app.config['SECRET_KEY'],
                # Retira o valor digitado no FrontEnd pelo utilizador 
                # no campo da password para o nosso Backend eamil ou username 
                escape(request.form.get('password')),
                # ainda adicionei um salt que é é um dado aleatório que é usado como
                # uma entrada adicional para uma função unidirecional que "quebra" os dados,
                # uma password. Os Salts são usados ​​para proteger as passwords no armazenamento.
                salt
            )
        # Criaçao de um novo objeto do Tipo Utilizador
        novo_user = Utilizador(
            # Recebe o nome do frontend e atribui o valor ao objecto do modelo da base de dados
            nome=escape(request.form.get('nome')),
            # Recebe o email do frontend e atribui o valor ao objecto do modelo da base de dados
            email=escape(request.form.get('email')),
            # Recebe o username do frontend e atribui o valor ao objecto do modelo da base de dados
            username=escape(request.form.get('username')),
            # Recebe a password encriptada em cima e atribui o valor ao objecto do modelo da base de dados
            password=password_encriptada_salt,
            salt = salt
        )   
        try:  
            # Adiciona o utilizador a sessão da base de dados
            db.session.add(novo_user)
            # Executa o commit do novo o utilizador na base de dados
            db.session.commit()
            flash("Utilizador adicionado com sucesso.")
            # Depois da criaçao do Utilizador reencaminha o utilizador para o Login
            return redirect(url_for('login'))
        # caso nao seja possivel adicionar significa que o utilizador ja existe
        except Exception as e:
            escrever_log(e)
            flash("O email ou username já existem, tenta novamente.")
            return redirect(url_for('register'))
    # Renderiza a Template Register.html
    return render_template('register.html' )


# Cria a rota para o Chat
@sanitizar
# Decorador que inviabiliza o acesso à view sem 
# ser um utilizador logado
@app.route("/chat")
@login_necessario 
def chat():
    # Renderiza a Template Chat.html
    return render_template('chat.html')

# Cria a rota logout e apaga a sessao
@app.route("/logout")
def logout():
    apagar_session()
    return redirect(url_for('index'))

# Cria a rota para páginas que não estejam disponiveis no servidor
@sanitizar
@app.errorhandler(404) 
def invalid_route(e):
    # Escreve no log pois pode ser uma tentativa de ataque a plataforma
    escrever_log(e)
    return render_template('error404.html')

# Inicia a aplicação sem ser necessario utilizar o terminal para o efeito
if __name__ == '__main__':
    app.run( ssl_context=('certifications/localhost.crt', 'certifications/localhost.key') )
    