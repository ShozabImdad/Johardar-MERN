import mongoose, { mongo } from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subcategories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subcategory"
        }
    ]
},
{
    timestamps: true
});



const Category = mongoose.model("Category", categorySchema)