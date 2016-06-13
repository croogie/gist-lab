import React from 'react';
import {useDeps, composeAll, composeWithTracker, compose} from 'mantra-core';

import GistsListItem from '../components/gists_list_item.jsx';

export const composer = ({context}, onData) => {
  const {Meteor, Collections} = context();

  onData();

  if (Meteor.subscribe('labels').ready()) {
    const userId = Meteor.userId();
    const labels = Collections.Labels
      .find({userId})
      .fetch()
      .reduce((labels, label) => {
        labels[label._id] = label;
        return labels;
      }, {});

    onData(null, {labels});
  }
};

const Loading = () => (<GistsListItem loading />);

export const depsMapper = (context, actions) => ({
  context: () => context
});

export default composeAll(
  composeWithTracker(composer, Loading),
  useDeps(depsMapper)
)(GistsListItem);
