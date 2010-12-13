#!/usr/bin/env ruby

require 'bot'
require 'cgi'

# A basic HTML template with a form and text entry box for a user to converse with the bot.  It uses %RESONSE% as a placeholder for the bot's speech
html = %q{
  <html><body>
    <form method="get"> 
      <h1>Chit-Chataract Time!</h1> 
      %RESPONSE%
      <p>
        <b>You say:</b> <input type="text" name="line" size="40">
        <input type="submit">
      </p>
    </form>
  </body></html>
}
    
# Set up the CGI environment and make the parameters easy to access
cgi = CGI.new
params = cgi.params
line = params['line'] && params['line'].first

bot = Bot.new(:name => "Bot", :data_file => "bot.bot")

# If the user supplies text, respond
if line && line.length > 1
  bot_text = bot.response_to(line.chomp)
else
  bot_text = bot.greeting
end

# Format the text and sub the response, and send the MIME header for HTML support
bot_text = %Q{<p><b>Chit-chataract says:</b> #{bot_text}</p>}
puts "Content-type: text/html\n\n"
puts html.sub(/\%RESPONSE\%/, bot_text)  