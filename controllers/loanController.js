import Book from "../models/Book.js";
const BORROW_DAYS = 14;

export const borrowBook = async (req,res,next) => {
    try {
        const bookId = req.params.id;
        const userId = req.user.id;
        const due = new Date();
        due.setDate(due.getDate() + BORROW_DAYS);

        const book = await Book.findOneAndUpdate(
        {_id:bookId,availableCopies: {$gt:0} , borrowedBy: null},
        {
         $inc:{availableCopies: -1},
         $set:{borrowedBy:userId , dueDate: due},
        },
        {new:true}
        ).populate("borrowedBy","name email");

        if(!book) return res.status(409).json({msg:"Book Not Available To Borrow"});

        return res.status(200).json({msg:"Book borrowed successfully"});
    } catch (error) {
        next(error);
    }
};

export const returnBook = async (req,res,next) => {
 try {
    const bookId = req.params.id;
    const userId = req.user.id;

    const book = await Book.findOneAndUpdate(
        {_id:bookId , borrowedBy: userId},
        {
            $inc: {availableCopies:1},
            $set:{borrowedBy:null,dueDate:null},
        },
        {new:true}
    );
    if(!book) return res.status(403).json({msg:"Cannot return book"});
    return res.status(200).json({msg:"Book returned succesfully",book});

 } catch (error) {
    next(error);
 }
};