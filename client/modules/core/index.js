import actions from './actions';
import routes from './routes.jsx';
import {resetState} from './libs/common';

export default {
  routes,
  actions,
  load({LocalState}) {
    resetState({LocalState}); // set default values of LocalState

    console.log('Core module has been initialized.');
  }
};
