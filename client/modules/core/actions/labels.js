export default {
  toggleLabelEditMode({LocalState}) {
    LocalState.set('LABEL_EDIT_MODE', !LocalState.get('LABEL_EDIT_MODE'));
  },

  toggleLabelFilter({LocalState, _}, label) {
    let labelFilters = LocalState.get('GISTS_FILTER_LABELS');

    if (labelFilters.indexOf(label) !== -1) {
      LocalState.set('GISTS_FILTER_LABELS', _.without(labelFilters, label));
    } else {
      LocalState.set('GISTS_FILTER_LABELS', [label].concat(labelFilters));
    }
  },

  addLabel({Meteor, Msg}) {
    let label = prompt('Please enter new label title', 'New label');
    if (label !== null) {
      Meteor.call('labels.add', label, (err) => {
        if (!err) {
          Msg.alert({
            title: 'Label has been added',
            message: `Label ${label} has been successfully added.`,
            type: 'success'
          });
        } else {
          Msg.alert({
            title: 'There were some problems',
            message: 'Label couldn\'t be added. Try again later',
            type: 'error'
          });
        }
      });
    }
  },

  removeLabel({Meteor, Msg}, label) {
    if (confirm(`Are you sure you want to remove '${label.title}' label?`)) {
      Meteor.call('labels.remove', label._id, (err) => {
        if (err) {
          Msg.alert({
            title: 'Problems with removing label',
            message: 'We couldn\'t remove this label',
            type: 'error'
          });
        } else {
          Msg.alert({
            title: `Label "${label.title}" has been removed`,
            message: 'All Gists which had this label were updated.',
            type: 'success'
          });
        }
      });
    }
  },

  updateGistLabels({Meteor, Msg}, gistId, labelIds) {
    Meteor.call('labels.updateGist', gistId, labelIds, (err) => {
      if (err) {
        Msg.alert({
          title: 'There were problem while saving labels',
          message: 'Selected labels could\'t be saved.',
          type: 'error'
        });
      } else {
        Msg.alert({
          title: 'Selected labels has been saved.',
          type: 'success'
        });
      }
    });
  }
};
