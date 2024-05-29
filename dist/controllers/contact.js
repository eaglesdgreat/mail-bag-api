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
exports.deleteContactById = exports.createContact = exports.allContacts = void 0;
const Contacts = __importStar(require("../services/Contacts"));
const allContacts = async (req, res) => {
    try {
        const contactWorker = new Contacts.Worker();
        const contacts = await contactWorker.listContacts();
        res.json(contacts);
    }
    catch (error) {
        res.json({ error });
    }
};
exports.allContacts = allContacts;
const createContact = async (req, res) => {
    try {
        const contactWorker = new Contacts.Worker();
        const contact = await contactWorker.addContact(req.body);
        res.json(contact);
    }
    catch (error) {
        res.json({ error });
    }
};
exports.createContact = createContact;
const deleteContactById = async (req, res) => {
    try {
        const contactWorker = new Contacts.Worker();
        await contactWorker.deleteContact(req.params.id);
        res.send('ok');
    }
    catch (error) {
        res.json({ error });
    }
};
exports.deleteContactById = deleteContactById;
//# sourceMappingURL=contact.js.map