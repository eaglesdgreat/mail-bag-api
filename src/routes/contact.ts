import {
  allContacts,
  createContact,
  deleteContactById,
  updateContact
} from "../controllers/contact";
import express, { Router } from "express";

const router: Router = express.Router();

router.get('/', allContacts);
router.post('/', createContact);
router.put('/', updateContact);
router.delete('/:id', deleteContactById);

export default router;
