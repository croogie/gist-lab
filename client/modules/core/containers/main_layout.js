import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import {authComposer} from 'meteor-auth';
import MainLayout from '../components/main_layout.jsx';

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(MainLayout);
