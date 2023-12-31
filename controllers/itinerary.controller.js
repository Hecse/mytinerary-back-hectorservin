import Itineraries from "../models/itineraries.js";

const controller = {
    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itineraries.create(req.body);
    
            return res.status(200).json({
                success: true,
                message: 'Itinerary created',
            })
    
        } catch (error) {
            next(error)
        }
    },

    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itineraries.find(req.body).populate('user');

            return res.status(200).json({
                success: true,
                itineraries: itineraries,
            })
        } catch (error) {
            next(error)
        }
    },

    geItineraryById: async (req, res) => {
        try {
            console.log(req.params)
            const oneItinerary = await Itineraries.findById(req.params.id)

            if (oneItinerary) {
                return res.status(200).json({
                    success: true,
                    user: oneItinerary
                })
            }

            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            })

        } catch (error) {
            next(error)
        }
    },

    updateItinerary: async (req, res) => {
        try {
            await Itineraries.updateOne({_id: req.params.id}, req.body)

            return res.status(200).json({
                success: true,
                message: 'Updated itinerary',
            })

        } catch (error) {
            next(error)
        }
    },

    deleteItinerary: async (req, res) => {
        try {
            await Itineraries.deleteOne({_id: req.params.id}, req.body)

            return res.status(200).json({
                success: true,
                message: 'Deleted itinerary',
            })

        } catch (error) {
            next(error)
        }
    },
}

export default controller;