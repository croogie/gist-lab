import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Gist from '../components/gist.jsx';
import _ from 'lodash';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  if (Meteor.subscribe('gist', id).ready() && Meteor.subscribe('userData').ready()) {
    const username = _.property('services.github.username')(Meteor.user());
    const gist = Collections.Gists.findOne({id});

    gist.files = JSON.parse(gist.files);

    return onData(null, {
      gist,
      editable: username === gist.owner.login,
      editing: Boolean(LocalState.get('EDIT_MODE')),
      starring: Boolean(LocalState.get('STARRING'))
    });
  }

  onData();
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onStarClick: actions.github.toggleStar,
  onEditClick: actions.github.editGist,
  onSaveClick: actions.github.saveGist,
  onDeleteClick: actions.github.deleteGist,
  onPublicityClick: actions.github.togglePublic
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Gist);
