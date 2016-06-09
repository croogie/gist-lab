export default {
  myGists({LocalState}) {
    LocalState.set('LIST', 'my');
  },

  starredGists({LocalState}) {
    LocalState.set('LIST', 'favorites');
  },

  gist({LocalState, FlowRouter}, id) {
    if (id === undefined) {
      FlowRouter.go('home');
      return LocalState.set('GIST', null);
    }

    FlowRouter.go('gist', {id});
    LocalState.set('GIST', id);
  }
};
