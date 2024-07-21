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
create table `apiary stationss`(
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
notes text,
created_at datetime default current_timestamp,
updated_at datetime default current_timestamp on update current_timestamp
);

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

