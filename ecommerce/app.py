from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_db_connection():
    conn = sqlite3.connect("ecommerce.db")
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/")
def home():
    return "E-commerce Backend Running!"


@app.route("/products")
def get_products():
    conn = get_db_connection()
    products = conn.execute("SELECT * FROM products").fetchall()
    conn.close()

    return jsonify([dict(row) for row in products])


@app.route("/add-product", methods=["POST"])
def add_product():
    data = request.get_json()
    name = data["name"]
    price = data["price"]

    conn = get_db_connection()
    conn.execute(
        "INSERT INTO products (name, price) VALUES (?, ?)",
        (name, price)
    )
    conn.commit()
    conn.close()

    return {"message": "Product added successfully!"}


@app.route("/place-order", methods=["POST"])
def place_order():

    data = request.get_json()
    print("Received order:", data)   # DEBUG LINE

    name = data["name"]
    phone = data["phone"]
    address = data["address"]
    items = data["items"]
    total = data["total"]

    conn = get_db_connection()

    conn.execute(
        "INSERT INTO orders (name, phone, address, items, total) VALUES (?, ?, ?, ?, ?)",
        (name, phone, address, items, total)
    )

    conn.commit()
    conn.close()

    return {"message": "Order saved"}


@app.route("/orders")
def get_orders():

    conn = get_db_connection()

    orders = conn.execute("SELECT * FROM orders").fetchall()

    conn.close()

    return jsonify([dict(row) for row in orders])

@app.route("/signup", methods=["POST"])
def signup():

    data = request.get_json()

    name = data["name"]
    email = data["email"]
    password = data["password"]

    conn = get_db_connection()

    conn.execute(
        "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
        (name,email,password,"user")
    )

    conn.commit()
    conn.close()

    return {"message":"User created"}

@app.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data["email"]
    password = data["password"]

    conn = get_db_connection()

    user = conn.execute(
        "SELECT * FROM users WHERE email=? AND password=?",
        (email,password)
    ).fetchone()

    conn.close()

    if user:
        return jsonify(dict(user))
    else:
        return {"error":"Invalid credentials"},401

if __name__ == "__main__":
    app.run(debug=True)