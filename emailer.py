import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import yaml
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with open("config.yml", "r") as ymlfile:
    cfg = yaml.safe_load(ymlfile)


class Emailer:
    smtpPort = cfg['mailjet']['port']
    smtpServer = cfg['mailjet']['server']
    smtpLogin = cfg['mailjet']['login']
    smtpPassword = cfg['mailjet']['password']

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
        with smtplib.SMTP(self.smtpServer, self.smtpPort) as server:
            server.ehlo()  # Can be omitted
            server.starttls(context=context)
            server.ehlo()  # Can be omitted
            server.login(self.smtpLogin, self.smtpPassword)
            server.sendmail(fromEmail, toEmail, message.as_string())
