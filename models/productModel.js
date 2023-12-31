const { Schema, model } = require("mongoose")

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please Enter product Name"],
        trim: true,
    },
    specification: [
        {
            heading: {
                type: String,
            },
            details: [
                {
                    name: {
                        type: String
                    },
                    spec: {
                        type: String
                    }
                },
            ]
        },
    ],

    description: {
        type: String,
        required: [true, "Please Enter product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter product Price"],
        maxLength: [8, "Price cannot exceed 8 characters"],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    sold: {
        type: Number,
        default: 0,
    },
        numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            order: {
                type: String,
                required: true,
            },
            name: {
                type: String,
                required: true,
            },
            image: {
                type: String,
                required: true,
            },
            reviewDate: {
                type: Object,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                default: ""
            },
        },
    ],

    user: {
        type: Schema.ObjectId,
        ref: "User",
        required: true,
    },
    createDate: {
        type: Object,
    },
    updateDate: {
        type: Object,
    }
}, {timestamps: true})

const Product = model('Product', productSchema)

module.exports = Product;