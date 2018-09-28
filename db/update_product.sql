update products
set name = $2, price = $3, sizes = $4, dimensions = $5, description = $6, in_stock = $7, product_url = $8
where id = $1;