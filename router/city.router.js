import express from 'express';
import cityController from '../controllers/city.controller.js';

const router = express.Router();

const { getCity, createCity, getCityById, updateCity, deleteCity } = cityController;

router.get('/', getCity)

router.post('/', createCity)

router.get('/:id', getCityById)

router.put('/:id', updateCity)

router.delete('/:id', deleteCity)

export default router;