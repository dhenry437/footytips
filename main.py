import yaml
import bcrypt
import json
import requests
import os
import sys
from waitress import serve
from flask import Flask, render_template, request, Response

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from odds import OddsAPI
from emailer import Emailer
from data import MatchData


app = Flask(__name__)
app.config['FLASK_APP'] = "main.py"

md = MatchData()
em = Emailer()
oa = OddsAPI()

with open("config.yml", "r") as ymlfile:
    cfg = yaml.safe_load(ymlfile)

recaptcha_secret = cfg['recaptcha']['secret']


@app.route('/')
def root():
    return render_template('index.html')


@app.route('/refreshdata', methods=['POST'])
def refresh_data():
    # Validate password
    if bcrypt.checkpw(request.form['input'].encode('utf-8'), '$2y$12$vrSkWR3b6jFHeQJP1bjQPeMrqE4MquwSk84DQSJzY9JQXXmOYtEgy'.encode('utf-8')):  # givemethedata
        try:
            md.fetch_data()
        except Exception as e:
            print(e)

            resp = Response()
            resp.status_code = 500
            return resp

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
    if verify_reCAPTCHA(request.form['g-recaptcha-response']):
        try:
            em.send_email(request.form["toEmail"], request.form["ccEmail"], request.form["text"],
                          request.form["html"], request.form["name"], request.form["round"])
        except Exception as e:
            print(e)

            resp = Response()
            resp.status_code = 500
            return resp

        resp = Response()
        resp.status_code = 200
        return resp
    else:
        resp = Response()
        resp.status_code = 401
        return resp


@app.route('/odds/type/<type>')
def get_odds(type):
    try:
        dump = oa.get_odds(type)
    except Exception as e:
        print(e)

        resp = Response()
        resp.status_code = 500
        return resp

    resp = Response(dump)
    resp.content_type = "application/json"
    resp.status_code = 200
    return resp


def verify_reCAPTCHA(response):
    url = 'https://www.google.com/recaptcha/api/siteverify'
    data = {
        'secret': recaptcha_secret,
        'response': response
    }

    r = requests.post(url, data=data)
    data = json.loads(r.text)

    return data['success']


if __name__ == '__main__':
    if len(sys.argv) > 1:
        if sys.argv[1] == "live":
            serve(app)
        else:
            app.run(host='127.0.0.1', port=8080, debug=True)
    else:
        app.run(host='127.0.0.1', port=8080, debug=True)
