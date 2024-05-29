"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../controllers/message");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/:mailbox/:id', message_1.getMailboxMessageById);
router.delete('/:mailbox/:id', message_1.deleteMailboxMessageById);
router.post('/:', message_1.createMessage);
exports.default = router;
//# sourceMappingURL=message.js.map