
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

if (!empty($_REQUEST['gha-a-n-t-i-s-p-a-m-f-i-e-l-d']) && (bool) $_REQUEST['gha-a-n-t-i-s-p-a-m-f-i-e-l-d'] == TRUE) {
  // spam
} else {
 $to      = 'romasty_92@mail.ru';
//    $to      = 'grishatov.hockey@gmail.com';
  $subject = 'GHockeyAgency - '.$_POST['firstName'];

  $message = "<html><head><title>GHockeyAgency</title></head><body>".$_POST['topic']."<br><br>Имя: ".$_POST['firstName']."<br>Телефон: ".$_POST['phone']."<br>Сообщение: ".$_POST['comment']."</body></html>";
  $headers = "MIME-Version: 1.0" . "\r\n";
  $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
  $headers .= 'From: '.$_POST['firstName'].' <admin@ghockeyagency.ru>' . "\r\n".
      'Reply-To: grishatov.hockey@gmail.com' . "\r\n";

  mail($to, $subject, $message, $headers);
}

?>
