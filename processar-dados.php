<?php
require_once 'config.php';

//pegando os dados vindos do formulário
$firstname = $_POST['firstname'];
$lastname = $_POST['lastname'];
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
$number = $_POST['number'];
$password = sha1($_POST['password']);
$confirmPassword = sha1($_POST['confirmPassword']);
$gender = $_POST['gender'];

//Array de erros
$error = array();

//preparação de espaços no banco
$smtp = $conn->prepare("INSERT INTO cadastros (firstname, lastname, email, number, password, confirmPassword, gender) VALUES (?,?,?,?,?,?,?)");

//verificação de senha
if ($_POST['password'] != $_POST['confirmPassword']) {
  $error[] = "Senhas não conferem";
} 

//verificação de email
$queryEmail = "SELECT email FROM cadastros WHERE email = '$email'";
$buscaEmail = mysqli_query($conn, $queryEmail);
if(!empty(mysqli_num_rows($buscaEmail))) {
  $error[] = "E-mail já cadastrado";
}

//inserção no bd caso não tenha erro
if (empty($error)) {
    $smtp->bind_param("sssssss",$firstname,$lastname,$email,$number,$password,$confirmPassword,$gender);
} else {
  foreach ($error as $erro) {
    echo "<p>$erro</p>";
  }
}

//se executar corretamente
if($smtp->execute()) {
  echo "formulário enviado com sucesso!";
}

//fechando a conexão
$smtp->close();
$conn->close();

?>