CREATE DATABASE ecommerce;
CREATE TABLE errors (
    error_code VARCHAR(4),
    log_message VARCHAR(225)
);
CREATE TABLE products
(
    product_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120),
    price DECIMAL(4,2),
    description VARCHAR(225),
    console VARCHAR(225)
);
CREATE TABLE user_data
(
    firstname VARCHAR(25),
    lastname VARCHAR(25),
    email VARCHAR(40),
    phone VARCHAR(20),
    contact_method VARCHAR(20),
    refferal VARCHAR(14),
    comments VARCHAR (225)
);

INSERT INTO products(name, price, description, console)
VALUES('mw', '59.99', 'First Person Shooter', 'xbox'),
('mw', '59.99', 'First Person Shooter', 'playstation'),
('mw', '59.99', 'First Person Shooter', 'pc'),
('mw', '59.99', 'First Person Shooter', 'nintendo');
