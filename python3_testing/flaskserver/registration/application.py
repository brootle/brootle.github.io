from flask import Flask, redirect, render_template, request, session, url_for
app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["POST"])
def register():
    if request.form["name"] == "" or request.form["dorm"] == "":
        return render_template("falure.html")
    return render_template("success.html")

if __name__ == "__main__":
    app.run()

# http://stackoverflow.com/a/31253927/6261255
# Must install virtual env
#     $ sudo apt install virtualenv
# Run below, flask folder gets created
#     $ virtualenv flask
# Go to flask folder
#     $ cd flask
# Activate virtualenv
#     $ source bin/activate
# Install flask in virtualenv
#     $ pip install flask    

# if running via virtualenv - http://127.0.0.1:5000/

# OR below, but need to activate virtualenv as above
# $ export FLASK_APP=hello.py
# $ export FLASK_DEBUG=1
# $ flask run --host=0.0.0.0 --port=8080
# it will be at http://127.0.0.1:8080/