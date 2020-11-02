const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
    try {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!req.body.firstName) {
            return res.json({
                status: "Enter your first name.",
            });
        }

        if (!req.body.lastName) {
            return res.json({
                status: "Enter your last name.",
            });
        }

        if (!req.body.email || !req.body.email.match(emailRegex)) {
            return res.json({ status: "Enter a valid email address." });
        }

        if (!req.body.password || req.body.password.length < 6) {
            return res.json({
                status: "Password must be at least 6 characters.",
            });
        }

        const emailTaken = await User.findOne({
            where: { email: req.body.email },
        });

        if (emailTaken) {
            return res.json({ status: "Email already taken." });
        }

        const salt = await bcrypt.genSalt(10);
        const bcryptPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcryptPassword,
        });

        const payload = {
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        };

        const token = jwt.sign(payload, process.env.jwtSecret);

        return res.json({ token, user: newUser });
    } catch (error) {
        console.log(error);
        return res.json({ status: "Signup failed." });
    }
};
