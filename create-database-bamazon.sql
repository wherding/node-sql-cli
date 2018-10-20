-- i think this will work but didnt in sqlserver at work
create database bamazon;
use bamazon;
create table products(
item_id int auto_increment not null,
product_name varchar(100),
department_name varchar(100),
price decimal(20,2),
stock_quantity int,
primary key(item_id)
);