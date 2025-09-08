import express from "express";
import { getBook,getBooks,addBook,updateBook,deleteBook } from "../controllers/bookController.js";
import { validate } from "../middleware/validator.js";
import { bookValidatorSchema,updateValidatorSchema } from "../validators/bookValidator.js";
const router = express.Router();

router.get("/",getBooks);
router.get("/:id",getBook);
router.post("/",validate(bookValidatorSchema),addBook);
router.put("/:id",validate(updateValidatorSchema),updateBook);
router.delete("/:id",deleteBook);

export default router;