import {resetState} from '/client/modules/core/libs/common';
import github from './github';

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
        github.fetchGists({Meteor, LocalState});
      }
    });
  }
};
