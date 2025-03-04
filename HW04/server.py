from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("welcome.html")

@app.route("/infinity")
def log_sales():
    return render_template("log_sales.html")

if __name__ == "__main__":
    app.run(debug=True)
