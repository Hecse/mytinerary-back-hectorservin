import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';
import { validator } from '../middlewares/validator.js';
import { createItinerarySchema } from '../schema/itinerary.schema.js';
import passport from '../middlewares/auth/passport.js';

const router = express.Router();

const { getItineraries, createItinerary, geItineraryById, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validator(createItinerarySchema),
    createItinerary);

router.get('/:id', geItineraryById);

router.put('/:id',
    passport.authenticate('jwt', { session: false }),
    updateItinerary);

router.delete('/:id',
    passport.authenticate('jwt', { session: false }),
    deleteItinerary);

export default router;