const moment = require("moment");

module.exports = app => {
    app.get("/api/notes", function (req, res) {
        let newNote = req.body;
        notes[uniqueId++] = newNote;

        return console.log("Added new note: " + newNote.title)
    });

    app.get("/api/notes/:id", function(req, res) {
        res.json(notes[req.params.id]);
    })

    app.delete("/api/notes/:id", function(req, res) {
        delete notes [req.params.id];
        updateDb();
        console.log("Deleted note with id " + req.params.id);
    });

    function updateDb() {
        false.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) return console.log(err);
            return true;
        });
    }
}