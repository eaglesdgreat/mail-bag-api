import * as IMAP from "../services/IMAP"
import * as SMTP from "../services/SMTP"

import { Request, Response } from "express";

import { serverInfo } from "../config/ServerInfo"

export const getMailboxMessageById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: string | boolean = await imapWorker.getMessageBody({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10)
    });

    res.status(200).send(messageBody);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const deleteMailboxMessageById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    await imapWorker.deleteMessages({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10)
    });

    res.status(200).send('deleted');
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

export const createMessage = async (req: Request, res: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(req.body)

    res.status(201).send('created');
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
