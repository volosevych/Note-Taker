const express = require("express");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

require("./routes/routes")(app);

app.listen(PORT, function() {
    console.log("App lostening on http://localhost:" + PORT);
})