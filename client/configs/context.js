import * as Collections from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Bert} from 'meteor/themeteorchef:bert';
import {Tracker} from 'meteor/tracker';
import _ from 'lodash';

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    _,
    Msg: Bert
  };
}
