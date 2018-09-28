module.exports = {
    getAllProducts: (req, res) => {
        const db = req.app.get('db');
        db.get_products().then(response => {
            res.send(response)
        })
    },
    createProduct: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        let { name, price, product_url, sizes, dimensions, description, in_stock, admin_id } = req.body
        db.create_product([name, price, product_url, sizes, `{${dimensions}}`, description, in_stock, admin_id])
            .then(() => res.status(200))
            .catch(err => console.log('Err in db.create_product', err));
        
    },
    updateProduct: (req, res) => {
        const db = req.app.get('db');
        let { name, price, product_url, sizes, dimensions, description, in_stock} = req.body
        let { id } = req.params;
        db.update_product([id, name, price, sizes, `{${dimensions}}`, description, in_stock, product_url])
            .then(() => res.status(200))
            .catch(err => console.log('Err in db.update_product', err));
    }
}