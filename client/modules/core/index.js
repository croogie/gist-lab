import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load({LocalState}) {
    // set default values of LocalState

    LocalState.set('LIST', 'my'); // show my gists by default

    console.log('Core module has been initialized.');
  }
};
