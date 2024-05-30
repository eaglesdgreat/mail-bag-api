import {
  createMessage,
  deleteMailboxMessageById,
  getMailboxMessageById
} from "../controllers/message";
import express, { Router } from "express";

const router: Router = express.Router();

router.post('/', createMessage);
router.get('/:mailbox/:id', getMailboxMessageById);
router.delete('/:mailbox/:id', deleteMailboxMessageById);

export default router;
