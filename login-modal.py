from flask import Flask, render_template, request, redirect, flash
import mysql.connector

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Needed for flash messages

# Database connection
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="anime_site"
)
cursor = conn.cursor()

@app.route('/')
def home():
    return render_template("login-modal.html")

@app.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (email, password))
    result = cursor.fetchone()

    if result:
        flash("Login successful!", "success")
        return redirect('/')
    else:
        flash("Invalid credentials", "danger")
        return redirect('/')

@app.route('/register', methods=['POST'])
def register():
    name = request.form['name']
    email = request.form['email']
    password = request.form['password']

    cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
    conn.commit()

    flash("Registration successful! You can log in now.", "success")
    return redirect('/')

if __name__ == '__main__':
    app.run(debug=True)
