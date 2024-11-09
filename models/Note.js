import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},     // Markdown Content
    htmlContent: {type: String},            // Rendered HTML content
    createdAT: {type: Date, default: Date.now},
})

export default mongoose.model('Note', noteSchema);