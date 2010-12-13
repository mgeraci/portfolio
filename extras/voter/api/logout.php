<?php
	if (preg_match('/michaelgeraci\.com/', $_SERVER['SERVER_NAME'] )){
		session_save_path('/home/users/web/b2877/ipw.michaelg/public_html/cgi-bin/tmp');
	}

	session_start();
	unset($_SESSION['name']);
	header('Location: ../');
?>