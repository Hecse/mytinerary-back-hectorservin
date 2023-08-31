import City from "../models/cities.js"

const controller = {
    getCity: async (req, res) => {
        let queries = {}

        if (req.query.city) {
            queries.city = new RegExp(`^${req.query.city}`, 'i')
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

            return res.status(500).json({
                success: false,
                message: 'Error getting cities'
            })
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

            return res.status(500).json({
                success: false,
                message: 'Error getting city'
            })
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

            res.status(500).json({
                success: false,
                message: 'Error creating city'
            })
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

            return res.status(500).json({
                success: false,
                message: 'Failed to update city'
            })
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

            return res.status(500).json({
                success: false,
                message: 'Failed to delete city'
            })
        }
    }
}

export default controller;