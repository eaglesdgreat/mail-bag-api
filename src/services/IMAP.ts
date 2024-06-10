const ImapClient = require("emailjs-imap-client");

import { ParsedMail, simpleParser } from "mailparser";

import { IServerInfo } from "../config/ServerInfo";

export interface ICallOption {
  mailbox: string;
  id?: number;
}

interface IAddress {
  address: string;
  name: string
}

export interface IMessage {
  id: string;
  date: string;
  from: IAddress[] | null;
  to?: IAddress[] | null;
  sender?: IAddress[] | null;
  subject: string;
  body?: string;
}

export interface IMailbox {
  name: string;
  path: string;
}

// Tells node to skip checking certificate validation with TLS
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

export class Worker {
  private static serverInfo: IServerInfo;

  constructor(inServerInfo: IServerInfo) {
    Worker.serverInfo = inServerInfo;
  }

  private async connectToServer(): Promise<any> {
    const client: any = new ImapClient.default(
      Worker.serverInfo.imap.host,
      Worker.serverInfo.imap.port,
      { auth: Worker.serverInfo.imap.auth },
    );
    
    client.logLevel = client.LOG_LEVEL_NONE;
    client.onerror = (error: Error) => {
      console.log("IMAP.Worker.listMailboxes(): Connection error", error);
    }

    await client.connect();
    return client;
  }

  public async listMailboxes(): Promise<IMailbox[]> {
    const client: any = await this.connectToServer();
    const mailboxes: any = await client.listMailboxes();
    await client.close();

    const finalMailboxes: IMailbox[] = [];
    const iterateChildren: Function = (arr: any[]) => {
      arr.forEach((value: any) => {
        finalMailboxes.push({
          name: value.name,
          path: value.path
        });
        iterateChildren(value.children)
      })
    }

    iterateChildren(mailboxes.children);
    return finalMailboxes;
  }

  public async listMessages(option: ICallOption): Promise<IMessage[]> {
    const client: any = await this.connectToServer();
    const mailbox: any = await client.selectMailbox(option.mailbox);

    if (mailbox.exists === 0) {
      await client.close();
      return [];
    }

    const messages: any[] = await client.listMessages(option.mailbox, "1:*", ["uid", "envelope", "flags"]);
    console.log(messages)
    await client.close();

    const finalMessages: IMessage[] = [];
    messages.forEach((message: any) => {
      finalMessages.push({
        id: message.uid,
        date: message.envelope?.date ?? "",
        from: message.envelope?.from ?? null,
        to: message.envelope?.to ?? null,
        sender: message.envelope?.sender ?? null,
        subject: message.envelope?.subject ?? "",
      })
    });
    return finalMessages;
  }

  public async getMessageBody(option: ICallOption): Promise<string | boolean> {
    const client: any = await this.connectToServer();
    const messages: any[] = await client.listMessages(
      option.mailbox, option.id,
      ["body[]"],
      { byUid: true },
    )

    const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
    await client.close();

    return parsed.text ?? "";
  }

  public async deleteMessages(option: ICallOption): Promise<any> {
    const client: any = await this.connectToServer();
    await client.deleteMessages(option.mailbox, option.id, { byUid: true });
    await client.close();
  }
}
