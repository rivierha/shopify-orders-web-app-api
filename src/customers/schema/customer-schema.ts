import * as mongoose from 'mongoose';

export const CustomerSchema = new mongoose.Schema({
    email: String,
    first_name: String,
    last_name: String,
    phone: Number,
    default_address: {},
    createdAt: Date,
    modifiedAt: Date,
});
