import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

class Emailer:
    port = 465  # For SSL
    smtpServer = "smtp.gmail.com"
    smtpEmail = "footytipsv2@gmail.com"
    password = "h9TKbX93aPzY"

    def send_email(self, toEmail, fromEmail, text, html, name, round):        
        message = MIMEMultipart("alternative")
        message["Subject"] = name.strip() + "'s Round " + round + " Footy Tips"
        message["From"] = fromEmail
        message["To"] = toEmail

        # Turn these into plain/html MIMEText objects
        part1 = MIMEText(text, "plain")
        part2 = MIMEText(html, "html")

        # Add HTML/plain-text parts to MIMEMultipart message
        # The email client will try to render the last part first
        message.attach(part1)
        message.attach(part2)

        context = ssl.create_default_context()
        with smtplib.SMTP_SSL(self.smtpServer, self.port, context=context) as server:
            server.login(self.smtpEmail, self.password)
            server.sendmail(fromEmail, toEmail, message.as_string())
