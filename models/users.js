import { Schema, model } from "mongoose";

let collection = 'users';

let schema = new Schema({
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String },
    country: { type: String, },
    google: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    verified: { type: Boolean, default: true },
    verified_code: { type: String }
}, {
    timestamps: true
});

let User = model(collection, schema);

export default User;