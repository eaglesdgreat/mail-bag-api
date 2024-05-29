import { allMailboxes, mailboxById } from "../controllers/mailbox";
import express, { Router } from "express";

const router: Router = express.Router();

router.get('/', allMailboxes);
router.get('/:mailbox', mailboxById);

export default router;