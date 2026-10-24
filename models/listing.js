const { ref, required, string, number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
    },

    image: [
        {
            url: String,
            filename: String
        }
    ],
    
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
    },
    country: {
        type: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"], // Usually capitalized for GeoJSON standard
            required: true,
        },
        coordinates: {
            type: [Number], // Fixed: Capital 'N' for Mongoose Number type
            required: true,
        },
    },
});

//schema for deleting all reviews after deleting its listing
listingSchema.post("findOneAndDelete", async (listing) =>{
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;                           