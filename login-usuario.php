<?php

//configurações de credenciais
$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'formulario_cadastro_01';

//conexão com o banco
$conn = mysqli_connect($server, $usuario, $senha, $banco);

//funçao para executar o login
function login($conn) {
  if(isset($_POST['acessar']) AND !empty($_POST['email']) AND !empty($_POST['password'])) {
    $email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
    $password = sha1($_POST['password']);
    $query = "SELECT * FROM cadastros WHERE email = '$email' AND password = '$password'";
    $executar = mysqli_query($conn, $query);
    $return = mysqli_fetch_assoc($executar);

    if(!empty($return['email'])) {
      echo "Login validado!";
    } else {
      echo "Usuário ou senha não encontrado";
    }
  }
}

?>