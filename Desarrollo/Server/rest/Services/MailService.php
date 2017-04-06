<?php

/***********************************************MAIL Service****************************************/
class MailService {
	public static function sendMail($obj) {
		require 'PHPMailer/PHPMailerAutoload.php';

		//Create a new PHPMailer instance
		$mail = new PHPMailer;
		//Tell PHPMailer to use SMTP
		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		//	$mail->SMTPDebug = 2;
		//Ask for HTML-friendly debug output
		//	$mail->Debugoutput = 'html';
		//Set the hostname of the mail server
		$mail->Host = 'smtp.gmail.com';
		// use
		// $mail->Host = gethostbyname('smtp.gmail.com');
		// if your network does not support SMTP over IPv6
		//Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
		$mail->Port = 587;
		//Set the encryption system to use - ssl (deprecated) or tls
		$mail->SMTPSecure = 'tls';
		//Whether to use SMTP authentication
		$mail->SMTPAuth = true;
		//Username to use for SMTP authentication - use full email address for gmail
		$mail->Username = "keyband11th@gmail.com";
		//Password to use for SMTP authentication
		$mail->Password = "KEYband11";
		//Set who the message is to be sent from
		$mail->setFrom('keyband11th@gmail.com', 'KeyBand');
		//Set an alternative reply-to address
		$mail->addReplyTo('keyband11th@gmail.com', 'KeyBand');
		//Set who the message is to be sent to
		$mail->addAddress($obj['emaildest'], $obj['namedest']);
		//Set the subject line
		$mail->Subject = $obj['subject'];
		//Read an HTML message body from an external file, convert referenced images to embedded,
		//convert HTML into a basic plain-text alternative body
		$mail->msgHTML($obj['body']);
		//Replace the plain text body with one created manually
		$mail->AltBody = $obj['body'];
		//Attach an image file
		//$mail->addAttachment('images/phpmailer_mini.png');
		//send the message, check for errors
		$dataArray = array();
		if (!$mail->send()) {
			header('HTTP/1.1 200 Error con el envio');
			$dataArray['message'] = "Ha habido un error con el env�o";
			return $dataArray;
			//echo "Mailer Error: " . $mail->ErrorInfo;
		} else {
			$dataArray['message'] = "Correo enviado correctamente";
			return $dataArray;
		}
	}

}
?>