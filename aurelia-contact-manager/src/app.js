import {inject, PLATFORM} from 'aurelia-pal';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }
  /* Whenever you have a configureRouter method, the view must contain a router-view
    In this case, that can be found in app.html */
  configureRouter(config, router) {
    /* config.title sets the title to be used in the HTML browser */
    config.title = 'Contacts';
    config.map([
      /* This 1st route is empty. This is the default route, applies when the user currently has no selection
        The title for the route is joined together witht he config.title to form the final title */
      { route: '', moduleId: PLATFORM.moduleName('no-selection'), title: 'Select'},
      /* The 2nd route, when matched, will load the contact-detail module for the selected contact
        The name property here allows you to refer to the route elsewhere without having to write out the whole route */
      { route: 'contacts/:id', moduleId: PLATFORM.moduleName('contact-detail'), name:'contacts'}
    ]);

    this.router = router;
  }
}