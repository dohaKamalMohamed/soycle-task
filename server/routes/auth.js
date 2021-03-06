const express = require('express');
const router = express.Router();
const joi = require('joi');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        };
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).send('invalid email or password');
        };
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(404).send('invalid email or password');
        }

        const token = user.generateToken();
        res.header('x-auth-token', token).send(_.pick(user, [
            'email',
            'token',
            'password',
            'userName',
            'role',
        ]));
    } catch (err) {
        next(err);
    }


});

function validate(req) {
    const schema = {
        email: joi.string().required().min(3).max(225).email({ minDomainAtoms: 2 }),
        password: joi.string().required().regex(/^([a-zA-Z-0-9]*)$/),
    }
    return joi.validate(req, schema);
}

module.exports = router;