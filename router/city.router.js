import express from 'express';
import cityController from '../controllers/city.controller.js';

const router = express.Router();

const {getCity, createCity, getCityById} = cityController;

router.get('/', getCity)

router.get('/:id', getCityById)

router.post('/', createCity)

export default router;