import {setFilters} from '/client/modules/core/libs/common';


export default {
  home({FlowRouter}) {
    FlowRouter.go('home');
  },

  myGists({Meteor, LocalState, _}) {
    let username = _.property('services.github.username')(Meteor.user());
    setFilters({LocalState}, username);
  },

  starredGists({LocalState}) {
    setFilters({LocalState}, false, true, false, false);
  },

  allGists({LocalState}) {
    setFilters({LocalState}, false, false, false, false);
  },

  gist({LocalState, FlowRouter}, id) {
    if (id === undefined) {
      this.home({FlowRouter});
      return LocalState.set('GIST', null);
    }

    FlowRouter.go('gist', {id});
    LocalState.set('GIST', id);
  }
};
