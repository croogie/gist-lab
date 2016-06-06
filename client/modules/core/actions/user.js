export default {
  logout({Meteor, FlowRouter}) {
    Meteor.logout();
    FlowRouter.go('home');
  }
};
