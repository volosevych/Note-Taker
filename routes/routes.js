const fs = require("fs");
const path = require("path");

module.exports = app => {

   fs.readFile("db/db.json", "utf8", (err, data) => {
       if(err) throw err;

        var notes = JSON.parse(data);

        app.get("/api/notes", function (req, res) {
            res.json(notes);
        });

        app.post("/app/notes", function (req, res) {
            let newNote = req.body;
            notes.push(newNote);

            updateDb()

            return console.log("Added new note " + newNote.title);
        });

        app.get("/api/notes/:id", function (req, res) {
            res.json(notes[req.params.id]);
        });

        app.delete("/api/notes/:id", function (req, res) {
            delete notes[req.params.id];
            updateDb();
            console.log("Deleted note with id " + req.params.id);
        });


        // ROUTES
        app.get("/notes", function (req, res) {
            res.sendFile(path.json(__dirname, "../public/notes.html"));
        });

        app.get('*', function (req, res) {
            res.sendFile(path.json(__dirname, "../public/index.html"));
        });


        //Update the json file
        function updateDb() {
            fs.writeFile("db/db.json", JSON.stringify(notes, '\t', err => {
                if (err) {
                    console.log(err)
                }
            }))
        }
    })
}