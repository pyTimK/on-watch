import { Contact } from "./Contact";

export abstract class StorageNames {}

export const Constants = {
  validDeviceIds: ["child1", "child2", "child3", "child4", "child5"],
  Contacts: {
    PNP: {
      name: "Philippine National Police",
      phone: "117911",
      photoURL: "images/contacts/pnp.png",
    } as Contact,
    BFP: {
      name: "Bureau of Fire Protection",
      phone: "160911",
      photoURL: "images/contacts/bfp.png",
    } as Contact,
    PRC: {
      name: "Philippine Red Cross",
      phone: "143",
      photoURL: "images/contacts/prc.png",
    } as Contact,
  },
};
