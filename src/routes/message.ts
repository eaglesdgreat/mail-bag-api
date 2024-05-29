import {
  createMessage,
  deleteMailboxMessageById,
  getMailboxMessageById
} from "../controllers/message";
import express, { Router } from "express";

const router: Router = express.Router();

router.get('/:mailbox/:id', getMailboxMessageById);
router.delete('/:mailbox/:id', deleteMailboxMessageById);
router.post('/:', createMessage);

export default router;
