import { Schema, model, Types } from "mongoose";

let collection = 'cities';

let schema = new Schema({
    city: { type: String, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    language: { type: String, required: true },
    currency: { type: String, required: true },
    religion: { type: String },
    description: { type: String, required: true },
    image: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'users' },
    itinerary: [{ type: Types.ObjectId, ref: 'itineraries' }]
}, {
    timestamps: true
})

let City = model(collection, schema);

export default City;
