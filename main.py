from flask import Flask, render_template, request, Response
from waitress import serve
import sys

from data import MatchData
from emailer import Emailer

app = Flask(__name__)
app.config['FLASK_APP'] = "main.py"

md = MatchData()
e = Emailer()

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/refreshdata')
def refresh_data():
    md.fetch_data()

    resp = Response()
    resp.status_code = 200
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
    print("DEBUG: toEmail = " + request.form['toEmail'])
    print("DEBUG: fromEmail = " + request.form['fromEmail'])
    print("DEBUG: text = " + request.form['text'])
    print("DEBUG: html = " + request.form['html'])
    print("DEBUG: name = " + request.form['name'])
    print("DEBUG: round = " + request.form['round'])
    e.send_email(request.form["toEmail"], request.form["fromEmail"], request.form["text"], request.form["html"], request.form["name"], request.form["round"])

    resp = Response()
    resp.status_code = 200
    return resp

if len(sys.argv) > 1:
    print("len(sys.argv) > 1")
    if sys.argv[1] == "live":
        serve(app)
    else:
        app.run(host='127.0.0.1', port=8080, debug=True)
else:
    app.run(host='127.0.0.1', port=8080, debug=True)
