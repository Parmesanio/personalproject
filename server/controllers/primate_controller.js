module.exports = {
    getAll: (req, res) => {
        const db = req.app.get('db');
        db.get_primates().then(response => {
            res.send(response)
        })
    },
    create: (req, res) => {
        console.log(req.body);
    }
}