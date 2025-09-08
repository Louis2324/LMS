import Book from "../models/Book.js";

export async function addBook (req,res,next) {
    try {
      const {title ,author,isbn,category,copies} = req.body;
      const book = await Book.create({title ,author,isbn,category,copies})
      if(!book) return res.status(500).json({msg:"Internal Server Error"});
      return res.status(201).json({msg:"Book added to the system"});
    } catch (error) {
        next(error);
    }
}

export async function getBooks (req,res,next) {
    try {
      const books = await Book.find();
      if(!books) return res.status(500).json({msg:"Internal Server Error"});
      return res.status(200).json({msg:"Success", books});
    } catch (error) {
        next(error);
    }
}
export async function getBook (req,res,next) {
    try {
      const book = await Book.findById(req.params.id);
       if (!book) return res.status(404).json({msg:"Book not found"});
       return res.status(200).json({msg:"Book found", book:{
        title: book.title,
        author:book.author,
        isbn : book.isbn,
        category:book.category,
       }})
    } catch (error) {
        next(error);
    }
}

export async function updateBook(req,res,next) {
    try {
     const {author , title , category , copies} = req.body;
     const book = await Book.findById(req.params.id);
     if(!book) res.status(404).json({msg:"Book not found"});
      book.author = author || book.author;
      book.title = title || book.title;
      book.category = category || category.title;
      book.copies = copies || book.copies;
      await book.save();
      res.status(200).json({msg:"Updated Book Information", book});
    } catch (error) {
        next(error);
    }
}

export async function deleteBook(req,res,next) {
    try{
     const book = await Book.findById(req.params.id);
     if(!book) return res.status(404).json({msg:"Book Not Found"});
     await book.deleteOne();
     return res.status(200).json({msg:"Book deleted succesfully"});
    }catch (error){
        next(error);
    }
}

