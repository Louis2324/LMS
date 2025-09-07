import express from "express";
import { getBook,getBooks,addBook,updateBook,deleteBook } from "../controllers/bookController";
const router = express.Router();

router.get("/",getBooks);
router.get("/:id",getBook);
router.post("/",addBook);
router.put("/:id",updateBook);
router.delete("/:id",deleteBook);