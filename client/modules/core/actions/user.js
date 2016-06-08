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
        // after successful login - set list to display `My gists`
        LocalState.set('LIST', 'my');
      }
    });
  }
};
