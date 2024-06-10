import * as IMAP from "../services/IMAP"

import { Request, Response } from "express";

import { serverInfo } from "../config/ServerInfo"

export const allMailboxes = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const mailBoxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();

    res.status(200).json(mailBoxes);
  } catch(err: any) {
    res.status(400).json({ error: err.message });
  }
}

export const mailboxById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messages: IMAP.IMessage[] = await imapWorker.listMessages({ mailbox: req.params.mailbox });

    res.status(200).json(messages);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}
