import {Labels, Gists} from '../../lib/collections';
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

      // update all gists having such label
      Gists.update(
        {labels: _id},
        {$pullAll: {labels: [_id]}},
        {multi: true}
      );

      // remove label when every item has been updated
      Labels.remove({userId, _id});

      return true;
    },
    'labels.updateGist'(id, labels) {
      console.log(id, labels); // XXX
      check(id, String);
      check(labels, Array);

      let userId = Meteor.userId();
      let gist = Gists.update({id, userId}, {$set: {labels}});

      return gist;
    }
  });
}
