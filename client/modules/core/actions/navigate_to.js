export default {
  myGists({LocalState}) {
    LocalState.set('LIST', 'my');
  },
  starredGists({LocalState}) {
    LocalState.set('LIST', 'favorites');
  }
};
