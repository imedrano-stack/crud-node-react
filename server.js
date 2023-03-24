const express = require("express");
const cors = require("cors");

const path = __dirname + "/app/views/";
const app = express();

app.use(express.static(path));

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// app.get("/", (req, res) => {
//   res.json({ message: "Bienvenido a la aplicacion de Ivancho" });
// });
app.get("/", function (req, res) {
  res.sendFile(path + "index.html");
});

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
