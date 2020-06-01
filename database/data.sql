CREATE DATABASE ecommerce;
USE ecommerce;
CREATE TABLE errors 
(
    error_code VARCHAR(4),
    log_message VARCHAR(225)
);
CREATE TABLE products
(
    product_id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(120),
    price DECIMAL(4,2),
    description VARCHAR(225),
    console VARCHAR(225),
    img_link VARCHAR(225),
    img_alt VARCHAR(225),
    img_src VARCHAR(225)
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

INSERT INTO products(name, price, description, console, img_link, img_alt, img_src)
VALUES
('mw', '59.99', 'First Person Shooter', 'xbox', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'xcmw.jpeg'),
('mw', '59.99', 'First Person Shooter', 'playstation', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'pscmw.jpeg'),
('mw', '59.99', 'First Person Shooter', 'pc', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'pccmw.jpeg'),
('mw', '59.99', 'First Person Shooter', 'nintendo', 'productDetail.html', 'Call Of Duty: Modern Warfare','ninmw.jpg'),
('mw2 xbox', '59.99', 'First Person Shooter', 'xbox', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'xcmw.jpeg'),
('mw2 playstation', '59.99', 'First Person Shooter', 'playstation', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'pscmw.jpeg'),
('mw2 pc', '59.99', 'First Person Shooter', 'pc', 'productDetail.html', 'Call Of Duty: Modern Warfare', 'pccmw.jpeg'),
('mw2 nintendo', '59.99', 'First Person Shooter', 'nintendo', 'productDetail.html', 'Call Of Duty: Modern Warfare','ninmw.jpg');
