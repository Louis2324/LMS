import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    title:{type:String,required:true},
    author:{type:String,required:true},
    isbn: {type:String , required:true, sparse:true},
    category:{type:String,required:true},
    copies: {type:Number, required:true,min:1},
    availableCopies:{type:Number, default: function () { return this.copies}},
    borrowedBy:{type:mongoose.Schema.Types.ObjectId, ref:"user",default:null},
    dueDate:{type:Date,default:null},
},{timestamps:true});

const Book = mongoose.model('Book',bookSchema)
export default Book;
