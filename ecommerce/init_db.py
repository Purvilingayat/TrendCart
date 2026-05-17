import sqlite3

conn = sqlite3.connect("ecommerce.db")

# CREATE TABLES

conn.execute("""
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    category TEXT
)
""")

conn.execute("""
CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    address TEXT,
    items TEXT,
    total INTEGER
)
""")

conn.execute("""
CREATE TABLE IF NOT EXISTS users (
id INTEGER PRIMARY KEY AUTOINCREMENT,
name TEXT,
email TEXT UNIQUE,
password TEXT,
role TEXT
)
""")

# INSERT ADMIN ONLY IF NOT EXISTS

admin = conn.execute(
"SELECT * FROM users WHERE email='admin@stylehub.com'"
).fetchone()

if not admin:
    conn.execute("""
    INSERT INTO users (name,email,password,role)
    VALUES ('Admin','admin@stylehub.com','admin123','admin')
    """)


count = conn.execute("SELECT COUNT(*) FROM products").fetchone()[0]

if count == 0:

    products = [
    ("Floral Dress",1499,"Dresses"),
    ("Summer Maxi Dress",1899,"Dresses"),
    ("Pink Crop Top",799,"Tops"),
    ("Oversized Hoodie",1599,"Tops"),
    ("Leather Handbag",2999,"Bags"),
    ("Mini Shoulder Bag",1299,"Bags"),
    ("Pearl Necklace",699,"Accessories"),
    ("Silk Scarf",599,"Accessories")
    ]

    for p in products:
        conn.execute(
        "INSERT INTO products (name, price, category) VALUES (?, ?, ?)",
        p
        )

conn.commit()
conn.close()

print("Database initialized!")