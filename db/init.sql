drop table if exists admin;
drop table if exists primates cascade;
drop table if exists users;
drop table if exists products cascade;

create table admin (
id serial primary key,
auth0id text unique not null,
email text
);
create table users (
id serial primary key,
auth0id text unique not null
);

create table primates(
id serial primary key,
name varchar(64),
species varchar(100),
dob varchar(64),
gender varchar(20),
bio text,
photo_urls text[],
favorites text[],
admin_id integer references admin (id)
);

create table products(
id serial primary key,
name text,
price decimal,
product_url text,
description json,
in_stock boolean
);

insert into products
(name, price, product_url, description, in_stock)
values
('Spanky - Tote Bag', 17.99, 'https://i3.cpcache.com/product/287917893/spanky_tote_bag.jpg?color=Khaki&height=150&width=150', '{ "sizes": ["Small", "Medium"], "dimensions": {"small": "15 x 15 x 6", "medium": "15 x 18 x 6"}, "information": "Make this shopping tote your new grocery bag, library tote, or beach tote.  Machine wash cold inside out with like colors and tumble dry low for easy and convenient care." }' , true );

create table orders(
id serial primary key,
user_id integer references users (id),
product_id integer references products (id)
);

insert into primates
(name, species, dob, gender, bio, photo_urls, admin_id)
values
('Webster', 'White-handed Lar Gibbon', 'December 2003', 'Male', 'Webster came from a loving home where was well cared for and was a member of the family. Unfortunately, as with all gibbons when they mature, he developed a full gibbon call and created a problem in his residential neighborhood. Webster came here to live with us, where his call blends with those of our other gibbons. Now in the mornings, he joins in the morning chorus of gibbon song.', '{http://talkinmonkeysproject.org/wp-content/uploads/2016/06/12274338_10205036333325159_1396944792172780858_n.jpg, http://talkinmonkeysproject.org/wp-content/uploads/2016/06/meetwebster.jpg}', 1);

-- select admin.id, admin.email, name, species, dob, gender, bio, photo_urls, admin_id from primates
-- join admin on (admin.id = admin_id);

select * from admin;
select * from primates;
select * from products;
select * from users;
select * from orders;


