drop table if exists admin;
drop table if exists primates;

create table admin (
id serial primary key,
auth0id text unique not null,
email text
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

insert into primates
(name, species, dob, gender, bio, photo_urls, admin_id)
values
('Webster', 'White-handed Lar Gibbon', 'December 2003', 'Male', 'Webster came from a loving home where was well cared for and was a member of the family. Unfortunately, as with all gibbons when they mature, he developed a full gibbon call and created a problem in his residential neighborhood. Webster came here to live with us, where his call blends with those of our other gibbons. Now in the mornings, he joins in the morning chorus of gibbon song.', '{http://talkinmonkeysproject.org/wp-content/uploads/2016/06/12274338_10205036333325159_1396944792172780858_n.jpg, http://talkinmonkeysproject.org/wp-content/uploads/2016/06/meetwebster.jpg}', 1);

-- select admin.id, admin.email, name, species, dob, gender, bio, photo_urls, admin_id from primates
-- join admin on (admin.id = admin_id);

select * from admin;
select * from primates;


