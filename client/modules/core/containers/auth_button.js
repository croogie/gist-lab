import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import {authComposer} from 'meteor-auth';
import AuthButton from '../components/auth_button.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context,
  login: actions.user.login,
  logout: actions.user.logout
});

export default composeAll(
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(AuthButton);
