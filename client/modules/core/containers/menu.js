import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Menu from '../components/menu.jsx';
import {authComposer} from 'meteor-auth';

export const composer = ({context}, onData) => {
  const {Meteor, LocalState} = context();

  // which list of items is shown is stored in LIST local state variable
  let list = LocalState.get('LIST');
  let username = Meteor.user() ? Meteor.user().services.github.username : null;
  let isLogged = username !== null;

  let defaultOptions = [
    {action: 'dupa', label: 'dupa', active: false, show: () => true},
    {action: 'navigateTo.myGists', label: 'My Gists', active: list === 'my', show: () => isLogged},
    {action: 'navigateTo.starredGists', label: 'Favourites', active: list === 'favorites', show: () => isLogged},
  ];

  onData(null, {
    username,
    options: defaultOptions.filter(option => option.show() === true)
  });
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  menuActions: actions
});

export default composeAll(
  composeWithTracker(composer),
  composeWithTracker(authComposer),
  useDeps(depsMapper)
)(Menu);
