"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contact_1 = __importDefault(require("./routes/contact"));
const mailbox_1 = __importDefault(require("./routes/mailbox"));
const message_1 = __importDefault(require("./routes/message"));
const app = (0, express_1.default)();
const port = 1337;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(function (inRequest, inResponse, inNext) {
    inResponse.header("Access-Control-Allow-Origin", "*");
    inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
    inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
    inNext();
});
// MailBox Endpoints
app.use('/api/mailboxes', mailbox_1.default);
// Message Endpoints
app.use('/api/messages', message_1.default);
// Contact Endpoints
app.use('/api/contacts', contact_1.default);
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
//# sourceMappingURL=index.js.map