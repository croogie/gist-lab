import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';
import {authComposer} from 'meteor-auth';
import MainLayout from '../components/main_layout.jsx';

export const composer = ({context}, onData) => {
  // const {Meteor, Collections} = context();
  onData(null, {});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  logout: actions.user.logout
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(MainLayout);
