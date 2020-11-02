const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.body.email },
        });

        if (!user) {
            return res.json({ status: "Invalid credentials." });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.json({ status: "Invalid credentials." });
        }

        const payload = {
            user: {
                id: user.id,
                email: user.email,
            },
        };

        const token = jwt.sign(payload, process.env.jwtSecret);

        return res.json({ token, user });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Login failed." });
    }
};
