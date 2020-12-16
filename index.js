const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./config/db");
const { auth } = require("./middlewares/auth");
const { signup } = require("./routes/signup");
const { login } = require("./routes/login");
const { verify } = require("./routes/verify");
const { profile } = require("./routes/profile");
const { addAccount } = require("./routes/addAccount");
const { getAccounts } = require("./routes/getAccounts");
const { deposit } = require("./routes/deposit");
const { buy } = require("./routes/buy");
const { sell } = require("./routes/sell");
const { send } = require("./routes/send");
const { updateProfile } = require("./routes/updateProfile");
const { changePassword } = require("./routes/changePassword");
const { getHistory } = require("./routes/getHistory");

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
db.authenticate().then(() => console.log("Postgres database connected."));
db.sync({ alter: true });

app.post("/signup", signup);
app.post("/login", login);
app.put("/verify", auth, verify);
app.get("/profile", auth, profile);
app.post("/addAccount", auth, addAccount);
app.get("/getAccounts", auth, getAccounts);
app.put("/deposit", auth, deposit);
app.put("/buy", auth, buy);
app.put("/sell", auth, sell);
app.put("/send", auth, send);
app.put("/updateProfile", auth, updateProfile);
app.put("/changePassword", auth, changePassword);
app.get("/getHistory", auth, getHistory);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
