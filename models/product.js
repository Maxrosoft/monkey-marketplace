const pg = require("pg");
const env = require("dotenv");

env.config();

const db = new pg.Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DATABASE,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

db.connect();

const cart = [];

module.exports = {
  Product: class Product {
    constructor(title, price, description) {
      this.title = title;
      this.price = price;
      this.description = description;
    }

    save() {
      db.query(
        "INSERT INTO products (title, price, description) VALUES ($1, $2, $3)",
        [this.title, this.price, this.description]
      ).catch((err) => console.error(err));
    }

    static edit(id, title, price, description) {
      db.query(
        "UPDATE products SET title = $1, price = $2, description = $3 WHERE id = $4",
        [title, price, description, id]
      ).catch((err) => console.error(err));
    }

    static delete(id) {
      db.query("DELETE FROM products WHERE id = $1", [id]).catch((err) =>
        console.error(err)
      );
    }

    static fetchAll() {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products", (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.rows);
          }
        });
      });
    }

    static findById(id) {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products WHERE id = $1", [id], (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res.rows[0]);
          }
        });
      });
    }

    static addToCart(id) {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products WHERE id = $1", [id], (err, res) => {
          if (err) {
            reject(err);
          } else {
            cart.push(res.rows[0]);
            resolve();
          }
        });
      });
    }

    static deleteFromCart(id) {
      return new Promise((resolve, reject) => {
        db.query("SELECT * FROM products WHERE id = $1", [id], (err, res) => {
          if (err) {
            reject(err);
          } else {
            cart.splice(cart.indexOf(res.rows[0]), 1);
            resolve();
          }
        });
      });
    }
  },
  cart: cart,
};
