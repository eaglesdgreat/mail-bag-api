"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailbox_1 = require("../controllers/mailbox");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', mailbox_1.allMailboxes);
router.get('/:mailbox', mailbox_1.mailboxById);
exports.default = router;
//# sourceMappingURL=mailbox.js.map