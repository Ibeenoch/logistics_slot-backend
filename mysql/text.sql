CREATE DATABASE transportation;

use transportation_queue;

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
  PRIMARY KEY (id),
  ON UPDATE CASCADE
  ON DELETE CASCADE
);
ENGINE=INNODB
create table customers (
  id int(11) not null auto_increment,
  name varchar(255) not null,
  pick_up_location varchar(225) not null,
  drop_off_location varchar(225) not null,
  primary key (id)
);

describe customers;

describe planner;

select name, pick_up_location, drop_off_location from customers where id in (select customer_id from planner where id=2);
select name, pick_up_location, drop_off_location from customers where id in (select customer_id from planner where customer_id=2);
update customers set name='leo hard', pick_up_location='oshodi' where id in(select customer_id from planner where customer_id=2);
delete from planner where id in (select id from customers where id=2);
insert into planner (date, customer_id) values ('2023-02-20', 5);
insert into planner (date, customer_id) values (curdate(), 5);
insert into planner (date, customer_id) values ('2023-02-20', 5); 
union is use only when the number of column in the 2 tables matches each others, so add a null to complete the number of columns
(select name, pick_up_location, drop_off_location from customers) union (select date, customer_id, null from planner);
(select name, pick_up_location, drop_off_location from customers where id=2) union (select date, customer_id, null from planner where customer_id=2);
(select name, pick_up_location, drop_off_location from customers where id=2) union (select date, customer_id, null from planner where customer_id=2);