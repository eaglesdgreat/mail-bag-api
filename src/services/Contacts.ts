import Datastore from "nedb";
import path from "path"

export interface IContact {
  _id?: number;
  name: string;
  email: string
}

export class Worker {
  private db: Nedb

  constructor() {
    this.db = new Datastore({
      filename: path.join(__dirname , '../databases/contact.db'),
      autoload: true,
    })
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (error: Error, docs: IContact[]) => {
        if(error) {
          reject(error)
        } else {
          resolve(docs);
        }
      });
    });
  }

  public addContact(contact: IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      this.db.insert(contact, (error: Error | null, newContact: IContact) => {
        if (error && !newContact) {
          reject(error)
        } else {
          resolve(newContact);
        }
      })
    });
  }

  public deleteContact(id: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: id }, {}, (error: Error | null, numRemoved: number) => {
        if (error) {
          reject(error);
        } else {
          resolve('');
        }
      });
    })
  }

  public updateContact(contact: IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      this.db.update({ _id: contact?._id }, contact, {}, (error: Error | null, numUpdated: number) => {
        if (error) {
          reject(error)
        } else {
          this.db.find({ _id: contact?._id }, (error: Error, doc: IContact) => {
            if (error) {
              reject(error)
            } else {
              resolve(doc);
            }
          })
        }
      })
    });
  }
}