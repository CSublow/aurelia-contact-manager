import {inject} from 'aurelia-framework';
/* Use dependency injection to get an instance of our WebAPI. We need this to load the contact detail data */
import {WebAPI} from './web-api';
import {areEqual} from './utility';

@inject(WebAPI)
export class ContactDetail {
  constructor(api){
    this.api = api;
  }

  /* activate is a life-cycle method for routed components
  The first argument passed to activate is the params object. This object will have one property for every route param that was parsed as well as a property for 
  each query string parameter
  Our route pattern for the contact details screen is contacts/:id. So, our params object will have an id property with the requested contact's id. 
  Using this id we call our WebAPI to retrieve the contact data. 
  This API returns a Promise which we wait on and then store the loaded contact in a contact property so it's easy to bind to. 
  We also make a copy of this object and store it in the originalContact property, so we can check to see if the data has been edited by the user at a later point.
  .routeConfig is pased in so that you can access its methods, such as navModel.setTitle */
  activate(params, routeConfig) {
    this.routeConfig = routeConfig;

    return this.api.getContactDetails(params.id).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  get canSave() {
    /* Indicate whether the UI and the data are in a state that allows for saving */
    return this.contact.firstName && this.contact.lastName && !this.api.isRequesting;
  }

  save() {
    this.api.saveContact(this.contact).then(contact => {
      this.contact = contact;
      this.routeConfig.navModel.setTitle(contact.firstName);
      /* Here the original contact info is overwritten with the new contact info */
      this.originalContact = JSON.parse(JSON.stringify(contact));
    });
  }

  /* This activates a confirm box if the user tries to navigate away from a contact with unsaved changes */
  canDeactivate() {
    if (!areEqual(this.originalContact, this.contact)){
      return confirm('You have unsaved changes. Are you sure you wish to leave?');
    }

    return true;
  }
}