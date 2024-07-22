<?php

//configurações de credenciais
$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'formulario_cadastro_01';

//conexão com o banco
$conn = new mysqli($server, $usuario, $senha, $banco);

//verificar conexão
if ($conn->connect_error) {
  die('Falha ao se comunicar com o banco de dados'.$conn->connect_error);
}

?>