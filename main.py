from flask import Flask, render_template, request, Response
from waitress import serve
import sys
import requests
import json
import bcrypt

from data import MatchData
from emailer import Emailer
from odds import OddsAPI

app = Flask(__name__)
app.config['FLASK_APP'] = "main.py"

md = MatchData()
em = Emailer()
oa = OddsAPI()

@app.route('/')
def root():
    return render_template('index.html')


@app.route('/refreshdata', methods=['POST'])
def refresh_data():
    # Validate password
    if bcrypt.checkpw(request.form['input'].encode('utf-8'), '$2y$12$vrSkWR3b6jFHeQJP1bjQPeMrqE4MquwSk84DQSJzY9JQXXmOYtEgy'.encode('utf-8')): #givemethedata
        md.fetch_data()

        resp = Response()
        resp.status_code = 200
        return resp
    else:
        resp = Response()
        resp.status_code = 401
        return resp


@app.route('/rounds/year/<year>')
def get_rounds(year):
    dump = md.get_rounds(year)

    resp = Response(dump)
    resp.content_type = "application/json"
    resp.status_code = 200
    return resp


@app.route('/matches/year/<year>/round/<round>')
def get_matches(year, round):
    dump = md.get_matches(year, round)

    resp = Response(dump)
    resp.content_type = "application/json"
    resp.status_code = 200
    return resp

@app.route('/sendemail', methods=['POST'])
def send_email():
    # print("DEBUG: toEmail = " + request.form['toEmail'])
    # print("DEBUG: fromEmail = " + request.form['fromEmail'])
    # print("DEBUG: text = " + request.form['text'])
    # print("DEBUG: html = " + request.form['html'])
    # print("DEBUG: name = " + request.form['name'])
    # print("DEBUG: round = " + request.form['round'])
    # print("DEBUG: response = " + request.form['g-recaptcha-response'])

    if verify_reCAPTCHA(request.form['g-recaptcha-response']):
        em.send_email(request.form["toEmail"], request.form["fromEmail"], request.form["text"],
                    request.form["html"], request.form["name"], request.form["round"])

        resp = Response()
        resp.status_code = 200
        return resp
    else:
        resp = Response()
        resp.status_code = 401
        return resp

@app.route('/odds/type/<type>')
def get_odds(type):
    dump = oa.get_odds(type)

    resp = Response(dump)
    resp.content_type = "application/json"
    resp.status_code = 200
    return resp

def verify_reCAPTCHA(response):
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': '6Leb37EZAAAAANqJjBJ-M1FfWwrJebd3WWSBdQg3',
        'response': response
        }

    r = requests.post(url, data=data)
    data = json.loads(r.text)

    return data['success']

if len(sys.argv) > 1:
    print("len(sys.argv) > 1")
    if sys.argv[1] == "live":
        serve(app)
    else:
        app.run(host='127.0.0.1', port=8080, debug=True)
else:
    app.run(host='127.0.0.1', port=8080, debug=True)
