<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
  <?php
    // // H E A D // //
    $title = 'Michael P. Geraci - Logo Design';
    include("../includes/head.php");
  ?>
  <body>
    <div id="content">
      <?php
        // // M E N U // //
        // gets the location of the page and assigns it to $location
        // format is /page.php
        $location = $_SERVER['PHP_SELF'];
        include("../includes/menu.php");

      ?>
      <div id="logo">
        <img id="logoTitle" src="/images/logo/logoTitle.jpg" alt="Logo Title" width="550" height="90">
        <?php

          /* 
            BELLonline PHP MAILER SCRIPT v1.5
            Copyright 2006 Gavin Bell 
            http://www.bellonline.co.uk 
            gavin@bellonline.co.uk

            Set up an email form on your website within minutes - see readme.txt for installation.
          */

          extract($_POST);

          // ============
          // = Settings =
          // ============

          // Email address that you want the form to send to
          $sendto_email = "mgeraci@gmail.com";

          // Language variables
          $lang_notice = "Well, the first step is for me to learn about what you do. So tell me about it below - it will get us on the same page.<br><br>Submitting the form will send me your answers via email.";
          $lang_name = "Your name";
          $lang_youremail = "Your email";
          $lang_message = "Message";

          // Questions
          $question1 = "Your company name & a short description of your services.";
          $question3 = "Please write your company name exactly as you would like it in the logo.";
          $question4 = "If you have one, what is your tagline - and do you want it in your logo?";
          $question5 = "Are there any specific themes or icons that you would or would not like in your logo?";
          $question6 = "Same for colors - are there any that you specifically want or do not want?";
          $question7 = "What attributes of your business would you like to convey with your logo?";
          $question8 = "What is the message that you would like to get to your target audience?";
          $question9 = "Who are your main competitors? Please list their websites if possible.";
          $question10 = "What are your thoughts on their logos? How would you like yours to be different?";
          $question2 = "How are you different from your competition (e.g., product, customer service, experience, etc.)?";
          $question11 = "Do any existing logos appeal to you? If so, please put a link to a picture of each.";
          $question12 = "Who is your target market?";
          $question13 = "If a customer were to take away two ideas from the logo, what would you want them to be?";
          $question14 = "If you have any specific ideas, or anything else I should know, feel free to put them here.";

          // Error messages
          $lang_error = "Your email has not been sent, the following errors were found:";
          $lang_noname = "You did not enter your name";
          $lang_noemail = "You did not enter your email address";
          $lang_invalidemail = "The email address that you entered appears to be invalid";

          // Success
          $lang_sent = "
            <div id='formContainer'>
              <span id='formNotice'>
                <h1>Thanks!</h1>I'll write back shortly. You can always contact me at <a href='mailto:mgeraci@gmail.com'>&#109;&#103;&#101;&#114;&#97;&#99;&#105;&#64;&#103;&#109;&#97;&#105;&#108;&#46;&#99;&#111;&#109;.</a>
              </span>
            </div>
          ";


          // ==========
          // = Script =
          // ==========

          // check if required fields are a-ok
          if (empty ($senders_name)) {
            $error = "1";
            $info_error .= $lang_noname . "<br>";
          }
          if (empty ($senders_email)) {
            $error = "1";
            $info_error .= $lang_noemail . "<br>";
          }
          if (!eregi("^[A-Z0-9._%-]+@[A-Z0-9._%-]+\.[A-Z]{2,6}$", $senders_email)) {
            $error = "1";
            $info_error .= $lang_invalidemail . "<br>";
          }
          if ($error == "1") {
            $info_notice = "<span style='color: " . $error_colour . "; font-weight: bold;'>" . $lang_error . "</span><br>";

            if (empty ($submit)) {
              $info_error = "";
              $info_notice = $lang_notice;
            }

            // assemble the message
            $mail_message = '<html><b>' . $question1 . '</b><br>' . preg_replace("/\n/", "<br>", $answer1) . '<br><br><b>Company URL</b><br>' . $company_url . '<br><br><b>' . $question3 . '</b><br>' . preg_replace("/\n/", "<br>", $answer3) . '<br><br><b>' . $question4 . '</b><br>' . preg_replace("/\n/", "<br>", $answer4) . '<br><br><b>' . $question5 . '</b><br>' . preg_replace("/\n/", "<br>", $answer5) . '<br><br><b>' . $question6 . '</b><br>' . preg_replace("/\n/", "<br>", $answer6) . '<br><br><b>' . $question7 . '</b><br>' . preg_replace("/\n/", "<br>", $answer7) . '<br><br><b>' . $question8 . '</b><br>' . preg_replace("/\n/", "<br>", $answer8) . '<br><br><b>' . $question9 . '</b><br>' . preg_replace("/\n/", "<br>", $answer9) . '<br><br><b>' . $question10 . '</b><br>' . preg_replace("/\n/", "<br>", $answer10) . '<br><br><b>' . $question2 . '</b><br>' . preg_replace("/\n/", "<br>", $answer2) . '<br><br><b>' . $question11 . '</b><br>' . preg_replace("/\n/", "<br>", $answer11) . '<br><br><b>' . $question12 . '</b><br>' . preg_replace("/\n/", "<br>", $answer12) . '<br><br><b>' . $question13 . '</b><br>' . preg_replace("/\n/", "<br>", $answer13) . '<br><br><b>' . $question14 . '</b><br>' . preg_replace("/\n/", "<br>", $answer14) . '</html>';

            // print the contents of the query form
            print "
              <div id='formContainer'>
                <span id='formNotice'>
                  $info_notice<span class='logoError'>$info_error</span>
                </span>
                <form method='post' action=''>
                  <table>
                    <tr>
                      <td class='inputLabel'>
                        <span class='logoLabel'>Your Name</span>
                      </td>
                      <td><input name='senders_name' type='text' class='mailform_input' id='senders_name' value='$senders_name' maxlength='32'></td>
                    </tr>
                    <tr>
                      <td class='inputLabel'>
                        <span class='logoLabel'>Your Email</span>
                      </td>
                      <td><input name='senders_email' type='text' class='mailform_input' id='senders_email' value='$senders_email' maxlength='64'></td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question1</span>
                        <br><textarea name='answer1' cols='50' rows='5' class='mailform_input'>$answer1</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td class='inputLabel'>
                        <span class='logoLabel'>Company URL</span>
                      </td>
                      <td><input name='company_url' type='text' class='mailform_input' id='company_url' value='$company_url' maxlength='64'></td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question3</span>
                        <br><textarea name='answer3' cols='50' rows='1' class='mailform_input'>$answer3</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question4</span>
                        <br><textarea name='answer4' cols='50' rows='2' class='mailform_input'>$answer4</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question5</span>
                        <br><textarea name='answer5' cols='50' rows='5' class='mailform_input'>$answer5</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question6</span>
                        <br><textarea name='answer6' cols='50' rows='5' class='mailform_input'>$answer6</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question7</span>
                        <br><textarea name='answer7' cols='50' rows='5' class='mailform_input'>$answer7</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question8</span>
                        <br><textarea name='answer8' cols='50' rows='5' class='mailform_input'>$answer8</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question9</span>
                        <br><textarea name='answer9' cols='50' rows='5' class='mailform_input'>$answer9</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question10</span>
                        <br><textarea name='answer10' cols='50' rows='5' class='mailform_input'>$answer10</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question2</span>
                        <br><textarea name='answer2' cols='50' rows='5' class='mailform_input'>$answer2</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question11</span>
                        <br><textarea name='answer11' cols='50' rows='5' class='mailform_input'>$answer11</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question12</span>
                        <br><textarea name='answer12' cols='50' rows='5' class='mailform_input'>$answer12</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question13</span>
                        <br><textarea name='answer13' cols='50' rows='5' class='mailform_input'>$answer13</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td colspan='2'>
                        <span class='logoTextAreaLabel'>$question14</span>
                        <br><textarea name='answer14' cols='50' rows='5' class='mailform_input'>$answer14</textarea>
                      </td>
                    </tr>
                    <tr>
                      <td><input name='submit' type='submit' id='submit' class='mailform_button' value='Send It!'></td>
                    </tr>
                  </table>
                </form>
              </div>
            ";
          } else {
            // send the email and print the success notice
            $info_notice = $lang_sent;
            $mail_message = '<html><b>' . $question1 . '</b><br>' . preg_replace("/\n/", "<br>", $answer1) . '<br><br><b>Company URL</b><br>' . $company_url . '<br><br><b>' . $question3 . '</b><br>' . preg_replace("/\n/", "<br>", $answer3) . '<br><br><b>' . $question4 . '</b><br>' . preg_replace("/\n/", "<br>", $answer4) . '<br><br><b>' . $question5 . '</b><br>' . preg_replace("/\n/", "<br>", $answer5) . '<br><br><b>' . $question6 . '</b><br>' . preg_replace("/\n/", "<br>", $answer6) . '<br><br><b>' . $question7 . '</b><br>' . preg_replace("/\n/", "<br>", $answer7) . '<br><br><b>' . $question8 . '</b><br>' . preg_replace("/\n/", "<br>", $answer8) . '<br><br><b>' . $question9 . '</b><br>' . preg_replace("/\n/", "<br>", $answer9) . '<br><br><b>' . $question10 . '</b><br>' . preg_replace("/\n/", "<br>", $answer10) . '<br><br><b>' . $question2 . '</b><br>' . preg_replace("/\n/", "<br>", $answer2) . '<br><br><b>' . $question11 . '</b><br>' . preg_replace("/\n/", "<br>", $answer11) . '<br><br><b>' . $question12 . '</b><br>' . preg_replace("/\n/", "<br>", $answer12) . '<br><br><b>' . $question13 . '</b><br>' . preg_replace("/\n/", "<br>", $answer13) . '<br><br><b>' . $question14 . '</b><br>' . preg_replace("/\n/", "<br>", $answer14) . '</html>';
            $senders_email = preg_replace("/[^a-zA-Z0-9s.@-_]/", "-", $senders_email);
            $senders_name = preg_replace("/[^a-zA-Z0-9s]/", " ", $senders_name);
            $headers = "From: $senders_name <$senders_email> \r\n";
            $headers .= "X-Mailer: PHP mailer \r\n";
            $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
            mail($sendto_email, 'Logo Design', $mail_message, $headers);
            print "$info_notice";
          }
        ?>
        <div id="logoBelow">
          questionnaire adapted from <a href="http://justcreativedesign.com">Jacob Cass</a>
          <br>&nbsp;
        </div>
      </div>
    </div>
  </body>
</html>