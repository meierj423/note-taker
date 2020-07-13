const express = require("express");
const path = require("path");

const app = express();
var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
  });

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
  });


  const notes = [
    {
      title: "title1",
      text: "text1",
    },
    {
      title: "title2",
      text: "text2",
    },
    {
      title: "title3",
      text: "text3",
    }
  ];


app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });