import * as Contacts from "../services/Contacts"

import { Request, Response } from "express";

import { IContact } from "../services/Contacts"

export const allContacts = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    const contacts: IContact[] = await contactWorker.listContacts();
    
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const createContact = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactWorker.addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const deleteContactById = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    await contactWorker.deleteContact(req.params.id);

    res.status(200).send('ok');
  } catch (error) {
    res.status(400).json({ error });
  }
}

export const updateContact = async (req: Request, res: Response) => {
  try {
    const contactWorker: Contacts.Worker = new Contacts.Worker();
    const contact: IContact = await contactWorker.updateContact(req.body)

    res.status(200).json(contact);
  } catch (error) {
    res.status(400).json({ error });
  }
}
