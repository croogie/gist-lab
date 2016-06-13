import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistFiles from '../components/gist_files.jsx';

export const composer = ({context, gist}, onData) => {
  const {Meteor, Collections} = context();

  onData(null, {files: gist.files});
};

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GistFiles);
