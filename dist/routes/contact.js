"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contact_1 = require("../controllers/contact");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', contact_1.allContacts);
router.post('/', contact_1.createContact);
router.get('/:id', contact_1.deleteContactById);
exports.default = router;
//# sourceMappingURL=contact.js.map