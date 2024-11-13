const express = require('express');
const router = express.Router();
const Spots = require('../models/flipmodel');
const path=require('path');
const bodyparser = require('body-parser')


router.use(bodyparser.json());
router.use(bodyparser.urlencoded({ urlencoded: true }));


router.get('/flips', async (req, res) => {

    try {
        const spots = await Spots.find().sort({ date: -1 });//fetch from db 
        res.status(201).json(spots);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


router.post('/flips', async (req, res) => {

    //create instance
    const touristspots = new Spots ({
        title: req.body.title,
        imgUrl: req.body.imgUrl,
        location: req.body.location,
        rating: req.body.rating,
    });

    try {
        const newSpots = await touristspots.save();//save data to db
        res.status(201).json(newSpots);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put('/flips/:id', async (req, res) => {
    try {
        const updatedspot = await Spots.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedspot)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/flips/:id', async (req, res) => {
    try {
        await Spots.findByIdAndDelete(req.params.id);
        res.json({ message: 'deleted' })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})



module.exports = router;