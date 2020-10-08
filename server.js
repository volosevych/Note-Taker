const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

fs.readFile("db/db.json", "json", function(data) {
    var notes = data;
})

require("routes/APIroutes")(app);

app.listen(PORT, function() {
    console.log("App lostening on http://localhost:" + PORT);
})