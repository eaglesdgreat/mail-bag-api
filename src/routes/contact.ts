import { allContacts, createContact, deleteContactById } from "../controllers/contact";
import express, { Router } from "express";

const router: Router = express.Router();

router.get('/', allContacts);
router.post('/', createContact);
router.get('/:id', deleteContactById);

export default router;
