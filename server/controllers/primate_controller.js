module.exports = {
    getAll: (req, res) => {
        const db = req.app.get('db');
        db.get_primates().then(response => {
            res.send(response)
        })
    },
    create: (req, res) => {
        console.log(req.body);
    },
    deleteProfile: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        console.log(req.params)

        db.delete_primate(id).then(() => res.status(200).send());
    }
}