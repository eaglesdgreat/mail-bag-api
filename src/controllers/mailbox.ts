import * as IMAP from "../services/IMAP"

import { Request, Response } from "express";

import { serverInfo } from "../config/ServerInfo"

export const allMailboxes = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailBoxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();

    res.json(mailBoxes);
  } catch(err: any) {
    res.json({ error: err });
  }
}

export const mailboxById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMAP.IMessage[] = await imapWorker.listMessages({ mailbox: req.params.mailbox });

    res.json(messages);
  } catch (err: any) {
    res.json({ error: err });
  }
}
