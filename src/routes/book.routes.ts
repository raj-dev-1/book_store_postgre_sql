import express, { Router } from "express";
import verifyToken from "../middelware/verifyToken";
import { create, list, bookDetails, update, remove, } from "../controllers/book.controller";

const router: Router = express.Router();
router.use(verifyToken);

router.post("/", create);
router.get("/", list);
router.get("/:id", bookDetails);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;
