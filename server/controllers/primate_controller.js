module.exports = {
    getAll: (req, res) => {
        const db = req.app.get('db');
        db.get_primates().then(response => {
            res.send(response)
        })
    },
    create: (req, res) => {
        const db = req.app.get('db');
        console.log(req.body);
        let { name, species, dob, gender, bio, photo_urls, id } = req.body;

        db.create_primate([name, species, dob, gender, bio, `{${photo_urls}}`, id])
            .then(() => res.status(200).send())
            .catch(err => console.log('Err in db.create', err));
    },
    deleteProfile: (req, res) => {
        const db = req.app.get('db');
        let { id } = req.params;
        console.log(req.params)

        db.delete_primate(id).then(() => res.status(200).send());
    }
}