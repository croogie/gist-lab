import {Labels} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('labels', function () {
    return Labels.find({userId: this.userId});
  });
}
