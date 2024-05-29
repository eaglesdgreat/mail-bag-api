"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMessage = exports.deleteMailboxMessageById = exports.getMailboxMessageById = void 0;
const IMAP = __importStar(require("../services/IMAP"));
const SMTP = __importStar(require("../services/SMTP"));
const ServerInfo_1 = require("../config/ServerInfo");
const getMailboxMessageById = async (req, res) => {
    try {
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        const messageBody = await imapWorker.getMessageBody({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send(messageBody);
    }
    catch (error) {
        res.json({ error });
    }
};
exports.getMailboxMessageById = getMailboxMessageById;
const deleteMailboxMessageById = async (req, res) => {
    try {
        const imapWorker = new IMAP.Worker(ServerInfo_1.serverInfo);
        await imapWorker.deleteMessages({
            mailbox: req.params.mailbox,
            id: parseInt(req.params.id, 10)
        });
        res.send('ok');
    }
    catch (error) {
        res.json({ error });
    }
};
exports.deleteMailboxMessageById = deleteMailboxMessageById;
const createMessage = async (req, res) => {
    try {
        const smtpWorker = new SMTP.Worker(ServerInfo_1.serverInfo);
        await smtpWorker.sendMessage(req.body);
        res.send('ok');
    }
    catch (error) {
        res.json({ error });
    }
};
exports.createMessage = createMessage;
//# sourceMappingURL=message.js.map