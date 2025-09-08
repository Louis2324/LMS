import Book from "../models/Book.js";
import Loan from "../models/Loan.js";
const BORROW_DAYS = 14;

export const borrowBook = async (req,res,next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;

        const activeLoans = Loan.countDocuments({user: userId , returnDate:null });
        if(activeLoans>=3) return res.status(403).json({msg:"You cannot borrow more than 3 books"});
        const book = await Book.findById(bookId);
        if(!book) return res.status(404).json({msg:"Book not found"});
        const totalLoansForBook = Loan.countDocuments({book:bookId,returnDate: null});
        if(totalLoansForBook >= book.copies) return res.status(409).json({msg:"No available copies for borrowing"});
    
        const due = new Date();
        due.setDate( due.getDate() + BORROW_DAYS);

        const loan = await Loan.create({
            user:userId,
            book:bookId,
            borrowedAt: Date.now(),
            dueDate:due,
        })
        return res.status(200).json({msg:"Borrowed Book Succesfully"},loan);
    } catch (error) {
        next(error);
    }
};

export const returnBook = async (req,res,next) => {
 try {
    const bookId = req.params.id;
    const userId = req.user.id;
    const loan = await Loan.findOne({book:bookId,user:userId,returnDate:null});
    if(!loan) return res.status(403).json({msg:"Can not return a book you didn't borrow"});
    loan.returnDate = new Date();
    await loan.save();
    return res.status(200).json({msg:"Book returned successfully",loan});
 } catch (error) {
    next(error);
 }
};