const fs = require("fs");
const util = require("util");
const path = require("path");

module.exports = app => {
   var readFileAsync = util.promisify(fs.readFile);

   readFileAsync("db/db.json", "utf8").then(function(data) {
       var notes = JSON.parse(data);
       var uniqueId = notes.length;

       app.get("/api/notes", function(req, res) {
           res.json(notes);
       });

       app.post("/app/notes", function(req, res) {
           let newNote = req.body;
           notes[uniqueId++] = newNote;

           updateDb()

           return console.log("Added new note " + newNote.title);
       });

       app.get ("/api/notes/:id", function (req, res) {
           res.json(notes[req.params.id]);
       });

       app.delete("/api/notes/:id", function(req, res) {
           delete notes [req.params.id];
           updateDb();
           console.log("Deleted note with id " + req.params.id);
       });

       app.get("/notes", function (req, res) {
           res.sendFile(path.json(__dirname, "../public/notes.html"));
       });

       app.get('*', function (req, res) {
           res.sendFile(path.json(__dirname, "../public/index.html"));
       });

       function updateDb() {
           fs.writeFile("db/db.json", JSON.stringify(notes, '\t', err => {
               if (err) {
                   console.log(err)
               }
           }))
       }
   })
}