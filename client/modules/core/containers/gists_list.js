import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistsList from '../components/gists_list.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Collections, Tracker} = context();

  let props = {
    loading: true,
    fetching: Boolean(LocalState.get('FETCHING_GISTS')),
    showStarred: Boolean(LocalState.get('GISTS_FILTER_STARRED')),
    showPrivate: Boolean(LocalState.get('GISTS_FILTER_PRIVATE')),
    showPublic: Boolean(LocalState.get('GISTS_FILTER_PUBLIC')),
    showOwned: Boolean(LocalState.get('GISTS_FILTER_OWNED')),
    editing: Boolean(LocalState.get('EDIT_MODE')),
    selectedId: LocalState.get('GIST')
  };

  const getGists = () => {
    props.items = Collections.Gists.findFiltered(
      {
        userId: Meteor.userId()
      },
      {
        public: props.showPublic,
        private: props.showPrivate,
        starred: props.showStarred,
        owned: LocalState.get('GISTS_FILTER_OWNED'),
        labels: LocalState.get('GISTS_FILTER_LABELS')
      }
    ).fetch().map(gist => {
      gist.files = JSON.parse(gist.files);
      return gist;
    });
    props.loading = false;
  };

  Tracker.autorun(getGists);

  if (Meteor.subscribe('gists').ready()) {
    getGists();
  }

  onData(null, props);
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  open: actions.navigateTo.gist,
  refresh: actions.github.fetchGists,
  togglePrivate: actions.github.togglePrivateFilter,
  togglePublic: actions.github.togglePublicFilter,
  toggleStarred: actions.github.toggleStarredFilter,
  toggleOwned: actions.github.toggleOwnedFilter,
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(GistsList);
