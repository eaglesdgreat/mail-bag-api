"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const nedb_1 = __importDefault(require("nedb"));
const path_1 = __importDefault(require("path"));
class Worker {
    db;
    constructor() {
        this.db = new nedb_1.default({
            filename: path_1.default.join(__dirname, '../databases/contact.db'),
            autoload: true,
        });
    }
    listContacts() {
        return new Promise((resolve, reject) => {
            this.db.find({}, (error, docs) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(docs);
                }
            });
        });
    }
    addContact(contact) {
        return new Promise((resolve, reject) => {
            this.db.insert(contact, (error, newContact) => {
                if (error && !newContact) {
                    reject(error);
                }
                else {
                    resolve(newContact);
                }
            });
        });
    }
    deleteContact(id) {
        return new Promise((resolve, reject) => {
            this.db.remove({ _id: id }, {}, (error, numRemoved) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("");
                }
            });
        });
    }
}
exports.Worker = Worker;
//# sourceMappingURL=Contacts.js.map