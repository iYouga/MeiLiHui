<?php

$account  = $_POST['account'];
$password = $_POST['password'];
$accounts = $_POST['accounts'];
$verifyCode = $_POST['verifyCode'];
if($account === '魅力惠' && $password === 'meilihui' || 
   $accounts === '17191090484' && $verifyCode === '1234') {
    $ret = ['status' => 200, 'info' => '登陆成功！'];
} else {
    $ret = ['status' => 401, 'info' => '密码错误'];
}
echo json_encode($ret, JSON_UNESCAPED_UNICODE);