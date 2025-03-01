import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    team: {
        type: String,
    },
    table: {
        type: Number,
    },
    scores: [
        {
            judge: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Judge",
            },
            score: {
                type: String,
                required: true,
            },
        }
    ],
    timesJudged: {
        type: Number,
        default: 0,
    }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;