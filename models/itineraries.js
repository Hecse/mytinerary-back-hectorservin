import { Schema, model, Types } from "mongoose";

let collection = 'itineraries';

let schema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    hashtag: { type: String },
    city: { type: String, required: true },
    user: { type: Types.ObjectId, ref: 'users' },
}, {
    timestamps: true
})

let Itineraries = model(collection, schema);

export default Itineraries;