import express from 'express';
import userRouter from './user.router.js';
import cityRouter from './city.router.js';
import itineraryRouter from './itinerary.router.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('MyTinerary - Back')
});

router.use('/users', userRouter);

router.use('/cities', cityRouter);

router.use('/itineraries', itineraryRouter);

export default router;