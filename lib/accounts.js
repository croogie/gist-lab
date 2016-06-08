import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/std:accounts-ui';

Meteor.startup(() => {
  Accounts.ui.config({
    requestPermissions: {
      github: ['user:email', 'gist']
    },
    loginPath: '/',
    onPostSignUpHook(options, user) {
      console.log('onPostSignUpHook', options, user); // XXX
    },
    onSignedInHook() {
      console.log('onSignedInHook', arguments); // XXX
    },
    onSignedOutHook() {
      console.log('onSignedOutHook', arguments); // XXX
    }
  });
});
