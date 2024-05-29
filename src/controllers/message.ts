import * as IMAP from "../services/IMAP"
import * as SMTP from "../services/SMTP"

import { Request, Response } from "express";

import { serverInfo } from "../config/ServerInfo"

export const getMailboxMessageById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    const messageBody: string | undefined = await imapWorker.getMessageBody({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10)
    });

    res.send(messageBody);
  } catch (error: any) {
    res.json({ error });
  }
}

export const deleteMailboxMessageById = async (req: Request, res: Response) => {
  try {
    const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
    await imapWorker.deleteMessages({
      mailbox: req.params.mailbox,
      id: parseInt(req.params.id, 10)
    });

    res.send('ok');
  } catch (error) {
    res.json({ error });
  }
}

export const createMessage = async (req: Request, res: Response) => {
  try {
    const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
    await smtpWorker.sendMessage(req.body)

    res.send('ok');
  } catch (error) {
    res.json({ error });
  }
}
