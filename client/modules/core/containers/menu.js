import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Menu from '../components/menu.jsx';
import {authComposer} from 'meteor-auth';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();

  if (Meteor.subscribe('userData').ready()) {

    // which list of items is shown is stored in LIST local state variable
    let username = Meteor.user() ? Meteor.user().services.github.username : null;

    let isActive = listValue => LocalState.get('LIST') === listValue;
    let isLogged = () => username !== null;

    let defaultOptions = [
      {action: 'navigateTo.allGists', label: 'All My Gists', active: isActive('all'), show: isLogged},
      {action: 'navigateTo.myGists', label: 'My Gists', active: isActive('my'), show: isLogged},
      {action: 'navigateTo.starredGists', label: 'Starred Gists', active: isActive('favorites'), show: isLogged},
    ];

    onData(null, {
      username,
      options: defaultOptions.filter(option => option.show() === true),
      inProgress: Boolean(LocalState.get('FETCHING_MY_GISTS') || LocalState.get('FETCHING_STARRED_GISTS'))
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
