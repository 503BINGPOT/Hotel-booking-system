const express = require("express");
const app = express();
const path = require("path");
const roomRouter = require("./routes/roomRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/api", roomRouter);

app.get("/", (req, res) => {
  res.render("index"); 
});

app.listen(process.env.PORT || 3000);
