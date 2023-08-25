import { Schema, model, Types } from "mongoose";

let collection = 'itineraries';

let schema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
}, {
    timestamps: true
})

let Itineraries = model(collection, schema);

export default Itineraries;