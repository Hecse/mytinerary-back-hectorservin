import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js';
import { validator } from '../middlewares/validator.js';
import {createItinerarySchema} from '../schema/itinerary.schema.js'

const router = express.Router();

const { getItineraries, createItinerary, geItineraryById, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);

router.post('/', validator(createItinerarySchema), createItinerary);

router.get('/:id', geItineraryById);

router.put('/:id', updateItinerary);

router.delete('/:id', deleteItinerary);

export default router;