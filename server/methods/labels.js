import {Labels} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

const labelColors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

export default function () {
  Meteor.methods({
    'labels.add'(title) {
      check(title, String);
      const userId = Meteor.userId();

      let labelsCount = Labels.find({userId}).count();
      let labelId = Labels.upsert(
        {userId, title},
        {
          $set: {
            title,
            userId,
            color: labelColors[labelsCount]
          }
        });

      return labelId;
    },

    'labels.remove'(_id) {
      check(_id, String);
      const userId = Meteor.userId();

      const label = Labels.findOne({userId, _id});

      Labels.remove({userId, _id});

      // @todo: Update all user documents which had removed tag

      return true;
    }
  });
}
