import dotenv from "dotenv"
import fs from "fs";
import path from "path";

dotenv.config();

export interface IServerInfo {
  smtp: {
    host: string | undefined
    port: number | undefined
    auth: { user: string | undefined; pass: string | undefined }
  };
  imap: {
    host: string | undefined
    port: number | undefined
    auth: { user: string | undefined; pass: string | undefined }
  }
}

export let serverInfo: IServerInfo = {
  imap: {
    auth: {
      pass: process.env.IMAP_PASS,
      user: process.env.IMAP_USER
    },
    host: process.env.IMAP_HOST,
    port: Number(process.env.IMAP_PORT)
  },
  smtp: {
    auth: {
      pass: process.env.SMTP_PASS,
      user: process.env.SMTP_USER
    },
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT)
  }
};
