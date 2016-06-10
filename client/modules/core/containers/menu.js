import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Menu from '../components/menu.jsx';
import {authComposer} from 'meteor-auth';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState, Tracker, FlowRouter} = context();

  if (Meteor.subscribe('userData').ready()) {
    Tracker.autorun(() => {
      const showPrivate = LocalState.get('GISTS_FILTER_PRIVATE');
      const showPublic = LocalState.get('GISTS_FILTER_PUBLIC');
      const showingOwned = Boolean(LocalState.get('GISTS_FILTER_OWNED'));
      const showingStarred = LocalState.get('GISTS_FILTER_STARRED');
      const showingAllItems = (showPrivate && showPublic) || (!showPrivate && !showPublic);

      // which list of items is shown is stored in LIST local state variable
      let username = Meteor.user() ? Meteor.user().services.github.username : null;

      let isLogged = () => username !== null;

      let defaultOptions = [
        {
          action: 'navigateTo.home',
          label: 'Home',
          active: FlowRouter.current().route.name === 'home',
          show: () => true,
          icon: 'home'
        }, {
          action: 'navigateTo.allGists',
          label: 'All Gists',
          active: showingAllItems && !showingOwned && !showingStarred,
          icon: 'asterisk',
          show: isLogged,
        }, {
          action: 'navigateTo.myGists',
          label: 'My gists',
          active: showingOwned,
          show: isLogged,
          icon: 'user'
        }, {
          action: 'navigateTo.starredGists',
          label: 'Starred',
          active: LocalState.get('GISTS_FILTER_STARRED') === true,
          show: isLogged,
          icon: 'star'
        }
      ];

      onData(null, {
        username,
        options: defaultOptions.filter(option => option.show() === true),
        inProgress: Boolean(LocalState.get('FETCHING_MY_GISTS') || LocalState.get('FETCHING_STARRED_GISTS'))
      });

    });
  }
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  menuActions: actions,
  fetch: actions.github.fetchGists
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(Menu);
