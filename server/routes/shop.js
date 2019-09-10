const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Shop, validate } = require('../models/shop');




router.get('/', async (req, res, next) => {
    try {
        let shops = await Shop.find();
         return  res.send(shops);
    } catch (err) {
        next(err)
    }
});

router.get('/read/:id', async (req, res, next) => {
    try {
        let shop = await Shop.findOne({ _id: req.params.id });
        if (!shop) {
            return res.status(404).send('this user is not exist');
        }
        return res.send(shop);
    } catch (err) {
        next(err)
    }
});

router.post('/create', async (req, res, next) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let shop = new Shop(_.pick(req.body, [
            'shopName',
            'shopBody',
        ]));
        await shop.save();
        return res.send(shop);

    } catch (err) {
        next
            (err)
    }
});

router.put('/update/:id', async (req, res, next) => {

    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        };

        let shop = await Shop.findOneAndUpdate({ _id: req.params.id }, _.pick(req.body, [
            'shopName',
            'shopBody',
        ]));

        if (!shop) {
            return res.status(404).send('this shop is not exist');
        }

       return res.send(shop);
    } catch (err) {
        next(err)
    }

});


router.delete('/delete/:id', async (req, res, next) => {

    try {
        let shop = await Shop.findOneAndDelete({ _id: req.params.id });

        if (!shop) {
            return res.status(400).send('this shop is not exist');
        }

        res.send(shop);
    } catch (err) {
        next(err)
    }

});

module.exports = router;