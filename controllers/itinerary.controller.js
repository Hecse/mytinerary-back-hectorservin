import Itineraries from "../models/itineraries.js";

const controller = {
    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itineraries.find(req.body).populate('user');

            return res.status(200).json({
                success: true,
                itineraries: itineraries,
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error getting itineraries'
            })
        }
    },

    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itineraries.create(req.body);

            return res.status(200).json({
                success: true,
                message: 'Itinerary created',
            })

        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error creating itinerary'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error getting itinerary'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Failed to update itinerary'
            })
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
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Failed to delete itinerary'
            })
        }
    },
}

export default controller;