import {Labels} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';

export default function () {
  Meteor.publish('labels', function () {
    Meteor._sleepForMs(500);

    return Labels.find({userId: this.userId});
  });
}
