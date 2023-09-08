import City from "../models/cities.js"
import removeAccents from "remove-accents";

const controller = {
    getCity: async (req, res) => {
        let queries = {}

        if (req.query.city) {
            const normalizedCity = removeAccents(req.query.city.trim());
            queries.city = new RegExp(`^${normalizedCity}`, 'i');
        }

        if (req.query.country) {
            queries.country = req.query.country
        }

        try {
            const cities = await City.find(queries)
                .populate('user')
                .populate({
                    path: 'itinerary',
                    populate: { path: 'user' } 
                });

            if (cities.length > 0) {
                return res.status(200).json({
                    success: true,
                    cities: cities
                })
            }

            return res.status(404).json({
                success: false,
                message: 'No cities found'
            })

        } catch (error) {
            next(error)
        }
    },

    getCityById: async (req, res) => {
        try {
            console.log(req.params)
            const oneCity = await City.findById(req.params.id)
            .populate('user')
            .populate({
                path: 'itinerary',
                populate: { path: 'user' } 
            });

            if (oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                })
            }

            return res.status(404).json({
                success: false,
                message: 'City not found'
            })

        } catch (error) {
            next(error)
        }
    },

    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'City created',
            })

        } catch (error) {
            next(error)
        }
    },

    updateCity: async (req, res) => {
        try {
            await City.updateOne({ _id: req.params.id }, req.body)

            return res.status(200).json({
                success: true,
                message: 'Updated city',
            })

        } catch (error) {
            next(error)
        }
    },

    deleteCity: async (req, res) => {
        try {
            await City.deleteOne({ _id: req.params.id }, req.body)

            return res.status(200).json({
                success: true,
                message: 'Deleted city',
            })

        } catch (error) {
            next(error)
        }
    }
}

export default controller;