import express from "express";
import { getBook,getBooks,addBook,updateBook,deleteBook } from "../controllers/bookController.js";
import { validate } from "../middleware/validator.js";
import { bookValidatorSchema,updateValidatorSchema } from "../validators/bookValidator.js";
import { borrowBook ,returnBook } from "../controllers/loanController.js";
import { authenticateUser , authorizeRoles} from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/",authenticateUser,getBooks);
router.get("/:id",authenticateUser,getBook);
router.post("/",authenticateUser,authorizeRoles("admin"),validate(bookValidatorSchema),addBook);
router.put("/:id",authenticateUser,authorizeRoles("admin"),validate(updateValidatorSchema),updateBook);
router.delete("/:id",authenticateUser,authorizeRoles("admin"),deleteBook);

router.put("/:id/borrow",authenticateUser,borrowBook);
router.put("/:id/return",authenticateUser,returnBook);

export default router;