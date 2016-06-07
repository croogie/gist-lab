import actions from './actions';
import routes from './routes.jsx';

export default {
  routes,
  actions,
  load() {
    console.log('Core module has been initialized.');
    // context is passed as first argument
  }
};
