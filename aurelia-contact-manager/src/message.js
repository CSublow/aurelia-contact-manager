/* These messages are incorporated into the contact-detail js */

/* This message is published when the user updates a contact */
export class ContactUpdated {
    constructor(contact) {
      this.contact = contact;
    }
  }
  
/* This message is published when the user views a contact */
export class ContactViewed {
    constructor(contact) {
        this.contact = contact;
    }
}
  

  