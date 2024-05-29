import fs from "fs";
import path from "path";

export interface IServerInfo {
  smtp: {
    host: string
    port: number
    auth: { user: string; pass: string }
  };
  imap: {
    host: string
    port: number
    auth: { user: string; pass: string }
  }
}

export let serverInfo: IServerInfo;

const rawInfo: string = fs.readFileSync(path.join(__dirname, '../../serverInfo.json')).toString();
serverInfo = JSON.parse(rawInfo);
