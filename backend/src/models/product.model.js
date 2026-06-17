import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true,
            enum: ['INR', 'USD', 'EUR', 'GBP'],
            default: 'INR'
        }
    },
    images: {
        type: [{
            url: {
                type: String,
                required: true
            },
            fileId: {
                type: String
            }
        }],
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['SHIRTS', 'DENIM', 'ACCESSORIES', 'ESSENTIALS'],
        default: 'ESSENTIALS'
    },
    
    
    seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
}, { timestamps: true })

export const Product = mongoose.model("Product", productSchema)
