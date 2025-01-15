import mongoose, { mongo } from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
    }
},
{
    timestamps: true
});



const Category = mongoose.model("Category", categorySchema)

export default Category