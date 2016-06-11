import actions from './actions';
import routes from './routes.jsx';
import {resetState} from './libs/common';

export default {
  routes,
  actions,
  load(context) {
    resetState(context);                  // set default values of LocalState
    actions.github.fetchGists(context);   // fetch gists from API

    console.log('Core module has been initialized.');
  }
};
