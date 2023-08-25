import Itinerary from "../models/itineraries.js";

const controller = {
    getItineraries: async (req, res) => {
        try {
            const itineraries = await Itinerary.find(req.body);

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
            const newItinerary = await Itinerary.create(req.body);

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
            const oneItinerary = await Itinerary.findById(req.params.id)

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
            await Itinerary.updateOne({_id: req.params.id}, req.body)

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
            await Itinerary.deleteOne({_id: req.params.id}, req.body)

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