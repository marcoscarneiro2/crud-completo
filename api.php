<?php 
$con = new mysqli("localhost","root","","vuephpcrud");
if($con -> connect_error){
    die("servidor não encontrado");
}
$res = array('error' => false);

$action = 'read';

if(isset($_GET['action'])){
    $action = $_GET['action'];
}
if($action == 'read'){
    $result = $con ->query("SELECT * FROM `usuario`");
    $usuario = array();

    while($row = $result -> fetch_assoc()){
        array_push($usuario,$row);
    }
    $res['usuario'] = $usuario;
}
if($action == 'create'){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    $result = $con ->query("INSERT INTO `usuario` (`id`, `username`, `email`, `mobile`) VALUES 
    (NULL, '$username', '$email', '$mobile')");

    if($result){
        $res['message'] = "Usuário adicionado";
    }else{
        $res['error'] = true;
        $res['message'] = "Erro ao adicionar Usuário";
    }
}

if($action == 'update'){
    $id = $_POST['id'];
    $username = $_POST['username'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];

    $result = $con ->query("UPDATE `usuario` SET `id` = '$id', `username` = '$username', `email` = '$email', `mobile` = '$mobile'
     WHERE `usuario`.`id` = '$id'; ");

    if($result){
        $res['message'] = "Usuário atualizado";
    }else{
        $res['error'] = true;
        $res['message'] = "Erro ao atualizar Usuário";
    }
}
if($action == 'delete'){
    $id = $_POST['id'];
    
    $result = $con ->query("DELETE FROM `usuario` WHERE `usuario`.`id` = '$id'; ");

    if($result){
        $res['message'] = "Usuário deletado";
    }else{
        $res['error'] = true;
        $res['message'] = "Erro ao deletar Usuário";
    }
}


$con -> close();
header("Content-type: application/json");
echo json_encode($res);
die();
?>