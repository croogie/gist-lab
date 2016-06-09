import {resetState} from '/client/modules/core/libs/common';

export default {
  logout({Meteor, FlowRouter}) {
    Meteor.logout();
    FlowRouter.go('home');
  },

  login({Meteor, LocalState}) {
    Meteor.loginWithGithub({
      requestPermissions: {
        github: ['user:email', 'gist']
      },
    }, err => {
      if (!err) {
        resetState({LocalState});
      }
    });
  }
};
