import City from "../models/cities.js"

const controller = {
    getCity: async (req, res) => {

        console.log(req.query)

        let queries = {}

        if (req.query.city) {
            queries.city = new RegExp(`^${req.query.city}`, 'i')
        }

        if (req.query.country) {
            queries.country = req.query.country
        }

        try {
            const cities = await City.find(queries).populate('user');

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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error getting the cities'
            })
        }
    },

    getCityById: async (req, res) => {        
        try {
            //console.log(req.params)
            const oneCity = await City.findById(req.params.id)

            if(oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                })
            }

            return res.status(404).json({
                success: false,
                message: 'city not found'
            })
            
        } catch (error) {
            console.log(error)
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error creating city'
            })
        }
    }
}

export default controller;