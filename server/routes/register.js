const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { User, validate } = require('../models/User');
const bcrypt = require('bcrypt');

router.get('/', async (req, res, next) => {
    try {
        let users = await User.find();
        res.send(users);
    } catch (err) {
        next(err);
    }
});

router.get('/read/:id', async (req, res, next) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        if (!user) {
            return res.status(404).send('this user is not exist');
        }
        res.send(user);
    } catch (err) {
        next(err);
    }

});

router.post('/create', async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send("this email is already exist");
        }

        const userName = await User.findOne({ userName: req.body.userName });
        if (userName) {
            return res.status(400).send("this userName is already exist");
        }

        user = new User(_.pick(req.body, [
            'userName',
            'email',
            'phoneNumber',
            'password',
            'role',
        ]));

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();

        const token = user.generateToken();
        res.header('x-auth-token', token).send(_.pick(user, [
            'userName',
            'email',
            'phoneNumber',
            'role'
        ]));
    } catch (err) {
        next(err);
    }


});



module.exports = router;