import mongoose from "mongoose";

const judgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    judgeID: {
        type: String,
        unique: true,
        required: true,
    },
    assignedProjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        }
    ],
    role: {
        type: String,
        enum: ["judge", "admin"],
        default: "judge",
    },
    password: {
        type: String,
    }
});

const Judge = mongoose.model("Judge", judgeSchema);
export default Judge;