const { default: mongoose } = require("mongoose");

const bookModel = new mongoose.Schema({
    link: {
        type: String,
        required: [true, "Image is required"],
        match: [
            /(https?:\/\/)(www\.?)?([a-zA-Z0-9-]){2,}(\.[a-zA-Z]{2,6})?(\/([a-zA-Z-_\/.0-9#:?=&;,]*)?)?/,
            "Invalid Image URL",
        ],
    },
    name: {
        type:String,
        trim:true,
        unique:true,
        required:[true,"Name is required"],
        minLength:[3,"Name must be atleast 3 characters long"],
        maxLength:[15,"Name must not exceed 15 characters"],
    },
    author: {
        type:String,
        trim:true,
        required:[true,"Author Name is required"],
        minLength:[3,"Name must be atleast 3 characters long"],
        maxLength:[15,"Name must not exceed 15 characters"],
    },
    description:{
        type:String,
        // trim:true,
        unique:true,
        required:[true,"Description is required"],
        minLength:[6,"Description must be atleast 6 characters long"],
        maxLength:[50,"Name must not exceed 50 characters"],
    },
    page:{
        type:Number,
        required:[true,"Page Number is required"],
    },
    publication:{
        type:String,
        trim:true,
        required:[true,"Publication Name is required"],
        minLength:[3,"Name must be atleast 3 characters long"],
        maxLength:[15,"Name must not exceed 15 characters"],
    },
    year:{
        type:String,
        required:[true,"Year is required"],
    },
    price:{
        type:Number,
        required:[true,"Price is required"],
    },
    date:{
        type:Date,
        default:Date.now,
    },
},{timestamps:true});

module.exports = mongoose.model("book",bookModel);