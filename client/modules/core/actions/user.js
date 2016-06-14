import {resetState} from '../libs/common';
import github from './github';

export default {
  logout({Meteor, FlowRouter, Msg}) {
    Meteor.logout();
    Msg.alert('You\'ve been logged out. Hope to see you back soon :)', 'success');
    FlowRouter.go('home');
  },

  login({Meteor, LocalState, Msg}) {
    Meteor.loginWithGithub({
      requestPermissions: {
        github: ['user:email', 'gist']
      },
    }, err => {
      if (!err) {
        resetState({LocalState});
        Msg.alert('Hi there. Welcome in GistLab!', 'success');
        github.fetchGists({Meteor, LocalState});
      } else {
        Msg.alert('There were some problems with logging you in.', 'error');
      }
    });
  }
};
