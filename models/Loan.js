import mongoose from "mongoose";
const loanSchema = mongoose.Schema({
    user: {type: mongoose.Types.ObjectId , ref:"User", required:true},
    book: {type:mongoose.Types.ObjectId, ref:"Book", required:true},
    borrowedAt: {type:Date,required:true},
    dueDate: {type:Date,required:true},
    returnDate:{type:Date,default:null},
},{timestamps:true});

const Loan = mongoose.model("Loan",loanSchema);
export default Loan;