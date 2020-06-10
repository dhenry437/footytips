from flask import Flask, render_template, request, Response

app = Flask(__name__)
app.config['FLASK_APP'] = "main.py"

@app.route('/')
def root():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)