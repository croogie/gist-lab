import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistsList from '../components/gists_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();

  let selectedId = LocalState.get('GIST');

  onData(null, {selectedId});
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  open: actions.navigateTo.gist
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GistsList);
