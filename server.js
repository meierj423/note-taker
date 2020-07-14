const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const notes = [
  {
    title: "Ollie",
    text: "Bath, clip nails, walk, give pets",
  },
  {
    title: "Car",
    text: "Get gas, wash, oil change",
  },
];
let noteString = "";
function updateDB() {
  noteString = JSON.stringify(notes);
  fs.writeFileSync("./db/db.json", noteString, function (error) {
    if (error) {
      console.log(error);
      return console.log(error);
    }

    console.log("Success!");
  });
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", function (error, data) {
    if (error) {
      return console.log(error);
    }
    console.log(data);
    return res.json(data);
  });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  notes.push(newNote);
  console.log(noteString);

  updateDB();
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});
