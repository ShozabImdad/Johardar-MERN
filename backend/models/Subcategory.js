import mongoose from 'mongoose'


const SubcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});


const Subcategory = mongoose.model("Subcategory", SubcategorySchema);


export default Subcategory;