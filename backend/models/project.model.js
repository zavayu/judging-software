import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    tableNumber: {
        type: Number,
    },
    scores: [
        {
            judge: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Judge",
            },
            score: {
                type: Number,
                required: true,
            },
        }
    ],
    timesJudged: {
        type: Number,
        default: 0,
    }
});