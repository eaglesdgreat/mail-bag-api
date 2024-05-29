"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Worker = void 0;
const ImapClient = require("emailjs-imap-client");
const mailparser_1 = require("mailparser");
// Tells node to skip checking certificate validation with TLS
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
class Worker {
    static serverInfo;
    constructor(inServerInfo) {
        Worker.serverInfo = inServerInfo;
    }
    async connectToServer() {
        const client = new ImapClient.default(Worker.serverInfo.imap.host, Worker.serverInfo.imap.port, { auth: Worker.serverInfo.imap.auth });
        client.logLevel = client.LOG_LEVEL_NONE;
        client.onerror = (error) => {
            console.log("IMAP.Worker.listMailboxes(): Connection error", error);
        };
        await client.connect();
        return client;
    }
    async listMailboxes() {
        const client = await this.connectToServer();
        const mailboxes = await client.listMailboxes();
        await client.close();
        const finalMailboxes = [];
        const iterateChildren = (arr) => {
            arr.forEach((value) => {
                finalMailboxes.push({
                    name: value.name,
                    path: value.path
                });
                iterateChildren(value.children);
            });
        };
        iterateChildren(mailboxes.children);
        return finalMailboxes;
    }
    async listMessages(option) {
        const client = await this.connectToServer();
        const mailbox = await client.selectMailbox(option.mailbox);
        if (mailbox.exists === 0) {
            await client.close();
            return [];
        }
        const messages = await client.listMessages(option.mailbox, "1:*", ["uid", "envelop"]);
        await client.close();
        const finalMessages = [];
        messages.forEach((message) => {
            finalMessages.push({
                id: message.uid,
                date: message.envelop.date,
                from: message.envelop.from[0].address,
                subject: message.envelop.subject,
            });
        });
        return finalMessages;
    }
    async getMessageBody(option) {
        const client = await this.connectToServer();
        const messages = await client.listMessages(option.mailbox, option.id, ["body[]"], { byUid: true });
        const parsed = await (0, mailparser_1.simpleParser)(messages[0]["body[]"]);
        await client.close();
        return parsed.text;
    }
    async deleteMessages(option) {
        const client = await this.connectToServer();
        await client.deleteMessages(option.mailbox, option.id, { byUid: true });
        await client.close();
    }
}
exports.Worker = Worker;
//# sourceMappingURL=IMAP.js.map