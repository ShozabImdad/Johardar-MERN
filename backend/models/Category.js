import mongoose, { mongo } from 'mongoose'

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Add virtual for subcategories
categorySchema.virtual('subcategories', {
    ref: 'Subcategory',
    localField: '_id',
    foreignField: 'category'
});

const Category = mongoose.model("Category", categorySchema)

export default Category