from flask import Flask, render_template, request, Response

from data import MatchData

app = Flask(__name__)
app.config['FLASK_APP'] = "main.py"

md = MatchData()

@app.route('/')
def root():
    return render_template('index.html')

@app.route('/refreshdata')
def refresh_data():
    md.fetch_data()

    resp = Response()
    resp.status_code = 200
    return resp

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)