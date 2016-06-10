import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistsList from '../components/gists_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections} = context();

  let props = {
    loading: true,
    fetching: Boolean(LocalState.get('FETCHING_MY_GISTS') || LocalState.get('FETCHING_STARRED_GISTS')),
    selectedId: LocalState.get('GIST')
  };

  if (Meteor.subscribe('gists').ready()) {
    props.items = Collections.Gists.find().fetch().map(gist => {
      gist.files = JSON.parse(gist.files);
      return gist;
    });
    props.loading = false;
  }

  onData(null, props);
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  open: actions.navigateTo.gist,
  refresh: actions.github.fetchGists
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GistsList);
