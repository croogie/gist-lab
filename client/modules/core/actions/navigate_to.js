export default {
  myGists({LocalState}) {
    console.log('navigateTo.myGists'); // XXX
    LocalState.set('LIST', 'my');
  },
  starredGists({LocalState}) {
    console.log('navigateTo.starredGists'); // XXX
    LocalState.set('LIST', 'favorites');
  }
};
