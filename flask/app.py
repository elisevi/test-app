from flask import Flask, request, make_response, render_template
  
app = Flask(__name__)
  
@app.route('/setcookie', methods = ['POST', 'GET'])
def setcookie():
    resp = make_response(render_template('index.html'))
    if request.method == 'POST':
        user = request.form['nm']
        resp.set_cookie('userID', user)
    return resp

@app.route('/getcookie')
def getcookie():
    name = request.cookies.get('userID')
    return '<h1>welcome ' + name + '</h1>' 

app.run()
