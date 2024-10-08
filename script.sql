show databases;
use apiaries_16;
show tables;
-- create apiary stations table 
create table `apiary stations`(
station_id int auto_increment primary key,
location varchar(100) not null,
longitude decimal(10,8),
latitude decimal(10,8),
station_size varchar(30) not null,
number_of_hive_boxes numeric,
status enum('active','inactive') default 'inactive',
station_maintainace_history varchar(200),
last_inspection_date datetime,
next_inspection_date datetime,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);
describe `apiary stations`;
alter table `apiary stations` modify updated_at datetime default current_timestamp on update current_timestamp after notes;
alter table `apiary stations` modify created_at datetime default current_timestamp after notes;

-- rearranging a table/ copying into a new table from an old table;  
create table `apiary stations`(
station_id int auto_increment primary key,
`supervisor(int)` int,
`supervisor(ext)` int,
location varchar(100) not null,
longitude decimal(10,8),
latitude decimal(10,8),
station_size varchar(30) not null,
number_of_hive_boxes numeric,
status enum('active','inactive') default 'inactive',
station_maintainace_history varchar(200),
last_inspection_date datetime,
next_inspection_date datetime,
notes text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);

alter table `apiary stations` add `supervisor(int)` int, add `supervisor(ext)` int;
alter table `apiary stations` add foreign key (`supervisor(int)`) references employees(emp_id) ;
alter table `apiary stations` add foreign key (`supervisor(ext)`) references employees(emp_id) ;
insert into `apiary stationss` (station_id,
location,
longitude,
latitude,
station_size,
number_of_hive_boxes,
status,
station_maintainace_history,
last_inspection_date,
next_inspection_date,
notes,
created_at,
updated_at) select station_id, location,
longitude,
latitude,
station_size,
number_of_hive_boxes,
status,
station_maintainace_history,
last_inspection_date,
next_inspection_date,
notes,
created_at,
updated_at from `apiary stations`;
-- renaming a table 
alter table `apiary stationss` rename to stations;
-- create employee table
create table `employees`(
emp_id int auto_increment primary key,
first_name varchar(30) not null,
last_name varchar(30) not null,
dob date,
phone varchar(30) not null unique,
email varchar(30) not null unique,
address varchar(1000) default 'your address please' not null,
role enum('beekeeper','supervisor','manager') default 'beekeeper',
department enum('beekeeping','operation','administration') default 'operation',
joining_date date,
salary decimal(10,3),
employment_status enum('active','inactive') default 'active',
skill text,
notes text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp 
);
alter table employees modify role varchar(100) not null;
alter table employees modify employment_type enum('full staff','contract staff') default 'contract staff';
show tables;
describe employees;

-- create table for employees next of kin 
create table `employee NOK`(
nok_id int primary key auto_increment,
emp_id int,
fullname varchar(100) not null,
email varchar(255) unique not null,
address varchar(1000) default 'please update NOK address' not null,
phone varchar(30) not null unique,
gender enum('male','female') default 'male',
relationship enum('spouse','parent','guardian','sibling') default 'spouse',
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp,
foreign key (emp_id) references employees(emp_id)
);
-- create table for equipment and tools 
create table `equipments/tools`(
tool_id int primary key auto_increment,
tool_name varchar(100) not null,
category enum('beekeping','carpentary','processing') default 'beekeping',
quatity numeric,
status enum('used', 'new','need repair') default 'new', 
storage_location enum('warehouse', 'apiary site','factory') default 'factory',
supplier varchar(100),
purchase_date date,
purchase_cost decimal(10,3),
last_maintanace_date date, 
next_maintanace_date date, 
retired bool default false,
note text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);
drop table `equipments/tools`; 
alter table `equipments/tools` rename column quatity to quantity;
-- crerate inventory table
 create table supplies(
supply_id int primary key auto_increment,
supply_name varchar(100) not null,
category enum('processing','packaging') default 'packaging',
quantity numeric,
status enum('used', 'new','need repair') default 'new', 
storage_location enum('warehouse','factory') default 'factory',
supplier varchar(100),
minimum_stock_level numeric,
purchase_date date,
purchase_cost decimal(10,3),
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);

-- create table for the honey harvest
 create table `honey harvest`(
harvest_id int primary key auto_increment,
harvest_year int,
station_id int,
station_name varchar(50),
harvest_date date,
quantity_collected decimal(10,2),
unit_of_measurement varchar(10),
quality_rating int default 5,
note text,
foreign key(station_id) references `apiary stations`(station_id),
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
); 
alter table `honey harvest` drop column station_name;
alter table `honey harvest` change unit unit enum('litres','kg') default 'litres';
drop table `honey harvest`;

-- create swarm hunter's table

create table `swarm hunters`(
hunter_id int primary key auto_increment,
assigned_supervisor int,
fullname varchar(100),
phone varchar(20) unique,
email varchar(100) unique,
joining_date date,
tip decimal(10,3),
employment_status enum('active','inactive') default 'active',
emergency_contact_name varchar(20),
emergency_contact varchar(20) unique,
notes text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp,
foreign key(assigned_supervisor) references employees(emp_id)   
);  
-- create swarm catch reports 
create table `catch reports`(
report_id int primary key auto_increment,
hunter_id int,
assigned_supervisor int,
total_boxes_assigned numeric,
colonized_boxes numeric,
uncolonized_boxes numeric,
delivered_to_apiary enum('all','some','none') default 'none',
date_assigned date,
catch_date date,
catch_location varchar(100),
catch_status enum('all pending','all successfull','some pending'),
season enum('dry','rain') default 'rain',
notes text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp,
foreign key(hunter_id) references `swarm hunters`(hunter_id),  
foreign key(assigned_supervisor) references employees(emp_id) 
);  
-- create hives table 
create table hives(
hive_id int primary key auto_increment,
assigned_hunter int,
hive_type enum('langstroth','top bar','local') default 'langstroth',
num_of_frames numeric,
colonized enum('pending', 'confirmed', 'installed') default 'pending',
status enum('unuse','inuse','empty'),
use_condition enum('need repair', 'used','new'),
first_installation date,
current_location enum('swarm field','station','warehouse'),
last_inspection_date date,
foreign key(assigned_hunter) references `swarm hunters`(hunter_id),
note text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);
-- count the number of tables in a database 
select count(*) as `table count` from information_schema.tables where table_schema = 'apiaries_16';
select * from information_schema.tables;

-- create table for users
create table users (
user_id int auto_increment primary key,
fullname varchar(200) not null,
email varchar(255) unique not null,
password varchar(30) check(char_length(password) between 6 and 30) not null,
role enum('admin','user') default 'user',
address varchar(1000) default 'please update your address' not null,
image text,
phone varchar(30) not null unique,
gender enum('male','female') default 'female',
emailNotification bool default false not null,
blacklisted bool default false not null,
verificationString text,
isVerified bool default false not null,
verified datetime,
passwordToken text,
passwordExpirationDate datetime,
created_At datetime default current_timestamp,
updated_At datetime default current_timestamp on update current_timestamp
); 
alter table users modify password varchar(100) check(char_length(password) between 6 and 100) not null;
ALTER TABLE users DROP CONSTRAINT users_chk_1;

-- create products table

create table products(
product_id int primary key auto_increment,
product_name varchar(120) not null,
product_type enum( "honey","wax","propolis","royal jelly","venom") default 'honey',
description varchar(1000) not null,images varchar(255) not null default "/uploads/example.jpeg",
quantity varchar(100),
unit enum('litres','kg'),
price decimal(60,2) not null default 0.00, 
total_in_stock int not null default 15,
harvest_year date,
packaging_type varchar(50),
available bool default true,
averageRating int not null default 0,
numOfReviews int not null default 0,
numOfTimesSold int not null default 0,
user int, 
foreign key(user) references users(user_id),
createdat datetime default current_timestamp,
updatedat datetime default current_timestamp on update current_timestamp 
); 

-- create product color table
create table `product colors`(
color_id int primary key auto_increment,
product_id int,
color0 varchar(7) default "#222",
color1 varchar(7) default "#222",
color2 varchar(7) default "#222",
foreign key(product_id) references products(product_id) on delete cascade
); 

-- create product images table
create table `product images`(
image_id int primary key auto_increment,
product_id int,
image0 varchar(1000) default "/uploads/example.jpeg",
image1 varchar(1000) default "/uploads/example.jpeg",
image2 varchar(1000) default "/uploads/example.jpeg",
foreign key(product_id) references products(product_id) on delete cascade
); 
 -- create orders table
 create table orders(
order_id int auto_increment primary key,
tax decimal(60,4) not null,
shippingFee decimal(60,4) not null,
subTotal decimal(60,4) not null,
total decimal(60,4) not null,
paymentStatus enum("pending", "failed", "successful", "canceled") default "pending",
deliveryStatus enum("pending", "failed", "delivered", "canceled") default "pending",
tx_ref varchar(100),
transaction_id varchar(100),
user int,
userName varchar(100),
userEmail varchar(100),
userPhone varchar(100),
foreign key(user) references users(user_id) on delete cascade
); 
-- create table for order items
create table order_Items(
item_id int auto_increment primary key,
name varchar(20) not null,
image varchar(255) not null,
price decimal(60,4) not null,
amount int not null,
color varchar(7),
order_id int,
foreign key(order_id) references orders(order_id) on delete cascade
); 

-- create table for deliveryaddress 
create table deliveryAddress(
del_id int auto_increment primary key,
order_id int,
phone varchar(20) not null,
city varchar(255) not null,
state varchar(60) not null,
country int not null,
street varchar(15),
foreign key(order_id) references orders(order_id) on delete cascade
); 

-- create review table 
create table reviews(
review_id int primary key auto_increment,
rating int not null check(rating between 1 and 5),
title varchar(100) not null,
comment varchar(100) not null,
user int,
product int,
foreign key(user) references users(user_id) on delete cascade,
foreign key(product) references products(product_id) on delete cascade,
createdat datetime default current_timestamp not null,
updatedat datetime default current_timestamp on update current_timestamp
);
 
-- create review images table
create table `review images`(
image_id int primary key auto_increment,
review_id int,
image0 varchar(1000) default "/uploads/example.jpeg",
image1 varchar(1000) default "/uploads/example.jpeg",
image2 varchar(1000) default "/uploads/example.jpeg",
foreign key(review_id) references reviews(review_id) on delete cascade
);  
 -- create token
 create table token(
token_id int primary key auto_increment,
refreshToken varchar(100) not null,
ip varchar(100) not null,
userAgent varchar(100) not null,
isValid bool not null,
user int,
createdat datetime default current_timestamp,
updatedat datetime default current_timestamp on update current_timestamp,
foreign key(user) references users(user_id) on delete cascade
); 
select * from `user orders`;
describe `user orders`;
alter table `user orders` modify column _id int not null auto_increment;
-- create individual users order table
create table `user orders`(
_id int primary key not null,
order_id int,
successful int not null default 0,
pending int not null default 0,
canceled int not null default 0,
failed int not null default 0,
foreign key(order_id) references orders(order_id) on delete cascade
);  

 -- insrt data into apiary station table
 INSERT INTO `apiary stations` (location, longitude, latitude, station_size, number_of_hive_boxes, status, station_maintainace_history, last_inspection_date, next_inspection_date)
VALUES
    ('Tanke Station', -122.4194, 37.7749, 'Medium', 20, 'active', 'Regular maintenance performed', '2023-10-15 09:00:00', '2024-04-15 09:00:00'),
    ('Asadam Station', -121.9552, 37.3541, 'Large', 30, 'active', 'Inspected for hive health and cleanliness', '2023-09-20 10:30:00', '2024-03-20 10:30:00'),
    ('Alapa Station', -123.1193, 38.5780, 'Small', 10, 'inactive', 'Undergoing repairs and upgrades', '2023-12-05 11:45:00', '2024-06-05 11:45:00'),
    ('Agba Station', -122.3321, 37.4849, 'Medium', 25, 'active', 'No recent maintenance history', '2023-11-30 13:15:00', '2024-05-30 13:15:00'),
    ('Taiwo Station', -122.0308, 36.9741, 'Large', 40, 'inactive', 'Scheduled for inspection next week', '2023-10-25 14:45:00', '2024-04-25 14:45:00');
    
-- insert data into employee table  
alter table `apiary stations` modify `supervisor(ext)`int after station_id;
alter table `apiary stations` modify `supervisor(int)` int after station_id;
alter table employees modify employment_type enum('full staff', 'contract staff') after employment_status;
alter table employees modify employment_type enum('full staff', 'contract staff','station supervisor(ext)') default 'contract staff';

INSERT INTO `employees` (first_name, last_name, dob, phone, email, address, role, department, joining_date, salary, employment_status, skill, notes)
VALUES
    ('John', 'Doe', '1990-05-15', '123456789', 'johndoe@example.com', '123 Main St, City, State', 'beekeeper', 'beekeeping', '2020-03-10', 3500.00, 'active', 'Beekeeping, Hive Management', 'Experienced beekeeper with 5+ years of experience'),
    ('Jane', 'Smith', '1985-08-22', '987654321', 'janesmith@example.com', '456 Oak Ave, City, State', 'supervisor', 'operation', '2018-06-15', 5000.00, 'active', 'Team Management, Operational Planning', 'Oversees apiary operations and workflow'),
    ('Michael', 'Johnson', '1993-01-10', '5551234567', 'michaeljohnson@example.com', '789 Elm Rd, City, State', 'manager', 'administration', '2017-09-20', 7000.00, 'active', 'Leadership, Budget Management', 'Manages overall company operations and strategy'),
    ('Sarah', 'Lee', '1998-04-30', '4447890123', 'sarahlee@example.com', '321 Pine Blvd, City, State', 'beekeeper', 'beekeeping', '2021-01-05', 3200.00, 'active', 'Beekeeping, Pollination', 'Skilled in hive maintenance and pollination techniques'),
    ('David', 'Clark', '1980-11-18', '3335556789', 'davidclark@example.com', '555 Cedar Ln, City, State', 'beekeeper', 'beekeeping', '2019-08-12', 3800.00, 'inactive', 'Queen Rearing, Honey Extraction', 'Specializes in queen rearing and honey extraction');

select * from employees;
alter table `apiary stations` modify longitude decimal(50,8);

-- fill out apiary stations table
INSERT INTO `apiary stations` (`supervisor(int)`, `supervisor(ext)`, location, longitude, latitude, station_size, number_of_hive_boxes, status, station_maintainace_history, last_inspection_date, next_inspection_date, notes)
VALUES
    (1, 5, 'Apiary Station 1', -122.41, 37.7749, 'Medium', 10, 'active', 'Regular maintenance performed', '2023-10-15 09:00:00', '2024-04-15 09:00:00', 'Located near the river'),
    (1, 4, 'Apiary Station 2', -121.95, 37.3541, 'Large', 10, 'active', 'Inspected for hive health and cleanliness', '2023-09-20 10:30:00', '2024-03-20 10:30:00', 'Situated in a rural area'),
    (1, 4, 'Apiary Station 3', -123.11, 38.5780, 'Small', 10, 'inactive', 'Undergoing repairs and upgrades', '2023-12-05 11:45:00', '2024-06-05 11:45:00', 'Nearby forest area'),
    (1, 4, 'Apiary Station 4', -122.33, 37.4849, 'Medium', 10, 'active', 'No recent maintenance history', '2023-11-30 13:15:00', '2024-05-30 13:15:00', 'Adjacent to farmland'),
    (1, 5, 'Apiary Station 5', -122.03, 36.9741, 'Large', 10, 'inactive', 'Scheduled for inspection next week', '2023-10-25 14:45:00', '2024-04-25 14:45:00', 'Coastal location with good sunlight');
 -- update location column in the station table 
select * from `apiary stations`;
select * from `employees`;
update 	`apiary stations` set location = 'tanke' where station_id = 11;
update `apiary stations` set location = 'agba' where station_id = 12;
update `apiary stations` set location = 'taiwo' where station_id = 13;
update `apiary stations` set location = 'alapa' where station_id = 14;
update `apiary stations` set location = 'pipeline' where station_id = 15;

-- fill up the employees emergency contact table
INSERT INTO `employee NOK` (emp_id, fullname, email, address, phone, gender, relationship)
VALUES
    (1, 'Mary Doe', 'mary.doe@example.com', '123 Main St, City, Country', '1234567890', 'female', 'spouse'),
    (2, 'John Smith', 'john.smith@example.com', '456 Elm St, Town, Country', '9876543210', 'male', 'parent'),
    (3, 'Alice Johnson', 'alice.johnson@example.com', '789 Oak Ave, Village, Country', '5551234567', 'female', 'sibling'),
    (4, 'Michael Brown', 'michael.brown@example.com', '321 Pine Rd, City, Country', '4447890123', 'male', 'guardian'),
    (5, 'Emily Wilson', 'emily.wilson@example.com', '555 Cedar Ln, Town, Country', '3335556789', 'female', 'spouse');
select * from `employee nok`; 

-- fill up the tools/equipments table

INSERT INTO `equipments/tools` (tool_name, category, quantity, status, storage_location, supplier, purchase_date, purchase_cost, last_maintanace_date, next_maintanace_date, retired, note)
VALUES
    ('Beehive Box', 'beekeping', 100, 'new', 'warehouse', 'Bee Supplies Co.', '2023-01-15', 50.00, '2023-04-10', '2024-04-10', false, 'Standard Langstroth hive box'),
    ('Bee Smoker', 'beekeping', 50, 'used', 'apiary site', 'Bee Equipment Ltd.', '2022-11-20', 30.00, '2023-03-15', '2024-03-15', false, 'Stainless steel smoker with leather bellows'),
    ('Hive Tool', 'beekeping', 75, 'new', 'warehouse', 'Beekeeping Supplies Inc.', '2023-03-05', 15.00, '2023-06-20', '2024-06-20', false, 'Standard hive tool for prying frames'),
    ('Table Saw', 'carpentary', 1, 'need repair', 'factory', 'Woodworking Tools Ltd.', '2022-09-10', 500.00, '2023-02-05', '2024-02-05', false, 'Industrial-grade table saw for woodworking'),
    ('Extractor Machine', 'processing', 1, 'used', 'factory', 'Honey Harvesters Corp.', '2023-02-25', 1500.00, '2023-07-30', '2024-07-30', false, 'Electric honey extractor with stainless steel drum');
 select * from `equipments/tools`;
 alter table `equipments/tools` add currency varchar(20) default 'naira';
 alter table `equipments/tools` modify currency varchar(15) after purchase_cost;
 
-- fill up the table for supplies
INSERT INTO supplies (supply_name, category, quantity, status, storage_location, supplier, minimum_stock_level, purchase_date, purchase_cost)
VALUES
    ('Honey Jars', 'packaging', 5000, 'new', 'warehouse', 'Jar Supplies Inc.', 1000, '2023-02-10', 1000.00),
    ('Bee Pollen Jars', 'packaging', 2000, 'new', 'warehouse', 'Pollen Containers Ltd.', 500, '2023-03-20', 800.00),
    ('Beekeeping Gloves', 'processing', 50, 'used', 'factory', 'Beekeeping Gear Co.', 20, '2022-12-15', 30.00),
    ('Filtering Screens', 'processing', 10, 'new', 'warehouse', 'Honey Processing Supplies LLC', 5, '2023-01-05', 50.00),
    ('Labeling Machine', 'packaging', 1, 'need repair', 'factory', 'Packaging Equipment Ltd.', 1, '2022-09-30', 1500.00);
select * from supplies;
-- fill up swarm hunters table
INSERT INTO `swarm hunters` (assigned_supervisor, fullname, phone, email, joining_date, tip, employment_status, emergency_contact_name, emergency_contact, notes)
VALUES
    (1, 'Alice Johnson', '1234567890', 'alice.johnson@example.com', '2023-03-15', 50.00, 'active', 'John Johnson', '9876543210', 'Experienced swarm catcher, available during spring season.'),
    (1, 'Bob Smith', '9876543210', 'bob.smith@example.com', '2023-02-28', 45.00, 'active', 'Sarah Smith', '5551234567', 'New to swarm catching but eager to learn.'),
    (3, 'Charlie Brown', '5551112222', 'charlie.brown@example.com', '2023-04-05', 55.00, 'active', 'David Brown', '3334445555', 'Certified beekeeper with previous swarm catching experience.'),
    (3, 'Diana Wilson', '3337779999', 'diana.wilson@example.com', '2023-03-01', 60.00, 'active', 'Emily Wilson', '2228881111', 'Dependable and resourceful swarm catcher.'),
    (1, 'Eva Martinez', '4445556666', 'eva.martinez@example.com', '2023-04-10', 50.00, 'active', 'Juan Martinez', '1112223333', 'Bilingual swarm catcher with strong communication skills.');
 select * from `swarm hunters`;
 alter table `swarm hunters` change tip `tip(naira)` decimal(10,3);
 
  -- fill up catch reports table
  
  INSERT INTO `catch reports` (hunter_id, assigned_supervisor, total_boxes_assigned, colonized_boxes, uncolonized_boxes, delivered_to_apiary, date_assigned, catch_date, catch_location, catch_status, season, notes)
VALUES
    (1, 4, 10, 8, 2, 'all', '2023-04-01', '2023-04-15', 'Forest area near Lakeview Park', 'all successfull', 'rain', 'Colonies transferred to Apiary Station 3.'),
    (2, 4, 10, 10, 0, 'some', '2023-03-20', '2023-04-05', 'Rural farmland near Oakville', 'some pending', 'rain', 'Additional swarm boxes needed for complete colonization.'),
    (3, 4, 10, 5, 5, 'all', '2023-04-05', '2023-04-20', 'Urban area near downtown', 'all successfull', 'dry', 'No issues reported during catch operation.'),
    (4, 5, 10, 5, 5, 'none', '2023-04-10', '2023-04-25', 'Parkland near Riverside Gardens', 'some pending', 'rain', 'Weather conditions affected swarm behavior.'),
    (5, 5, 10, 8, 2, 'all', '2023-03-25', '2023-04-10', 'Coastal region near Sunset Beach', 'all successfull', 'rain', 'Caught swarms are healthy and active.');

select * FROM `catch reports`;

-- fill up the hives table 
INSERT INTO hives (assigned_hunter, hive_type, num_of_frames, colonized, status, use_condition, first_installation, current_location, last_inspection_date, note)
VALUES
    (1, 'langstroth', 20, 'confirmed', 'inuse', 'new', '2023-04-01', 'station', '2023-04-15', 'Hive located in Apiary Station 3'),
    (2, 'top bar', 20, 'confirmed', 'inuse', 'used', '2023-03-20', 'swarm field', '2023-04-05', 'Top bar hive used for experimental purposes'),
    (3, 'langstroth', 20, 'pending', 'unuse', 'new', '2023-04-05', 'warehouse', '2023-04-20', 'New Langstroth hive awaiting assignment'),
    (4, 'local', 20, 'confirmed', 'inuse', 'used', '2023-04-10', 'station', '2023-04-25', 'Traditional local hive used for preservation purposes'),
    (5, 'langstroth', 20, 'pending', 'unuse', 'need repair', '2023-03-25', 'warehouse', '2023-04-10', 'Langstroth hive requiring repairs before installation');
select * from hives;
 -- fill up the honey harvest table
 INSERT INTO `honey harvest` (harvest_year, station_id, station_name, harvest_date, quantity_collected, unit, quality_rating, note)
VALUES
    (2023, 11, 'tanke', '2023-07-15', 50.25, 'litres', 4, 'Good harvest season with high-quality honey produced.'),
    (2023, 12, 'agba', '2023-08-02', 80.75, 'kg', 5, 'Exceptional yield of honey with excellent flavor profile.'),
    (2023, 13, 'taiwo', '2023-07-30', 65.50, 'litres', 4, 'Steady production of honey from diverse floral sources.'),
    (2023, 14, 'alapa', '2023-08-20', 95.00, 'kg', 5, 'Record-breaking harvest with premium quality honey extracted.'),
    (2023, 15, 'pipeline', '2023-08-10', 70.30, 'litres', 4, 'Consistent honey output meeting market demands.');

select * from `honey harvest`;
update `honey harvest` set `unit` = 'litres' where harvest_id = 4;
UPDATE `honey harvest`
SET `unit` = 'litres'
WHERE harvest_id = 2;
-- fill up te users table

INSERT INTO users (fullname, email, password, role, address, image, phone, gender, emailNotification, blacklisted, isVerified, created_At, updated_At)
VALUES
    ('John Doe', 'johndoe@example.com', 'password123', 'admin', '123 Main St, City, Country', 'https://example.com/profile.jpg', '1234567890', 'male', true, false, true, '2023-01-15 10:30:00', '2023-01-15 10:30:00'),
    ('Jane Smith', 'janesmith@example.com', 'securepass', 'user', '456 Oak Ave, Town, Country', NULL, '9876543210', 'female', true, false, false, '2023-02-20 08:45:00', '2023-02-20 08:45:00'),
    ('Alice Johnson', 'alicejohnson@example.com', 'password567', 'user', '789 Pine Rd, Village, Country', 'https://example.com/avatar.jpg', '5551234567', 'female', false, false, true, '2023-03-10 15:20:00', '2023-03-10 15:20:00'),
    ('Bob Smith', 'bobsmith@example.com', 'strongpassword', 'user', '101 Maple Ave, Suburb, Country', NULL, '3334445555', 'male', true, false, false, '2023-04-05 12:00:00', '2023-04-05 12:00:00'),
    ('Emily Brown', 'emilybrown@example.com', 'pass123', 'user', '222 Elm St, Rural, Country', 'https://example.com/photo.jpg', '4445556666', 'female', true, false, true, '2023-05-01 09:30:00', '2023-05-01 09:30:00');

 -- fill up the product table
 
 INSERT INTO products (product_name, product_type, description, images, quantity, unit, price, total_in_stock, harvest_year, packaging_type, available, averageRating, numOfReviews, numOfTimesSold, user, createdat, updatedat)
VALUES
    ('Wildflower Honey', 'honey', 'Pure wildflower honey harvested from local apiaries.', '/uploads/wildflower-honey.jpg', '500', 'kg', 20.99, 50, '2023-01-01', 'Glass jar', true, 4, 15, 25, 1, '2023-07-10 09:00:00', '2023-07-10 09:00:00'),
    ('Beeswax Block', 'wax', 'Natural beeswax block for crafting and cosmetics.', '/uploads/beeswax-block.jpg', '1', 'kg', 15.50, 30, '2023-01-01', 'Plastic wrap', true, 5, 10, 18, 1, '2023-06-15 12:30:00', '2023-06-15 12:30:00'),
    ('Propolis Tincture', 'propolis', 'High-quality propolis tincture for immune support.', '/uploads/propolis-tincture.jpg', '250', 'ml', 12.75, 20, '2023-01-01', 'Glass bottle', true, 4, 8, 12, 1, '2023-07-25 14:45:00', '2023-07-25 14:45:00'),
    ('Royal Jelly Capsules', 'royal jelly', 'Royal jelly capsules with natural nutrients and vitamins.', '/uploads/royal-jelly-capsules.jpg', '60', 'capsules', 24.99, 40, '2023-01-01', 'Plastic container', true, 5, 20, 30, 1, '2023-08-05 10:00:00', '2023-08-05 10:00:00'),
    ('Bee Venom Extract', 'venom', 'Pure bee venom extract for therapeutic use.', '/uploads/bee-venom-extract.jpg', '10', 'ml', 35.00, 10, '2023-01-01', 'Glass vial', true, 4, 12, 8, 1, '2023-08-20 11:30:00', '2023-08-20 11:30:00');
alter table products modify unit varchar(10);
 select * from products;
 -- fill up the product colors table
 INSERT INTO `product colors` (product_id, color0, color1, color2)
VALUES
    (6, '#ff0000', '#00ff00', '#0000ff'),
    (7, '#ffa500', '#008000', '#800080'),
    (8, '#ffff00', '#000080', '#ff00ff'),
    (9, '#00ffff', '#800000', '#008080'),
    (10, '#ff0080', '#808080', '#8000ff');
select * from `product colors`;
-- fill up the product images table
INSERT INTO `product images` (product_id, image0, image1, image2)
VALUES
    (6, '/uploads/product1-image1.jpg', '/uploads/product1-image2.jpg', '/uploads/product1-image3.jpg'),
    (7, '/uploads/product2-image1.jpg', '/uploads/product2-image2.jpg', '/uploads/product2-image3.jpg'),
    (8, '/uploads/product3-image1.jpg', '/uploads/product3-image2.jpg', '/uploads/product3-image3.jpg'),
    (9, '/uploads/product4-image1.jpg', '/uploads/product4-image2.jpg', '/uploads/product4-image3.jpg'),
    (10, '/uploads/product5-image1.jpg', '/uploads/product5-image2.jpg', '/uploads/product5-image3.jpg');
select * from `product images` ;
-- remove some user details from the orders table
describe orders;
alter table orders drop column userName, drop column useremail, drop column userphone;   
alter table orders modify user int after order_id;    
 -- fill up users table
 INSERT INTO orders (user, tax, shippingFee, subTotal, total, paymentStatus, deliveryStatus, tx_ref, transaction_id)
VALUES
    (3, 5.25, 10.50, 75.00, 90.75, 'successful', 'delivered', 'tx123456789', 'trans789012'),
    (4, 3.50, 8.25, 50.00, 61.75, 'successful', 'delivered', 'tx987654321', 'trans543210'),
    (5, 7.75, 12.00, 85.50, 105.25, 'pending', 'pending', 'tx456789012', null);
select * from orders;
alter table order_items modify order_id int after item_id;
INSERT INTO order_Items (order_id, product_name, image, price, amount, color)
VALUES
    (1, 'bee venom extract', '/uploads/productA.jpg', 25.00, 2, null),
    (1, 'wildflower honey', '/uploads/productB.jpg', 12.50, 3, '#00ff00'),
    (1, 'beeswax block', '/uploads/productC.jpg', 30.00, 1, null),
    (2, 'Propolis tincture', '/uploads/productD.jpg', 15.75, 4, '#ffa500'),
    (3, 'royal jelly capsule', '/uploads/productE.jpg', 20.00, 1, '#fff');
alter table order_items change name product_name varchar(20);
select * from products;
select * from order_items;

-- fill up delivery address table
  
  INSERT INTO deliveryAddress (order_id, phone, city, state, country, street)
VALUES
    (1, '+1234567890', 'New York', 'NY', 1, '123 Main St'),
    (2, '+1987654321', 'Los Angeles', 'CA', 1, '456 Elm St'),
    (3, '+1123456789', 'Chicago', 'IL', 1, '789 Oak St');

 select * from deliveryaddress;
 alter table deliveryaddress change country country varchar(30);
 update deliveryaddress set country = 'United state' where del_id = 3; 
 -- fill table for reviews
 INSERT INTO reviews (rating, title, comment, user, product, createdat, updatedat)
VALUES
    (5, 'Great Product!', 'I loved this product. It exceeded my expectations.', 1, 6, '2024-05-10 12:00:00', '2024-05-10 12:00:00'),
    (4, 'Nice Color!', 'The color of this item is beautiful.', 2, 7, '2024-05-09 14:30:00', '2024-05-09 14:30:00'),
    (3, 'Decent Quality', 'The quality of this product is average.', 3, 8, '2024-05-08 10:00:00', '2024-05-08 10:00:00');

 select * from reviews;
 -- fill up review images table
 INSERT INTO `review images` (review_id, image0, image1, image2)
VALUES
    (1, '/uploads/review1-image1.jpg', '/uploads/review1-image2.jpg', '/uploads/review1-image3.jpg'),
    (2, '/uploads/review2-image1.jpg', '/uploads/review2-image2.jpg', '/uploads/review2-image3.jpg'),
    (3, '/uploads/review3-image1.jpg', '/uploads/review3-image2.jpg', '/uploads/review3-image3.jpg'),
    (3, '/uploads/review3-image1.1.jpg', '/uploads/review3-image2.1.jpg', '/uploads/review3-image3.1.jpg');

 select * from `review images`;
 
 select * from `supplies`; 
 
 -- create the necessary tables for services provision
 
 CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    category ENUM('Consultancy', 'Apiary Setup', 'Supply Provision', 'Pollination', 'Other') DEFAULT 'Consultancy',
    -- price DECIMAL(10, 2) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
 -- fill up the services table
 INSERT INTO services (service_name, description, category)
VALUES
    ('Consultancy for Beekeeping Practices', 'Professional consultancy on beekeeping best practices and management.', 'Consultancy'),
    ('Complete Apiary Setup', 'Full setup of beekeeping apiary, including hive installation and equipment setup.', 'Apiary Setup'),
    ('Starter Bee Farm Supplies Package', 'Supply package containing essential items to start a bee farm (hive boxes, tools, protective gear, etc.)', 'Supply Provision'),
    ('Pollination Services for Farms', 'On-demand pollination services for agricultural farms.', 'Pollination'),
    ('Customized Beekeeping Training', 'Tailored training sessions on beekeeping techniques and bee farm management.', 'Consultancy');
select * from services;

-- create a consultancy items table
CREATE TABLE consultancy_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    item_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    `price (NGN)` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
 -- fill up the consultancy table
 INSERT INTO consultancy_items (service_id, item_name, description, `price (NGN)`)
VALUES
    (1, 'On-Site Consultation', 'One-time on-site visit for consultation and assessment.', 15000.00),
    (1, 'Customized Beekeeping Plan', 'Development of personalized beekeeping plan based on site assessment.', 25000.00),
    (5, 'Advanced Beekeeping Training', 'In-depth training session covering advanced beekeeping techniques.', 30000.00);
select * from consultancy_items;

-- create table for apiary setup component

CREATE TABLE apiary_setup_components (
    component_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    component_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL,
	`price (NGN)` DECIMAL(10, 2) NOT NULL, 
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
 -- fill up the apiary component table
 INSERT INTO apiary_setup_components (service_id, component_name, description, quantity, `price (NGN)`)
VALUES
    (2, 'Langstroth Hive Boxes', 'Standard Langstroth hive boxes for bee colony housing.', 10, 30000.00),
    (2, 'Beekeeping Tools Set', 'Essential tools for beekeeping operations (smoker, hive tool, bee brush, etc.).', 1, 15000.00),
    (2, 'Protective Gear Kit', 'Full protective gear set for beekeepers (veil, suit, gloves, boots).', 1, 10000.00);
select * from apiary_setup_components;
-- create table for supply provision items
CREATE TABLE supply_provision_items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT,
    item_name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    quantity INT NOT NULL,
    `price (NGN)` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
 -- fill up suplly provision items table 
 INSERT INTO supply_provision_items (service_id, item_name, description, quantity, `price (NGN)`)
VALUES
    (3, 'Starter Hive Kit', 'Complete starter hive kit including frames, foundations, and covers.', 1, 300.00),
    (3, 'Bee Colony Starter Pack', 'Healthy starter bee colony with queen and worker bees.', 1, 400.00),
    (3, 'Beekeeping Guidebook', 'Comprehensive guidebook covering beekeeping basics.', 1, 50.00);
select * from supply_provision_items;

-- create table for polination services
CREATE TABLE pollination_services (
    pol_service_id INT PRIMARY KEY auto_increment,
    service_id INT,
    crop_type VARCHAR(100) NOT NULL,
    service_description TEXT NOT NULL,
    `price/hct (NGN)` DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE
);
drop table pollination_services;
-- fill up table for pollination services
INSERT INTO pollination_services (service_id, crop_type, service_description, `price/hct (NGN)`)
VALUES
    (4, 'Almond Trees', 'Pollination service for almond orchards during bloom season.', 200.00),
    (4, 'Apple Orchards', 'Pollination service for apple orchards to enhance fruit set.', 150.00),
    (4, 'Blueberry Farms', 'Customized pollination service for blueberry farms.', 120.00);
    
    select * from `consultancy_items`;
    select * from products where quantity between 1 and 50;
    select product_name from products where unit = 'kg' or unit = 'ml';
    describe services;
    describe pollination_services;
 select * from products where available is null;
update products set quantity = 2 where product_id = 7 ;
select * from products limit 4;
select count(quantity) from products;
select * from products where product_name like '___d%';
select * from products where unit in ('kg', 'ml');
select * from orders;
select * from users;
select * from users self join orders on user_id = order_id;
select sum(total) as `total payment`, paymentStatus from orders group by `paymentStatus`; 
select count(order_id) as order_id, paymentStatus, subTotal, total from orders group by paymentstatus, subtotal, total;
select * from products;
select count(product_id) as product_id from products, numOfTimesSold group by numOfTimesSold having count(numOfTimesSold) > 8; 
 select quantity from products where total_in_stock > any (select price from products where price < 2000 );
 
--  Employees Table:
select * from employees;
-- Total Number of Employees: A count of all employees.
select count(emp_id) from employees;

-- Distribution of employees across different roles (beekeeper, supervisor, manager) and departments (beekeeping, operation, administration).
-- Employment Status: Number of active vs. inactive employees.

select count(emp_id) as count, role from employees group by role;
select count(emp_id) as count, department from employees group by department;
select count(emp_id) as count, employment_status from employees group by employment_status;
select count(emp_id) as count, employment_type from employees group by employment_type;


SELECT count(emp_id) as count, role as category, 'role' as category_type
FROM employees
GROUP BY role

UNION ALL

SELECT count(emp_id) as count, department as category, 'department' as category_type
FROM employees
GROUP BY department

UNION ALL

SELECT count(emp_id) as count, employment_status as category, 'employment_status' as category_type
FROM employees
GROUP BY employment_status

UNION ALL

SELECT count(emp_id) as count, employment_type as category, 'employment_type' as category_type
FROM employees
GROUP BY employment_type;

-- New Hires: Employees who joined recently.
select * from employees where joining_date >= date_sub(curdate(), interval 3 month);

-- Salary Data: Average, minimum, and maximum salaries.
select count(emp_id) as emp_count, max(salary) as max_salary, min(salary) as min_salary, avg(salary) as avg_salary from employees;

-- basic crud
select * from employees;
select * from employees where emp_id = 1;
update employees set salary = 3600 where emp_id = 1;
delete from employees where emp_id = 100; 

-- Apiary Stations Table:
select * from `apiary stations`;
select * from `apiary stations` where station_id = 1;
update `apiary stations` set station_size = 'medium' where station_id = 1;
delete from `apiary stations` where station_id = 100; 

-- Total Number of Apiary Stations: Count of all apiary stations.
select count(station_id) as `numOfStations` from `apiary stations`;
-- Active vs. Inactive Stations: Distribution of active and inactive stations.
select count(station_id) as count, status from `apiary stations` group by status 
 union all
 select count(station_id) as count, location from `apiary stations` group by location;

-- Station Locations: Geographical distribution of apiary stations.
select count(station_id) as count, status from `apiary stations` group by status;
-- Hive Box Count: Number of hive boxes at each station.
select * from `apiary stations`;
select sum(number_of_hive_boxes), status from `apiary stations` group by status;

 
 --  Honey Harvest Table:
 select * from `honey harvest`;
 update `honey harvest` set station_name = ondo where harvst_id = 1;
 delete from `honey harvest` where harvest_id = 7;
-- Total Honey Harvested: Aggregate quantity of honey harvested over time.
select sum(quantity_collected) as `total_harvested` from `honey harvest`;
-- Harvest by Station: Quantity of honey harvested from each station.
select sum(quantity_collected) as total_harvest, station_id from `honey harvest` group by station_id;
-- Harvest Quality Ratings: Average quality ratings of harvested honey.
select avg(quality_rating) as avg_rating, harvest_year from `honey harvest` group by harvest_year;
-- Seasonal Harvest Trends: Honey harvest trends across different seasons and years.

-- ////////////////////////////************/////////////
-- Emergency Contact Table:
select * from `employee nok`;
update `employee nok` set phone = 12344555 where nok_id =9 ;
delete from `employee nok` where nok_id = 90;
-- Total Number of Emergency Contacts: The count of emergency contacts.
select count(nok_id) as total_emergency_contact from `employee nok`;
-- Relationship Distribution: Breakdown of the types of relationships (spouse, parent, guardian, sibling).
select count(employees.emp_id) as count, `employee nok`.relationship from employees left outer join `employee nok` on employees.emp_id = `employee nok`.emp_id group by `employee nok`.relationship;
select count(nok_id) as count, relationship as `distribution by relationship and gender` from `employee nok` group by relationship
union all
select count(nok_id) as count, gender from `employee nok` group by gender;
-- Gender Distribution: Breakdown of emergency contacts by gender.
select count(nok_id) as count, gender from `employee nok` group by gender;
-- Contacts by Employee: Number of emergency contacts per employee.
-- Contact Information: Detailed contact information, including phone and address, for quick access in case of emergencies.
select * from employees e left outer join `employee nok` nok on e.emp_id = nok.emp_id;

-- Hives Table:
select * from hives;
update hives set colonized = 'pending' where hive_id = 4;
-- Total Number of Hives: The total count of hives.
select count(hive_id) as `total num of hives` from hives;
-- Hive Types Distribution: Breakdown of the different types of hives (langstroth, top bar, local).
select count(hive_id) as count, hive_type as `hive distribution based on type,colonization,use condition, location and status` from hives group by hive_type
union all
-- Colonization Status: Number of hives with different colonization statuses (pending, confirmed, installed).
select count(hive_id) as count, colonized from hives group by colonized
union all
-- Usage Status: Number of hives with different usage statuses (unused, in use, empty).
select count(hive_id) as count, status from hives group by status
union all
select count(hive_id) as count, use_condition from hives group by use_condition
union all
select count(hive_id) as count, current_location from hives group by current_location;

-- Swarm Hunters Table:
select * from `swarm hunters`;
update `swarm hunters` set phone = 123345 where hunter_id = 22;
delete from `swarm hunters` where hunter_id = 33; 
-- Total Number of Hunters: The total count of swarm hunters.
 select count(hunter_id) as count from `swarm hunters`;
-- Employment Status: Number of active and inactive hunters.
select count(hunter_id) as count, employment_status from `swarm hunters` group by `employment_status`;
-- Tip Distribution: Sum and average of tips received by hunters.
select avg(`tip(naira)`) as average_tip from `swarm hunters`;
-- Emergency Contact Readiness: Details of emergency contacts for each hunter.
-- Supervisor Assignment: Number of hunters assigned to each supervisor.
select count(hunter_id) as `num of swarm hunters assigned`, assigned_supervisor from `swarm hunters` group by assigned_supervisor;

-- ///////////////////**************************////////////////////////// 
-- Catch Reports Table:
select * from `catch reports`;
update `catch reports` set colonized_boxes = 10 where report_id = 10;
delete from `catch reports` where report_id =10; 
-- Total Reports: The total number of catch reports.
select count(report_id) reports from `catch reports`;
-- Boxes Assigned and Colonized: The total number of swarm boxes assigned, colonized, and pending colonization.
select sum(total_boxes_assigned) as `total assigned boxes`, sum(colonized_boxes) as `colonized boxes`, sum(uncolonized_boxes) as `uncolonized boxes` from `catch reports`;
-- Delivery Status: Number of reports with different delivery statuses (all, some, none).
select count(report_id) as count, delivered_to_apiary as 'installed' from `catch reports` group by delivered_to_apiary;
-- Catch Success Rates: Success rates of catches based on the catch_status.
-- Seasonal Performance: Number of catches reported during different seasons (dry, rain).
select count(report_id) as count, catch_status from `catch reports` group by catch_status;

-- ///////////////////////
-- Services Table:
select * from services;
update services set numOfTimesRendered = 55 where service_id = 6;
alter table services add column numOfTimesRendered numeric;
alter table services modify numOfTimesRendered numeric after description;
-- Total Services Provided: Total number of services provided.
select count(service_id) as total_services from services;
-- Service Categories: Breakdown of services by category (consultancy, apiary setup, supplies provision, pollination services).
select count(service_id) as count, category from services group by category;
-- Service Frequency: Number of times each service was provided.
-- Revenue from Services: Total revenue generated from each service category.
select * from services right outer join pollination_services on services.service_id = pollination_services.service_id;
-- Client Feedback: Aggregate feedback ratings and comments for each service.  
select * from pollination_services;
update pollination_services set crop_type = 'bell pepper farm' where pol_service_id = 1;
select * from apiary_setup_components;
-- ///////apaiary set up component 
alter table apiary_setup_components change quantity stock numeric;
select * from supply_provision_items;

-- ///////// 
select * from consultancy_items;
alter table consultancy_items add column numOfTimesRendered numeric;
alter table consultancy_items modify numOfTimesRendered numeric after description;
update consultancy_items set numOfTimesRendered = 3 where item_id = 3 ;

--   //////
select * from pollination_services;
alter table pollination_services add column rendered numeric;
alter table pollination_services modify rendered numeric after service_description; 
update pollination_services set rendered = 1 where pol_service_id = 1;

--  /////////////////////******************////////////////////
-- Equipment/Tools Table:
select * from `equipments/tools`;
-- Total quantity of each tool.
-- Breakdown by category (beekeeping, carpentry, processing).
select count(tool_id) as count, category from `equipments/tools` group by category;
-- Status distribution (new, used, need repair).
select count(tool_id) as count, status from `equipments/tools` group by status;
-- Maintenance Schedule:

-- Tools requiring maintenance.
-- Next maintenance dates.
-- Purchase Analysis:

-- Total cost of all equipment.
select sum(purchase_cost) as total_cost from `equipments/tools`;
-- Purchase cost breakdown by category.
select sum(purchase_cost) as total_cost, category from `equipments/tools` group by category;
-- Supplier analysis.
 

--  ////////////////////////************/////////////
-- Users Table:
-- User Management:

-- Total number of users.
select * from users;
update users set fullname = 'jeremie doe' where user_id = 1;
select * from users left outer join orders on users.user_id = orders.user;
-- Distribution of users by role (admin, user).
select count(user_id) as count, role from users group by role;
-- Gender distribution.
 select count(user_id) as count, gender from users group by gender;
 
--  Supplies Table:
select * from supplies;
-- Total quantity of each supply.
-- Status distribution (new, used, need repair).
select count(supply_id) as count, status from supplies group by status;
-- Supplies below minimum stock level.
select * from supplies where quantity < minimum_stock_level;
-- Total cost of all supplies.
select sum(purchase_cost) as total_cost from supplies;
-- Purchase cost breakdown by category.
select sum(purchase_cost) as total_cost, category from supplies group by category; 

--  /////////////////**************//////////////////

-- Product Overview:
select * from products;
select * from products left outer join `product images` pi on products.product_id = pi.product_id left outer join `product colors` pc on products.product_id = pc.product_id; 
update products set product_type = honey where product_id = 7;
-- Total number of products.
select count(product_id) as total_num_of_products from products;
-- Distribution by product type (honey, wax, propolis, royal jelly, venom).
select count(product_id) as count, product_type from products group by product_type;
-- Total quantity of each product in stock.
-- Stock level analysis to identify products below minimum stock level.
-- Average price of products.
-- Price breakdown by product type.
-- Total revenue generated from product sales.
-- Product Performance:
-- Average rating of products.
-- Number of reviews for each product.
-- Number of times each product has been sold.
-- Packaging Information:
-- Distribution of packaging types.
select count(product_id) as count, packaging_type from products group by packaging_type;
-- Total cost of packaging.
-- Availability Status:
select count(product_id) as count, available from products group by available;
-- Products currently available for sale.
select * from products where available = 1;
-- Products out of stock.
 select * from products where available = 0;
 
 --   ////////////////*********/////////////////
 -- Order Overview:
select * from orders;
select * from orders left outer join order_items oi on orders.order_id = oi.order_id; 
-- Total number of orders.
select count(order_id) as total_orders from orders;
-- Total revenue generated from orders.
select sum(total) as total_revenue from orders;
-- Distribution of orders by payment status (pending, failed, successful, canceled).
select count(order_id) as count, paymentStatus from orders group by paymentStatus;
-- Distribution of orders by delivery status (pending, failed, delivered, canceled).
select count(order_id) as count, deliveryStatus from orders group by deliveryStatus;

-- Transaction Analysis:
-- Total number of transactions.
-- Transaction IDs for successful orders.
select * from orders where paymentStatus = 'successful' and deliveryStatus = 'delivered';
select * from orders where paymentStatus = 'successful' and deliveryStatus = 'pending'; 
-- User Order History:
-- Order history for each user.
select * from users left outer join orders on users.user_id = orders.user;
-- Total successful orders placed by each user.
select count(order_id) as count, user from orders where paymentStatus  = 'successful' and deliveryStatus = 'delivered' group by user; 
-- Total unsuccessful orders placed by each users 
select count(order_id) as count, user from orders where paymentStatus <> 'successful' and deliveryStatus <> 'delivered' group by user; 


-- ///////////*************////////////
-- Review Overview:
select * from reviews;
select * from reviews left outer join `review images` ri on reviews.review_id = ri.review_id;
alter table reviews modify user int after rating;
alter table reviews modify product int after rating;
-- Total number of reviews.
select count(review_id) as total_review from reviews;
-- Distribution of ratings (average rating, number of reviews) for each product.
select * from products left outer join reviews on products.product_id = reviews.product;
select count(product_id) as product_id, averageRating from products left outer join reviews on products.product_id = reviews.product group by averageRating;
select count(product_id) as product, numOfReviews from products left outer join reviews on products.product_id = reviews.product group by numOfReviews; 
-- User Reviews:
-- Reviews submitted by each user.
select * from reviews where review_id = 1 or 1=1;
-- Average rating provided by each user.
show tables;
select * from `apiary stations`;
select location, `station_size`, latitude, status, case when status  = 'active' then 'station is active' else 'station is inactive' end as 'station status' from `apiary stations`;
RENAME TABLE `apiary stations` TO `apiary_stations`;
RENAME TABLE `apiary_setup_components` TO `apiary_setup_components`; -- No change needed
RENAME TABLE `catch reports` TO `catch_reports`;
RENAME TABLE `consultancy_items` TO `consultancy_items`; -- No change needed
RENAME TABLE `deliveryaddress` TO `delivery_address`;
RENAME TABLE `employee nok` TO `employee_nok`;
RENAME TABLE `employees` TO `employees`; -- No change needed
RENAME TABLE `equipments/tools` TO `equipments_tools`;
RENAME TABLE `hives` TO `hives`; -- No change needed
RENAME TABLE `honey harvest` TO `honey_harvest`;
RENAME TABLE `order_items` TO `order_items`; -- No change needed
RENAME TABLE `orders` TO `orders`; -- No change needed
RENAME TABLE `pollination_services` TO `pollination_services`; -- No change needed
RENAME TABLE `product colors` TO `product_colors`;
RENAME TABLE `product images` TO `product_images`;
RENAME TABLE `products` TO `products`; -- No change needed
RENAME TABLE `review images` TO `review_images`;
RENAME TABLE `reviews` TO `reviews`; -- No change needed
RENAME TABLE `services` TO `services`; -- No change needed
RENAME TABLE `supplies` TO `supplies`; -- No change needed
RENAME TABLE `supply_provision_items` TO `supply_provision_items`; -- No change needed
RENAME TABLE `swarm hunters` TO `swarm_hunters`;
RENAME TABLE `token` TO `token`; -- No change needed
RENAME TABLE `user orders` TO `user_orders`;
RENAME TABLE `users` TO `users`; -- No change needed
select * from employees;
show tables;
alter table employees drop column updated_at;
ALTER TABLE pollination_services 
ADD COLUMN `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;

ALTER TABLE `apiary_stations` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `apiary_setup_components` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `catch_reports` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `consultancy_items` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `deliveryaddress` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `employee_nok` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `reviews` 
CHANGE COLUMN `createdat` `createdAt` DATETIME,
CHANGE COLUMN `updatedat` `updatedAt` DATETIME;

ALTER TABLE `equipments_tools` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `hives` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `honey_harvest` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `order_items` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `orders` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `pollination_services` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `product_colors` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `product_images` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `products` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `review_images` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `reviews` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `services` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `supplies` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `products` 
CHANGE COLUMN `createdat` `createdAt` DATETIME,
CHANGE COLUMN `updatedat` `updatedAt` DATETIME;

ALTER TABLE `equipments_tools` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `supply_provision_items` 
CHANGE COLUMN `price (NGN)` `price_NGN` decimal(10,2);


ALTER TABLE `supplies` 
CHANGE COLUMN `created_at` `createdAt` DATETIME,
CHANGE COLUMN `updated_at` `updatedAt` DATETIME;

ALTER TABLE `orders` 
ADD COLUMN createdAt DATETIME default current_timestamp,
ADD COLUMN updatedAt DATETIME default current_timestamp on update current_timestamp;
describe swarm_hunters;
select * from token;
select * from employees;
select * from `swarm_hunters`;
select * from `apiary_stations`;
select * from `honey_harvest`;
select * from consultancy_items;
select * from pollination_services;
select * from catch_reports;
describe catch_reports;
describe services;
select * from consultancy_items;
delete from employees where emp_id = 36;
describe supply_provision_items;
select * from users;
describe equipments_tools;
alter table pollination_services change column `price/hct_NGN` price dec(10,2);
SELECT * from employees;
select * from hives;
select * from catch_reports;
select * from services;
select * from apiary_setup_components;
select * from consultancy_items;
describe apiary_setup_components;
select * from token;
select * from users;
select * from products;         
select * from product_images;
select * from product_colors;
select * from reviews;
select * from review_images;
delete from review_images where image_id = 4;
describe users;
alter table users change role role enum('admin','user',"test");
select * from users;
update users set isVerified=true where user_id = 2;
select * from orders;
select * from order_items;
select * from delivery_address;
select * from user_orders;
SELECT 
    DATE_FORMAT(createdAt, '%Y-%m') AS month, 
    SUM(total) AS total_revenue
FROM 
    orders
GROUP BY 
    DATE_FORMAT(createdAt, '%Y-%m')
ORDER BY 
    month ASC;

alter table user_orders change _id status_id int;
delete from product_images where image_id = 14;
update  order_items set product_id = 9 where item_id = 5;
select * from order_items;
alter table order_items add product_id int after order_id; 
alter table order_items add foreign key(product_id) references products(product_id);
describe order_items;
select count(paymentStatus) as count, paymentStatus from orders where user_id = 3 group by paymentStatus;
alter table review_images add column img0_public_id text after image0,add column img1_public_id text after image1,add column img2_public_id text after image2 ;
alter table users modify img_public_id varchar(200) after image;
alter table products modify available bool not null;
alter table products drop constraint products_ibfk_1;
alter table products drop column user; 
describe orders;
update users set role = "admin" where user_id  = 7;
select count(station_id) as stations, status from `apiary_stations` group by status;
select sum(number_of_hive_boxes) as total_hives from `apiary_stations`;
-- alter table `order_items` add pr varchar(100) not null;
alter table `swarm_hunters` modify employment_status enum ("active","inactive","terminated") default "active";
update `apiary_stations` set station_name = 'celestia' where station_id = 15; 
alter table `apiary_stations` change name station_name varchar(50) not null;
alter table `honey_harvest` modify colouration varchar(100) after quantity_collected;
select * from catch_reports;
select * from employees order by dob desc;
update honey_harvest set station_name = "celestia" where station_id =15;
ALTER TABLE token
MODIFY COLUMN isValid boolean DEFAULT true ;
alter table token modify userAgent varchar(1000) not null;
delete from users where user_id =9;