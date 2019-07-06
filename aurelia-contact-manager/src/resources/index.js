import {PLATFORM} from 'aurelia-framework';
  
export function configure(config) {
  /* Register the loading-indicator as a global resource */
  config.globalResources([PLATFORM.moduleName('./elements/loading-indicator')]);
}


