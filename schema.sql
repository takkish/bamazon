CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  item_id INT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY (id)
);


-- VALUES ("vanilla", 2.50, 100);
-- INSERT INTO products (item_id, product_name, department_name, price, quantity)
-- INSERT INTO products (item_id, product_name, department_name, price, quantity)
-- VALUES ("chocolate", 3.10, 120);

-- INSERT INTO products (item_id, product_name, department_name, price, quantity)
-- VALUES ("strawberry", 3.25, 75);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);

-- CREATE TABLE products (
--     id INT NOT NULL AUTO_INCREMENT,
--     name VARCHAR(45) NOT NULL,
--     location VARCHAR(255) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE item_id (
--     id INT NOT NULL AUTO_INCREMENT,
--     type VARCHAR(45) NOT NULL,
--     PRIMARY KEY (id)
-- );

-- CREATE TABLE item (
--     id INT NOT NULL AUTO_INCREMENT,
--     pet_type_id INT NOT NULL,
--     name VARCHAR(45) NOT NULL,
--     description VARCHAR(155) NOT NULL,
--     adopted BOOLEAN NOT NULL DEFAULT false,
--     shelter_id INT NOT NULL,
--     INDEX shelter_ind (shelter_id),
--     FOREIGN KEY (shelter_id)
--         REFERENCES shelters(id)
--         ON DELETE CASCADE,
--     INDEX type_ind (pet_type_id),
--     FOREIGN KEY (pet_type_id)
--         REFERENCES pet_types(id)
--         ON DELETE CASCADE,
--     PRIMARY KEY (id)
-- );
-- Create a MySQL Database called bamazon.

-- Then create a Table inside of that database called products.

-- The products table should have each of the following columns:

-- item_id (unique id for each product)

-- product_name (Name of product)

-- department_name

-- price (cost to customer)

-- stock_quantity (how much of the product is available in stores)

-