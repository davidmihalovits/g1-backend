const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
db.sync();
const { auth } = require("./middlewares/auth");
const { signup } = require("./routes/signup");
const { login } = require("./routes/login");
const { profile } = require("./routes/profile");
const { addAccount } = require("./routes/addAccount");
const { getAccounts } = require("./routes/getAccounts");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.authenticate().then(() => console.log("Postgres database connected."));
db.sync();

app.post("/signup", signup);
app.post("/login", login);
app.get("/profile", auth, profile);
app.post("/addAccount", auth, addAccount);
app.get("/getAccounts", auth, getAccounts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
