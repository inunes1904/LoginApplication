from datetime import datetime
from functools import wraps
from flask import request, redirect, url_for, session
from markupsafe import escape

# Os wrappers são a funcionalidade disponível em Python para realizar o wrap
# uma função com outra função para estender o seu comportamento.
# nesta função em especifico criei um decorador que impossibilita o acesso o
# às rotas decoradas sem existir uma sessao ativa que e criada através do login
def login_necessario(f):
    @wraps(f)
    def funcao_decorator(*args, **kwargs):
        if not bool(session):
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)
    return funcao_decorator

# Esta funcao cria a sessao de Utilizador como o exemplo em baixo
# <SecureCookieSession {'utilizador': 'username da bd', 'nome': 'nome da BD'}>
def criar_session(user):
    session['utilizador'] = user.username 
    session['nome'] = user.nome
    

# Obriga a sessao a tornar-se permanente podendo fechar o browser 
# e abrir novamente quando entender
def session_permanente():
    if session:
        session.permanent = True
    

# Esta funcao apaga a sessao e todos os seus cookies  
def apagar_session():
    session.clear()

# Funcao que sanitiza automaticamente o return o que significa
# que por ser tambem um decorador o fará em todas as rotas que
# possuam este decorador
def sanitizar(f):
    @wraps(f)
    def wrapped(*args, **kwargs):
        return escape(f(*args, **kwargs))
    return wrapped

# Esta funcao grava os logs de erros que possam acontecer na plataforma
def escrever_log(e):
    try:
        with open('applogs.log', 'a') as file:
            file.write(f'{str(datetime.now())} - {str(e)}\n')
    except:
        print('Ficheiro não se encontra disponivel.')