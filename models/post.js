const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema =new Schema (
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

//Exportei para o mundo lá fora...
module.exports = mongoose.model('Post', postSchema);