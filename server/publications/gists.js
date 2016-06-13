import {Gists} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('gists', function () {
    let userId = this.userId;
    return Gists.find({userId}); // @todo project only needed fields
  });

  Meteor.publish('gist', function (id) {
    check(id, String);
    let userId = this.userId;

    return Gists.find({userId, id});
  });
}
