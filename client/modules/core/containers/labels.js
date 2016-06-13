import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import Labels from '../components/labels.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections, LocalState, Tracker} = context();
  const userId = Meteor.userId();

  onData(null);

  function publishData() {
    onData(null, {
      labels: Collections.Labels.find({userId}).fetch(),
      active: LocalState.get('GISTS_FILTER_LABELS'),
      editMode: LocalState.get('LABEL_EDIT_MODE')
    });
  }

  Tracker.autorun(publishData);

  if (Meteor.subscribe('labels').ready()) {
    publishData();
  }


};

export const depsMapper = (context, actions) => ({
  context: () => context,
  onAddLabelClick: actions.labels.addLabel,
  onSettingsClick: actions.labels.toggleLabelEditMode,
  onLabelClick: actions.labels.toggleLabelFilter,
  onLabelDelete: actions.labels.removeLabel
});

export default composeAll(
  composeWithTracker(composer),
  useDeps(depsMapper)
)(Labels);
