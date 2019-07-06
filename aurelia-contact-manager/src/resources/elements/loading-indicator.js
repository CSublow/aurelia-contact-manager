import * as nprogress from 'nprogress';
/* The entire rendering job is handled by the NProgress library, we don't need Aurelia's templating engine to render this component
    So we use the noView() decorator to tell Aurelia not to load a loading-indicator.html, compile it or do any of that rendering work */
import {bindable, noView} from 'aurelia-framework';
/* The NProgress library requires some CSS to work */
import 'nprogress/nprogress.css';

@noView
export class LoadingIndicator {
  @bindable loading = false;

  loadingChanged(newValue) {
    if (newValue) {
      nprogress.start();
    } else {
      nprogress.done();
    }
  }
}


