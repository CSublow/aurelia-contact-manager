import {EventAggregator} from 'aurelia-event-aggregator';
import {WebAPI} from './web-api';
import {ContactUpdated, ContactViewed} from './messages';
import {inject} from 'aurelia-framework';

/* Dependency injection, using @inject
    The ContactList class has a dependency on WebAPI
    When the contact list is instantiated, it will first instantiate an instance of the web API and "inject" that
    into the contact list's constructor
    .Also inject the EventAggregator */
@inject(WebAPI, EventAggregator)
export class ContactList {
    constructor(api) {
        this.api = api;
        this.contacts = [];

        /* Call the subscribe method, passing it the message type and a callback */
        ea.subscribe(ContactViewed, msg => this.select(msg.contact));
        ea.subscribe(ContactUpdated, msg => {
          let id = msg.contact.id;
          let found = this.contacts.find(x => x.id == id);
          Object.assign(found, msg.contact);
        });
    }

    /* The created() method gets called after both the view-model and the view are created
        In this case, created() is used to call the API and get the list of contacts
        The list of contacts gets stored in the contacts property */
    created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
        this.selectedId = contact.id;
        return true;
    }
}