import {WebAPI} from './web-api';
import {inject} from 'aurelia-framework';

/* Dependency injection, using @inject
    The ContactList class has a dependency on WebAPI
    When the contact list is instantiated, it will first instantiate an instance of the web API and "inject" that
    into the contact list's constructor */
@inject(WebAPI)
export class ContactList {
    constructor(api) {
        this.api = api;
        this.contacts = [];
    }

    /* The created() method gets called after both the view-model and the view are created
        In this case, created() is used to call the API and get the list of contacts
        The list of contacts gets stored in the contacts property */
    created() {
        this.api.getContactList().then(contacts => this.contacts = contacts);
    }

    select(contact) {
        this.selectedId = contact.id;
        return true
    }
}