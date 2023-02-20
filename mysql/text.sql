CREATE DATABASE transportation;

use transportation;

show tables;

CREATE TABLE customers (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  pick_up_location VARCHAR(255) NOT NULL,
  drop_off_location VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE planner (
  id INT(11) NOT NULL AUTO_INCREMENT,
  customer_id INT(11) NOT NULL,
  date DATE NOT NULL,
  name varchar(255) not null,
  pick_up_location varchar(255) not null,
  drop_off_location varchar(255) not null,
  PRIMARY KEY (id)

);

describe customers;

describe planner;
