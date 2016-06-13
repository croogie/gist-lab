export default {
  toggleLabelEditMode({LocalState, Msg}) {
    LocalState.set('LABEL_EDIT_MODE', !LocalState.get('LABEL_EDIT_MODE'));
    Msg.alert(`Edit mode has been switched ${LocalState.get('LABEL_EDIT_MODE') ? 'on' : 'off'}`);
  },

  toggleLabelFilter({LocalState, Msg}, label) {
    Msg.alert({
      title: 'toggleLabelFilter',
      message: 'Needs to be implemented',
      type: 'warning'
    });
  },

  addLabel({Meteor, Msg}) {
    let label = prompt('Please enter new label title', 'New label');
    if (label !== null) {
      Meteor.call('labels.add', label, (err, result) => {
        if (!err) {
          Msg.alert({
            title: 'Label has been added',
            message: `Label ${label} has been successfully added.`,
            type: 'success'
          });
        } else {
          Msg.alert({
            title: 'There were some problems',
            message: 'Label couldn\'t be added. Try again later'
          });
        }
      });
    }
  },

  removeLabel({Meteor, Msg}, label) {
    if (confirm(`Are you sure you want to remove '${label.title}' label?`)) {
      Meteor.call('labels.remove', label._id, (err, result) => {
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
  }
};
