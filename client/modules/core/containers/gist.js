import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Gist from '../components/gist.jsx';
import _ from 'lodash';

export const composer = ({context, id}, onData) => {
  const {Meteor, Collections, LocalState} = context();

  let data = {};

  if (Meteor.subscribe('gist', id).ready() && Meteor.subscribe('userData').ready() && Meteor.subscribe('labels').ready()) {
    const username = _.property('services.github.username')(Meteor.user());
    const gist = Collections.Gists.findOne({id});
    const userId = Meteor.userId();

    gist.files = JSON.parse(gist.files);

    data = {
      gist,
      labels: Collections.Labels.find({userId}).fetch(),
      editable: username === gist.owner.login,
      editing: Boolean(LocalState.get('EDIT_MODE')),
      starring: Boolean(LocalState.get('STARRING'))
    };
  }

  onData(null, data.gist && data.labels ? data : null);
};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onStarClick: actions.github.toggleStar,
  onEditClick: actions.github.editGist,
  onSaveClick: actions.github.saveGist,
  onDeleteClick: actions.github.deleteGist,
  onPublicityClick: actions.github.togglePublic,
  onChangeLabels: actions.labels.updateGistLabels
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Gist);
