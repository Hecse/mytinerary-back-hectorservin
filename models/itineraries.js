import { Schema, model, Types } from "mongoose";

let collection = 'itineraries';

let schema = new Schema({
    name: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: String, required: true },
    duration: { type: String, required: true },
    hashtag: {type: String},
    user: { type: Types.ObjectId, ref: 'users' },
}, {
    timestamps: true
})

let Itineraries = model(collection, schema);

export default Itineraries;