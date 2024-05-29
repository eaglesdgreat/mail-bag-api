import * as Contacts from "../services/Contacts"

import { Request, Response } from "express";

import { IContact } from "../services/Contacts"

export const allContacts = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactWorker.listContacts();
    
    res.json(contacts);
  } catch (error) {
    res.json({ error });
  }
}

export const createContact = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactWorker.addContact(req.body);

    res.json(contact);
  } catch (error) {
    res.json({ error });
  }
}

export const deleteContactById = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    await contactWorker.deleteContact(req.params.id);

    res.send('ok');
  } catch (error) {
    res.json({ error });
  }
}
