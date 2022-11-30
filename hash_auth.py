
import hashlib

# Funcao que recebe a Secret key da App a password e o salt 
# e retorn a password encriptada 
# Esta geração adiciona tempo de computação que complica a quebra
# da password, em particular por brute force.
def hash_password(sec_key, password, salt):
    key_password_hash = (sec_key + password + salt).encode("utf-8").hex()
    result = hashlib.sha256(key_password_hash.encode())
    return f'pbkdf2:sha256:+{result.hexdigest()}'

# Funcao que recebe a password da form introduzida pelo utilizador 
# encripta e verifica se esta igual a da base de dados e retorna
# verdadeiro ou falso mediante se estao iguais ou nao
def verificar_passord_hash(password_utilizador, password_bd, sec_key, salt):
    key_password_hash = (sec_key + password_utilizador + salt).encode("utf-8").hex()
    result = hashlib.sha256(key_password_hash.encode())
    result = f'pbkdf2:sha256:+{result.hexdigest()}'
    return result == password_bd

