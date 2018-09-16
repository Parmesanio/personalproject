update primates
set name = $2, species = $3, dob = $4, gender = $5, bio = $6, photo_urls = $7, admin_id = $8
where id = $1;