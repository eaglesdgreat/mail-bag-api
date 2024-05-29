import express, { Express, NextFunction, Request, Response } from "express";

import contactsRouter from "./routes/contact";
import mailsRouter from "./routes/mailbox";
import messagesRouter from "./routes/message";

const app: Express = express();
const port = 1337;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(inRequest: Request, inResponse: Response, inNext:NextFunction) {
  inResponse.header("Access-Control-Allow-Origin", "*");
  inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
  inResponse.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");

  inNext();
})

// MailBox Endpoints
app.use('/api/mailboxes', mailsRouter);

// Message Endpoints
app.use('/api/messages', messagesRouter);

// Contact Endpoints
app.use('/api/contacts', contactsRouter);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
